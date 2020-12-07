const keystone = require("keystone");
const dataService = require("../../utils/data.service");
const std = require("../../utils/standardize");
const path = require("path");
const fs = require("fs");
const async = require("async");
const { DataTypes } = require("../../utils/enums");
const Datapoint = keystone.list("Datapoint");
const Attachment = keystone.list("Attachment");
const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
    exports.runOnThread = async function (raw) {
        return new Promise((resolve, reject) => {
            const worker = new Worker(__filename, {workerData: raw});
            worker.on("message", resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code != 0) {
                    reject(new Error(`Worker stopped with exit code ${code}`))
                }
            })
        });
    }
} else {
    newFunction();
}

async function newFunction(userId, fieldsiteId, overwrite, files) {
	const attachment = new Attachment.model({
		user: userId,
		fieldsite: fieldsiteId,
	});

	let nDuplicates = 0;

	const nBefore = await Datapoint.model
		.count({
			fieldiste: fieldsiteId,
			active: true,
			type: DataTypes.STANDARDIZED,
		})
		.exec();

	const appendData = (dataRows, type) => {
		dataRows.forEach(async (row) => {
			nDuplicates += (await dataService.createDatapoint(
				row,
				fieldsiteId,
				attachment.id,
				type,
				overwrite
			))
				? 0
				: 1;
		});
	};

	// for (let i = 0; i < files.length; i++) {
	// 	const file = files[i];
	// 	const stream = fs.createReadStream(file.path);
	// 	const ext = path.extname(file.originalname).substring(1);
	// 	const data = await std.standardize(stream, ext);
	// 	Object.values(DataTypes).forEach((dataType) => {
	// 		appendData(data[dataType], dataType);
	// 	});
	// }
	async.each(files, (file) => {
		const stream = fs.createReadStream(file.path);
		const ext = path.extname(file.originalname).substring(1);
		std.standardize(stream, ext).then((data) => {
			Object.values(DataTypes).forEach((dataType) => {
				appendData(data[dataType], dataType);
			});
		});
	});

	attachment.nBefore = nBefore;
	attachment.nDuplicates = nDuplicates;

	attachment.save();
}
