import * as dataService from "../../utils/data.service";

export async function updateFieldsite(req, res) {
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
}
export async function createFieldsite(req, res) {
	const { fieldsiteName } = req.body;

	try {
		const fieldsite = await dataService.upsertFieldsite(
			null,
			fieldsiteName,
			req.user.id
		);
		return res.json({ fieldsite });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}
export async function deleteFieldsite(req, res) {
	const { fieldsiteId } = req.params;

	try {
		await dataService.deleteFieldsite(fieldsiteId);
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}

export async function updateArea(req, res) {
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
}
export async function createArea(req, res) {
	const { areaName, fieldsites, users } = req.body;

	try {
		const area = await dataService.upsertArea(
			null,
			areaName,
			fieldsites,
			users,
			req.user.id
		);
		return res.json({ area });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}
export async function deleteArea(req, res) {
	const { areaId } = req.params;

	try {
		await dataService.deleteArea(areaId);
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}

export async function updateCountry(req, res) {
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
}
export async function createCountry(req, res) {
	const { countryName, areas } = req.body;

	try {
		const country = await dataService.upsertCountry(
			null,
			countryName,
			areas,
			req.user.id
		);
		return res.json({ country });
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}
export async function deleteCountry(req, res) {
	const { countryId } = req.params;

	try {
		await dataService.deleteCountry(countryId);
		return res.sendStatus(200);
	} catch (error) {
		console.error(error);
		return res.sendStatus(400);
	}
}
