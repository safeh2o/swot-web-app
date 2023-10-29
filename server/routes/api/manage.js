const dataService = require("../../utils/data.service");

exports.updateFieldsite = async (req, res) => {
	const { fieldsiteName } = req.body;
	const { fieldsiteId } = req.params;

	try {
		const fieldsite = await dataService.upsertFieldsite(
			fieldsiteId,
			fieldsiteName
		);
		return res.json({ fieldsite });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
exports.createFieldsite = async (req, res) => {
	const { fieldsiteName } = req.body;

	try {
		const fieldsite = await dataService.upsertFieldsite(
			null,
			fieldsiteName
		);
		return res.json({ fieldsite });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
exports.deleteFieldsite = async (req, res) => {
	const { fieldsiteId } = req.params;

	try {
		await dataService.deleteFieldsite(fieldsiteId);
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};

exports.updateArea = async (req, res) => {
	const { areaName, fieldsites, users } = req.body;
	const { areaId } = req.params;

	try {
		const area = await dataService.upsertArea(
			areaId,
			areaName,
			fieldsites,
			users
		);
		return res.json({ area });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
exports.createArea = async (req, res) => {
	const { areaName, fieldsites, users } = req.body;

	try {
		const area = await dataService.upsertArea(
			null,
			areaName,
			fieldsites,
			users
		);
		return res.json({ area });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
exports.deleteArea = async (req, res) => {
	const { areaId } = req.params;

	try {
		await dataService.deleteArea(areaId);
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};

exports.updateCountry = async (req, res) => {
	const { countryName, countryId, areas } = req.body;

	try {
		const country = await dataService.upsertCountry(
			countryId,
			countryName,
			areas
		);
		return res.json({ country });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
exports.createCountry = async (req, res) => {
	const { countryName, areas } = req.body;

	try {
		const country = await dataService.upsertCountry(
			null,
			countryName,
			areas
		);
		return res.json({ country });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
exports.deleteCountry = async (req, res) => {
	const { countryId } = req.params;

	try {
		await dataService.deleteCountry(countryId);
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
};
