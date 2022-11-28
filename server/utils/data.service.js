const keystone = require("keystone");
const Country = keystone.list("Country");
const Area = keystone.list("Area");
const Fieldsite = keystone.list("Fieldsite");
const mongoose = require("mongoose");
const Dataset = keystone.list("Dataset");
const Upload = keystone.list("Upload");
const _ = require("lodash");
const { BlobSASPermissions, BlobClient } = require("@azure/storage-blob");

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

exports.isUserAllowedAccessToUpload = async function (userId, uploadId) {
	const upload = await Upload.model.findOne({ _id: uploadId, user: userId });

	return upload !== null;
};

/**
 * Retrieves a area record where field is associated
 */
exports.getAreaByFieldsite = async function (fieldSiteId) {
	return Area.model.findOne({ fieldsites: fieldSiteId }).exec();
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

exports.getSas = async function (containerName, blobName) {
	const blobClient = new BlobClient(
		process.env.AZURE_STORAGE_CONNECTION_STRING,
		containerName,
		blobName
	);
	const blobSAS = await blobClient.generateSasUrl({
		permissions: BlobSASPermissions.parse("r"),
		expiresOn: new Date(new Date().valueOf() + 86400),
	});

	return blobSAS;
};
