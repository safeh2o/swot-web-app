const keystone = require("keystone");
const Country = keystone.list("Country");
const Area = keystone.list("Area");
const Fieldsite = keystone.list("Fieldsite");
const mongoose = require("mongoose");
const Dataset = keystone.list("Dataset");
const Datapoint = keystone.list("Datapoint");
const _ = require("lodash");
const DataTypes = require("./enums").DataTypes;

/**
 * Retrieves a fieldsite record by it's id
 */
exports.getFieldsiteById = async function (fieldsiteId) {
	return Fieldsite.model.findById(fieldsiteId).exec();
};

exports.getFieldsitesByArea = async function (areaId) {
	const area = Area.model.findById(areaId).exec();
	return area.fieldsites;
};

/**
 * Retrieves a country record where area is associated
 */
exports.getCountryByArea = async function (areaId) {
	return Country.model
		.findOne({ areas: mongoose.Types.ObjectId(areaId) })
		.exec();
};

exports.isUserAllowedAccessToDataset = async function (userId, datasetId) {
	const dataset = await Dataset.model.findOne({ _id: datasetId });
	const fieldsiteId = dataset.fieldsite;
	const area = await Area.model.findOne({
		fieldsites: fieldsiteId,
		users: userId,
	});

	return area !== null;
};

/**
 * Retrieves a area record where field is associated
 */
exports.getAreaByFieldsite = async function (fieldSiteId) {
	return Area.model.findOne({ fieldsites: fieldSiteId }).exec();
};

exports.getIdentifier = function (dataItem) {
	if (!dataItem || !dataItem.name || !dataItem._id) {
		throw (
			"Incorrect dataitem passed - can not produce name/id of " + dataItem
		);
	}
	return `${dataItem.name.replace(/[^0-9a-z]/gi, "").toLowerCase()}-${
		dataItem._id
	}`;
};

exports.sanitizeStr = function (str) {
	return `${str.replace(/[^0-9a-z]/gi, "")}`;
};

exports.getIdentifierKeyValue = function (name, id) {
	if (!name || !id) {
		throw (
			"Incorrect dataitem passed - can not produce name/id of " +
			name +
			" " +
			id
		);
	}
	return `${name.replace(/[^0-9a-z]/gi, "").toLowerCase()}-${id}`;
};

exports.archiveDatasets = async function (datasetIds) {
	await datasetIds.forEach(async (datasetId) => {
		console.log(`Archiving dataset ${datasetId}`);
		await Dataset.model
			.findOneAndUpdate({ _id: datasetId }, { $set: { archived: true } })
			.exec();
	});
};

exports.getAreasWithFieldsites = async function getAreasWithFieldsites(userId) {
	return Area.model
		.find({ users: userId, fieldsites: { $ne: [] } })
		.populate("users")
		.populate("fieldsites")
		.exec();
};

/**
 * Return user's associated fieldsites from area relationship
 */
exports.getUserFieldsites = async function (userId) {
	const areasHavingUser = await Area.model
		.find({ users: userId })
		.populate("users")
		.populate("fieldsites")
		.exec();

	if (!areasHavingUser) {
		return null;
	}

	let fieldsites = [];

	for (let i = 0; i < areasHavingUser.length; i++) {
		const prj = areasHavingUser[i];
		const countriesHavingArea = await getCountriesHavingArea(prj.id);

		if (countriesHavingArea.length) {
			fieldsites = fieldsites.concat(prj.fieldsites);
		}
	}

	return _.uniqBy(
		_.sortBy(fieldsites, (f) => f.name),
		"_id"
	);
};

function getCountriesHavingArea(areaId) {
	return Country.model.find({ areas: areaId }).exec();
}

/**
 * Return user's associated areas
 */
exports.getUserAreas = async function (userId) {
	const areasHavingUser = await Area.model.find({ users: userId }).exec();

	if (!areasHavingUser) {
		return null;
	}

	return _.sortBy(areasHavingUser, (p) => p.name);
};

/**
 * Return user's associated areas
 */
exports.getUserCountries = async function (userId) {
	const areasHavingUser = await Area.model.find({ users: userId }).exec();

	if (!areasHavingUser?.length) {
		return null;
	}

	const countriesHavingAreas = (
		await Promise.all(
			areasHavingUser.map(
				async (area) => await getCountriesHavingArea(area.id)
			)
		)
	).flatMap((x) => x);

	const userCountries = _.chain(countriesHavingAreas)
		.uniqWith((c1, c2) => c1.id === c2.id)
		.sortBy((c) => c.name);

	return userCountries;
};

exports.createDatapoint = async function createDatapoint(
	rowObj,
	fieldsiteId,
	attachmendId,
	type = null,
	overwrite = false
) {
	const datapoint = {
		tsDate: rowObj.ts_datetime,
		hhDate: rowObj.hh_datetime,
		tsFrc: rowObj.ts_frc,
		hhFrc: rowObj.hh_frc,
		tsCond: rowObj.ts_cond,
		tsTemp: rowObj.ts_wattemp,
	};

	if (type == DataTypes.STANDARDIZED) {
		let duplicatePoints = await Datapoint.model
			.find({
				fieldsite: fieldsiteId,
				tsDate: rowObj.ts_datetime,
				hhDate: rowObj.hh_datetime,
			})
			.exec();

		if (duplicatePoints.length) {
			if (!overwrite) {
				return null;
			} else {
				duplicatePoints.forEach((existing) => {
					existing.set({ active: false });
					existing.save();
				});
			}
		}
	}

	const datapointModel = new Datapoint.model({
		...datapoint,
		attachment: attachmendId,
		fieldsite: fieldsiteId,
	});

	if (type == DataTypes.ERRONEOUS) {
		datapointModel.type = type;
		datapointModel.active = false;
		datapointModel.reason = rowObj.reason;
	}

	datapointModel.save();

	return datapointModel;
};

exports.updateDatasetBlobInfo = async function (
	datasetId,
	rawDataURL,
	rawBlobName,
	stdDataURL,
	stdBlobName
) {
	const setQuery = {
		"file.url": rawDataURL,
		"file.filename": rawBlobName,
		"stdFile.url": stdDataURL,
		"stdFile.filename": stdBlobName,
		"stdFile.container": process.env.AZURE_STORAGE_CONTAINER_STD,
	};
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{ $set: setQuery },
			{ strict: false }
		)
		.exec();
};

exports.updateDatasetWithBlobPrefix = async function (
	datasetId,
	containerName,
	prefix
) {
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{
				$set: {
					analysisContainer: containerName,
					analysisBlobPrefix: prefix,
					archived: false,
				},
			}
		)
		.exec();
};

/**
 * Update dataset record with current user's ID
 */
exports.associateDatasetWithUser = async function (userId, datasetId) {
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{ $set: { user: mongoose.Types.ObjectId(userId) } }
		)
		.exec();
};

exports.getUserDatasets = async function (user, fieldsite) {
	return await Dataset.model.find({ user, fieldsite });
};

/**
 * Update dataset record with selected fieldsite ID
 */
exports.associateDatasetWithFieldsite = async function (
	fieldsiteIdStr,
	datasetId
) {
	return Dataset.model
		.findOneAndUpdate(
			{ _id: datasetId },
			{ $set: { fieldsite: mongoose.Types.ObjectId(fieldsiteIdStr) } }
		)
		.exec();
};
