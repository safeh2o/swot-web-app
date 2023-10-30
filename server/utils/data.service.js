const csv = require("fast-csv");
const keystone = require("keystone");
const Country = keystone.list("Country");
const Area = keystone.list("Area");
const Fieldsite = keystone.list("Fieldsite");
const User = keystone.list("User");
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

const getBlob = async function (containerName, blobName) {
	const blobClient = new BlobClient(
		process.env.AZURE_STORAGE_CONNECTION_STRING,
		containerName,
		blobName
	);

	const buffer = await blobClient.downloadToBuffer();

	return buffer.toString();
};

function convertCSVStringToJSON(csvString) {
	const jsonObjects = [];

	return new Promise((resolve, reject) => {
		csv.parseString(csvString, { headers: true })
			.on("data", (data) => {
				jsonObjects.push(data);
			})
			.on("end", () => {
				resolve(jsonObjects);
			})
			.on("error", (error) => {
				reject(error);
			});
	});
}

exports.getCsvBlobAsJson = async function (containerName, blobName) {
	let jsonContents = undefined;
	try {
		const csvContents = await getBlob(containerName, blobName);
		jsonContents = await convertCSVStringToJSON(csvContents);
	} catch (err) {
		console.error(`cannot get blob ${blobName}`);
	}

	return jsonContents;
};

async function getManagedCountries(userId) {
	const countries = await Country.model.find({ admins: userId }).populate({
		path: "areas",
		populate: [
			{ path: "users", select: "name" },
			{ path: "fieldsites", select: "name" },
		],
	});
	return _.mapKeys(countries, (country) => country._id) || {};
}
exports.getManagedCountries = getManagedCountries;

async function getManagedAreas(userId) {
	const areas = await Area.model
		.find({ admins: userId })
		.populate("users", ["name"])
		.populate("fieldsites", ["name"]);
	return _.mapKeys(areas, (area) => area._id) || {};
}
exports.getManagedAreas = getManagedAreas;

async function getManagedFieldsites(userId) {
	const fieldsites = await Fieldsite.model.find({ admins: userId });
	return _.mapKeys(fieldsites, (fieldsite) => fieldsite._id) || {};
}
exports.getManagedFieldsites = getManagedFieldsites;

exports.upsertFieldsite = async function (fieldsiteId, fieldsiteName, userId) {
	let fieldsite;
	if (fieldsiteId) {
		fieldsite = await Fieldsite.model.findOne({ _id: fieldsiteId });
		fieldsite.name = fieldsiteName;
	} else {
		fieldsite = await Fieldsite.model.create({
			name: fieldsiteName,
			admins: [userId],
		});
	}
	fieldsite.save();

	return fieldsite;
};
exports.deleteFieldsite = async function (fieldsiteId) {
	if (fieldsiteId) {
		await Fieldsite.model.deleteOne({ _id: fieldsiteId });
	}
	return;
};

exports.upsertArea = async function (
	areaId,
	areaName,
	fieldsites,
	users,
	userId
) {
	let area;
	if (areaId) {
		area = await Area.model.findOne({ _id: areaId });
		area.name = areaName;
		area.fieldsites = fieldsites;
		area.users = users;
	} else {
		area = await Area.model.create({
			name: areaName,
			fieldsites,
			users,
			admins: [userId],
		});
	}

	area.save();
	return area;
};
exports.deleteArea = async function (areaId) {
	if (areaId) {
		await Area.model.deleteOne({ _id: areaId });
	}
	return;
};

exports.upsertCountry = async function (countryId, countryName, areas, userId) {
	let country;
	if (countryId) {
		country = await Country.model.findOne({ _id: countryId });
		country.name = countryName;
		country.areas = areas;
	} else {
		country = await Country.model.create({
			name: countryName,
			areas,
			admins: [userId],
		});
	}

	country.save();
	return country;
};

exports.deleteCountry = async function (countryId) {
	if (countryId) {
		await Country.model.deleteOne({ _id: countryId });
	}
	return;
};

async function getImplicitPermissions(
	isAdmin,
	explicitCountries,
	explicitAreas,
	explicitFieldsites,
	explicitUsers
) {
	let countries = explicitCountries,
		areas = explicitAreas,
		fieldsites = explicitFieldsites,
		users = explicitUsers;
	if (isAdmin) {
		countries = await Country.model.find();
		areas = await Area.model
			.find()
			.populate("users", ["name"])
			.populate("fieldsites", ["name"]);
		fieldsites = await Fieldsite.model.find();
		users = await User.model.find({}, ["name"]);
	} else {
		for (const countryId of Object.keys(countries)) {
			const country = countries[countryId];
			const countryAreas = await Area.model
				.find({
					_id: { $in: country.areas },
				})
				.populate("users", ["name"])
				.populate("fieldsites", ["name"]);
			for (const area of countryAreas) {
				if (!areas[area._id]) {
					areas[area._id] = area;
				}
			}
		}
		for (const areaId of Object.keys(areas)) {
			const area = areas[areaId];
			const areaFieldsites = await Fieldsite.model.find({
				_id: { $in: area.fieldsites },
			});
			for (const fieldsite of areaFieldsites) {
				if (!fieldsites[fieldsite._id]) {
					fieldsites[fieldsite._id] = fieldsite;
				}
			}
			for (const user of area.users) {
				if (!users[user._id]) {
					users[user._id] = user;
				}
			}
		}
	}

	const permissions = {
		countries: Object.values(countries),
		areas: Object.values(areas),
		fieldsites: Object.values(fieldsites),
		users: Object.values(users),
	};

	return permissions;
}

async function getPermissions(user) {
	const { id: userId, isAdmin } = user;
	const countries = isAdmin ? {} : await getManagedCountries(userId);
	const areas = isAdmin ? {} : await getManagedAreas(userId);
	const fieldsites = isAdmin ? {} : await getManagedFieldsites(userId);
	const users = isAdmin ? {} : { [userId]: user };

	const permissions = await getImplicitPermissions(
		isAdmin,
		countries,
		areas,
		fieldsites,
		users
	);

	return permissions;
}

exports.getPermissions = getPermissions;

exports.isUserAllowedAccessToFieldsite = async function (user, fieldsiteId) {
	const permissions = await getPermissions(user);

	return !!permissions.fieldsites.find(
		(fieldsite) => fieldsite._id.toString() === fieldsiteId
	);
};

exports.isUserAllowedAccessToArea = async function (user, areaId) {
	const permissions = await getPermissions(user);

	return !!permissions.areas.find((area) => area._id.toString() === areaId);
};

exports.isUserAllowedAccessToCountry = async function (user, countryId) {
	const permissions = await getPermissions(user);

	return !!permissions.countries.find(
		(country) => country._id.toString() === countryId
	);
};
