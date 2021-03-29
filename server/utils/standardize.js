const azure = require("azure-storage");
const XlsxStreamReader = require("xlsx-stream-reader");
const csv = require("fast-csv");
const keystone = require("keystone");
const Dataset = keystone.list("Dataset");
const Datapoint = keystone.list("Datapoint");
const moment = require("moment");
const DataTypes = require("./enums").DataTypes;
const fs = require("fs");

exports.standardize = async function standardize(filepath, mode) {
	if (process.env.STANDARDIZE_DATASET != 1) {
		return;
	}

	let dataRows = await getDataRows(filepath, mode);
	let standardized = await standardizeRows(dataRows);

	return standardized;
};

async function getDataRows(filepath, mode) {
	// read file
	let dataRows = [];
	if (mode === "csv") {
		dataRows = await getCsvDataRows(filepath);
	} else {
		// we're dealing with an excel file
		dataRows = await getExcelDataRows(filepath);
	}

	return dataRows;
}

async function standardizeRows(dataRows) {
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
			if (
				!dataRowKeys.some((rowKey) => {
					return rowKey.match(requiredColumnRegex);
				})
			) {
				missingColumnErrors.push(
					getRequiredColumnOutput(requiredColumns[i])
				);
			}
		}
	}

	if (missingColumnErrors.length > 0) {
		return `Uploaded file is missing one or more columns that match: ${missingColumnErrors.join(
			","
		)}`;
	}

	// convert excel to csv

	// write header line first
	let requiredColumnOutputs = [];
	requiredColumns.forEach(function (requiredColumn, i) {
		const requiredColumnOutput = getRequiredColumnOutput(requiredColumn);
		requiredColumnOutputs.push(requiredColumnOutput);
	});

	const skippedDataRows = [];
	const standardizedDataRows = [];
	// write data columns
	dataRows.forEach((dataRow) => {
		let rowObj = {};
		let shouldSkipDataRow = false;
		let blankColumn = "";
		requiredColumns.forEach(function (requiredColumn) {
			const requiredColumnRegex = getRequiredColumnRegex(requiredColumn);
			const columnShouldBeSkippedOnNull = shouldSkipBlankColumn(
				requiredColumn
			);
			const firstMatchingKey = Object.keys(dataRow).find((k) =>
				k.match(requiredColumnRegex)
			);
			const requiredColumnOutput = getRequiredColumnOutput(
				requiredColumn
			);
			let val = dataRow[firstMatchingKey];

			if (!val) {
				val = "";
				if (columnShouldBeSkippedOnNull) {
					shouldSkipDataRow = true;
					blankColumn = requiredColumnOutput;
				}
			} else if (requiredColumnOutput.indexOf("date") !== -1) {
				val = parseDate(dataRow[firstMatchingKey]);
			}
			rowObj[requiredColumnOutput] = val;
		});
		if (!shouldSkipDataRow) {
			standardizedDataRows.push(rowObj);
		} else {
			skippedRowObj = { reason: blankColumn, ...rowObj };
			skippedDataRows.push(skippedRowObj);
		}
	});

	return {
		[DataTypes.STANDARDIZED]: standardizedDataRows,
		[DataTypes.ERRONEOUS]: skippedDataRows,
	};
}

function parseDate(date) {
	const offset = new Date().getTimezoneOffset() * 60000;
	// normal date format
	if (date.indexOf("-") !== -1) {
		return new Date(moment.utc(date, process.env.DATE_FORMAT));
	} else {
		// excel date format
		return new Date(parseDateExcel(date) - offset);
	}
}

function parseDateExcel(excelTimestamp) {
	const secondsInDay = 24 * 60 * 60;
	const excelEpoch = new Date(1899, 11, 31);
	const excelEpochAsUnixTimestamp = excelEpoch.getTime();
	const missingLeapYearDay = secondsInDay * 1000;
	const delta = excelEpochAsUnixTimestamp - missingLeapYearDay;
	const excelTimestampAsUnixTimestamp = excelTimestamp * secondsInDay * 1000;
	const parsed = excelTimestampAsUnixTimestamp + delta;
	return isNaN(parsed) ? null : parsed;
}

function getRequiredColumnRegex(column) {
	return column.indexOf("|") != -1
		? column.substr(0, column.lastIndexOf("|"))
		: column;
}

function getRequiredColumnOutput(column) {
	return column.indexOf("|") != -1
		? column.substr(column.lastIndexOf("|") + 1).replace("<skipBlanks>", "")
		: column.replace("<skipBlanks>", "");
}

function shouldSkipBlankColumn(column) {
	return column.indexOf("<skipBlanks>") != -1;
}

async function getCsvDataRows(filepath) {
	const filestream = fs.createReadStream(filepath);
	const dataRows = [];
	return new Promise(async (resolve) => {
		filestream
			.pipe(csv.parse({ headers: true }))
			.on("data", (row) => dataRows.push(row))
			.on("end", () => {
				resolve(dataRows);
			});
	});
}

async function getExcelDataRows(filepath) {
	const filestream = fs.createReadStream(filepath);
	const dataRows = [];
	return new Promise(async (resolve) => {
		const workBookReader = new XlsxStreamReader({ formatting: false });
		let headers = [];
		workBookReader.on("worksheet", function (workSheetReader) {
			if (workSheetReader.id > 1) {
				// we only want first sheet
				workSheetReader.skip();
				return;
			}

			workSheetReader.on("row", function (row) {
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
		workBookReader.on("end", function () {
			resolve(dataRows);
		});

		filestream.pipe(workBookReader);
	});
}

exports.getBlobReadStream = function getBlobReadStream(
	containerName,
	blobName
) {
	if (!containerName || !blobName) {
		throw new Error("Invalid Azure blob details specified");
	}

	const retryOperations = new azure.LinearRetryPolicyFilter();
	const blobService = azure.createBlobService().withFilter(retryOperations);
	return blobService.createReadStream(containerName, blobName);
};
