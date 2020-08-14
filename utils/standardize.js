const azure = require('azure-storage');
const XlsxStreamReader = require('xlsx-stream-reader');
const csv = require('fast-csv');
const keystone = require('keystone');
const Dataset = keystone.list('Dataset');

exports.standardize = async function(datasetId, filename) {

  if (process.env.STANDARDIZE_DATASET != 1) {
    return;
  }

  console.log(`Standardizing file ${filename}`);

  // validate
  if (!filename) {
    return `Empty filename passed to standardize function`;
  }

  // determine mode
  let mode;
  if (filename.toLowerCase().endsWith(".csv")) mode = "csv";
  if (filename.toLowerCase().endsWith(".xlsx")) mode = "xlsx";
  if (!mode) {
    return `Unexpected filename passed to standardize function ${filename}`;
  }

  // get raw blob to stream
  const filestream = getBlobReadStream(process.env.AZURE_STORAGE_CONTAINER, filename);

  // read file
  let dataRows = [];
  if (mode === "csv") {
    dataRows = await getCSVDataRows(filestream);
  } else {
    // we're dealing with an excel file
    dataRows = await getExcelDataRows(filestream);
  }

  //console.log(`Data rows is`, dataRows[0]);

  // validate first row
  if (!dataRows.length) {
    return `No data extracted from standardized file, exiting`;
  }

  let missingColumnErrors = [];
  let requiredColumns = process.env.FILE_REQUIRED_COLUMNS.split(",");
  for (let i = 0; i < requiredColumns.length; i++) {
      const requiredColumnRegex = getRequiredColumnRegex(requiredColumns[i]);
      if (dataRows.length) {
        const dataRowKeys = Object.keys(dataRows[0]);
        if (!dataRowKeys.some((rowKey) => {
          return rowKey.match(requiredColumnRegex);
        })) {
          missingColumnErrors.push(getRequiredColumnOutput(requiredColumns[i]));
        }
      }    
  }

  if (missingColumnErrors.length > 0) {
    return `Uploaded file is missing one or more columns that match: ${missingColumnErrors.join(',')}`;
  }

  // convert excel to csv
  
  // write header line first
  let requiredColumnOutputs = [];
  requiredColumns.forEach(function(requiredColumn, i) {
    const requiredColumnOutput = getRequiredColumnOutput(requiredColumn);
    requiredColumnOutputs.push(requiredColumnOutput);
  });
  let dataToUpload = requiredColumnOutputs.join(",") + "\n";

  const skippedDataRows = [];
  const standardizedDataRows = [];
  // write data columns
  dataRows.forEach(function(dataRow, rowIndex) {
    let rowStr = "";
    let rowObj = {};
    let shouldSkipDataRow = false;
    let blankColumn = '';
    requiredColumns.forEach(function(requiredColumn, i) {
      const requiredColumnRegex = getRequiredColumnRegex(requiredColumn);
      const columnShouldBeSkippedOnNull = shouldSkipBlankColumn(requiredColumn);
      const firstMatchingKey = Object.keys(dataRow).find(k => k.match(requiredColumnRegex));
      let val = dataRow[firstMatchingKey];
      const requiredColumnOutput = getRequiredColumnOutput(requiredColumn);
      rowObj[requiredColumnOutput] = val;
      rowStr += val + ",";
      if (!val) {
        val = "";
        if (columnShouldBeSkippedOnNull) {
          shouldSkipDataRow = true;
          blankColumn = requiredColumnOutput;
        }
      }
    })
    rowStr = rowStr.substring(0, rowStr.length - 1);
    if (!shouldSkipDataRow) {
      dataToUpload += rowStr + "\n";
      standardizedDataRows.push(rowObj);
    } else {
      skippedRowObj = {'reason': blankColumn, ...rowObj};
      skippedDataRows.push(skippedRowObj);
    }
  });

  await saveStandardizedData(datasetId, dataRows, standardizedDataRows, skippedDataRows);

  // upload csv

  await uploadTextAsFileToStorage(process.env.AZURE_STORAGE_CONTAINER_STD, filename.substr(0, filename.lastIndexOf(".")) + ".csv", dataToUpload);
}

async function saveStandardizedData(datasetId, rawData, standardizedData, skippedData) {
  console.log(`Dataset id is ${datasetId}`);
  return Dataset.model.findOneAndUpdate(
    {_id: datasetId}, 
    { $set: {standardizedData: standardizedData, rawData: rawData, skippedRows: skippedData }, },
    { strict: false }).exec();
}

function getRequiredColumnRegex(column) {
  return column.indexOf("|") != -1 ? column.substr(0, column.lastIndexOf("|")) : column;
}

function getRequiredColumnOutput(column) {
  return column.indexOf("|") != -1 ? column.substr(column.lastIndexOf("|") + 1).replace("<skipBlanks>", "") : column.replace("<skipBlanks>", "");
}

function shouldSkipBlankColumn(column) {
  return column.indexOf("<skipBlanks>") != -1;
}

async function getCSVDataRows(filestream) {
  const dataRows = [];
  return new Promise(async (resolve, reject) => {
    filestream.pipe(csv.parse({ headers: true }))
              .on('data', row => dataRows.push(row))
              .on('end', () => { resolve(dataRows)});
  });
}


async function getExcelDataRows(filestream) {
  const dataRows = [];
  return new Promise(async (resolve, reject) => {
    const workBookReader = new XlsxStreamReader({formatting: false});
    let headers = [];
    workBookReader.on('worksheet', function (workSheetReader) {
      if (workSheetReader.id > 1){
          // we only want first sheet
          workSheetReader.skip();
          return; 
      }

      workSheetReader.on('row', function (row) {
        const isHeader = row.attributes.r == 1;
        if (isHeader) {
          headers = row.values.slice(0);
        } else {
          let rowObj = {};          
          headers.forEach((headerName) => {
            if (headerName) {
              rowObj[headerName] = null;
            }
          });
          row.values.forEach((rowVal, colNum) => {
            const headerName = headers[colNum];
            if (headerName) {              
              rowObj[headerName] = rowVal;
            }
          });
          dataRows.push(rowObj);
        }
      });
  
      // call process after registering handlers
      workSheetReader.process();
    });
    workBookReader.on('end', function () {
      resolve(dataRows)
    });

    filestream.pipe(workBookReader);
  });
}

async function uploadTextAsFileToStorage(containerName, blobName, text) {
  const retryOperations = new azure.LinearRetryPolicyFilter();
  const blobService = azure.createBlobService().withFilter(retryOperations);
  return new Promise((resolve, reject) => {
    blobService.createContainerIfNotExists(containerName, null, function(error, result, response) {
      if (!error) {
        blobService.createBlockBlobFromText(containerName, blobName, text, err => {
          if (err) {
              reject(err);
          } else {
              resolve({});
          }
      });
      } else reject(error);
    });      
  });
}

function getBlobReadStream(containerName, blobName) {
  const retryOperations = new azure.LinearRetryPolicyFilter();
  const blobService = azure.createBlobService().withFilter(retryOperations);
  return blobService.createReadStream(containerName, blobName);
}

exports.getBlobReadStream = getBlobReadStream;