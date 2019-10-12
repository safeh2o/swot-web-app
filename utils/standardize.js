var streams = require('memory-streams');
const azure = require('azure-storage');
const XlsxStreamReader = require('xlsx-stream-reader');
const csv = require('fast-csv');

exports.standardize = async function(filename) {

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

  //console.log(`Data rows is`, dataRows);

  // validate first row
  if (!dataRows.length) {
    return `No data extracted from standardized file, exiting`;
  }

  let missingColumnErrors = [];
  let requiredColumns = process.env.FILE_REQUIRED_COLUMNS.split(",");
  for (let i = 0; i < requiredColumns.length; i++) {
    if (Object.keys(dataRows[0]).indexOf(requiredColumns[i]) == -1) {
      missingColumnErrors.push(requiredColumns[i]);
    }
  }

  if (missingColumnErrors.length > 0) {
    return `Uploaded file is missing the required columns: ${missingColumnErrors.join(',')}`;
  }

  // convert excel to csv
  let dataToUpload = process.env.FILE_REQUIRED_COLUMNS + "\n";
  dataRows.forEach(function(dataRow, rowIndex) {
    let rowStr = "";
    process.env.FILE_REQUIRED_COLUMNS.split(",").forEach(function(requiredColumn, index) {
      rowStr += dataRow[requiredColumn] + ",";
    })
    rowStr = rowStr.substring(0, rowStr.length - 1);
    dataToUpload += rowStr + "\n";
  });

  // upload csv

  await uploadTextAsFileToStorage(process.env.AZURE_STORAGE_CONTAINER_STD, filename.substr(0, filename.lastIndexOf(".")) + ".csv", dataToUpload);
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
        let rowObj = {};
        row.values.forEach(function(rowVal, colNum){
            if (isHeader) {
              headers.push(rowVal);
            } else {
              rowObj[headers[colNum]] = rowVal;
            }
        });
        if (!isHeader) {
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