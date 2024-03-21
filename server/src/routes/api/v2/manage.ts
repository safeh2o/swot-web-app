import { z } from "zod";
import * as dataService from "../../../utils/data.service";
import { requireAreaAccess, requireCountryAccess, requireFieldsiteAccess } from "./middlewares";
import { t } from "./trpc";

const fieldsiteIdInput = z.object({ fieldsiteId: z.string() });
const fieldsiteNameInput = z.object({ fieldsiteName: z.string() });
const fieldsiteProcedureWithId = t.procedure.input(fieldsiteIdInput);

export const manageRouter = t.router({
	createFieldsite: t.procedure.input(fieldsiteNameInput).mutation(async ({ ctx, input }) => {
		const { fieldsiteName } = input;
		try {
			const fieldsite = await dataService.upsertFieldsite(null, fieldsiteName, ctx.user._id);
			return { fieldsite };
		} catch (error) {
			console.error(error);
			throw new Error("Failed to create fieldsite");
		}
	}),
	updateFieldsite: fieldsiteProcedureWithId
		.input(fieldsiteNameInput)
		.use(requireFieldsiteAccess)
		.mutation(async ({ ctx, input }) => {
			const { fieldsiteId, fieldsiteName } = input;
			try {
				const fieldsite = await dataService.upsertFieldsite(
					fieldsiteId,
					fieldsiteName,
					ctx.user._id
				);
				return { fieldsite };
			} catch (error) {
				console.error(error);
				throw new Error("Failed to update fieldsite");
			}
		}),
	deleteFieldsite: fieldsiteProcedureWithId
		.use(requireFieldsiteAccess)
		.mutation(async ({ input }) => {
			const { fieldsiteId } = input;
			try {
				await dataService.deleteFieldsite(fieldsiteId);
			} catch (error) {
				console.error(error);
				throw new Error("Failed to delete fieldsite");
			}
		}),
	createArea: t.procedure
		.input(
			z.object({
				areaName: z.string(),
				fieldsites: z.array(z.string()),
				users: z.array(z.string()),
			})
		)
		.mutation(async ({ ctx, input }) => {
			const { areaName, fieldsites, users } = input;
			try {
				const area = await dataService.upsertArea(
					null,
					areaName,
					fieldsites,
					users,
					ctx.user._id
				);
				return { area };
			} catch (error) {
				console.error(error);
				throw new Error("Failed to create area");
			}
		}),
	updateArea: t.procedure
		.input(
			z.object({
				areaId: z.string(),
				areaName: z.string(),
				fieldsites: z.array(z.string()),
				users: z.array(z.string()),
			})
		)
		.use(requireAreaAccess)
		.mutation(async ({ ctx, input }) => {
			const { areaId, areaName, fieldsites, users } = input;
			try {
				const area = await dataService.upsertArea(
					areaId,
					areaName,
					fieldsites,
					users,
					ctx.user._id
				);
				return { area };
			} catch (error) {
				console.error(error);
				throw new Error("Failed to update area");
			}
		}),
	deleteArea: t.procedure
		.input(z.object({ areaId: z.string() }))
		.use(requireAreaAccess)
		.mutation(async ({ input }) => {
			const { areaId } = input;
			try {
				await dataService.deleteArea(areaId);
			} catch (error) {
				console.error(error);
				throw new Error("Failed to delete area");
			}
		}),
	createCountry: t.procedure
		.input(z.object({ countryName: z.string(), areas: z.array(z.string()) }))
		.mutation(async ({ ctx, input }) => {
			const { countryName, areas } = input;
			try {
				const country = await dataService.upsertCountry(
					null,
					countryName,
					areas,
					ctx.user._id
				);
				return { country };
			} catch (error) {
				console.error(error);
				throw new Error("Failed to create country");
			}
		}),
	updateCountry: t.procedure
		.input(
			z.object({
				countryId: z.string(),
				countryName: z.string(),
				areas: z.array(z.string()),
			})
		)
		.use(requireCountryAccess)
		.mutation(async ({ ctx, input }) => {
			const { countryId, countryName, areas } = input;
			try {
				const country = await dataService.upsertCountry(
					countryId,
					countryName,
					areas,
					ctx.user._id
				);
				return { country };
			} catch (error) {
				console.error(error);
				throw new Error("Failed to update country");
			}
		}),
	deleteCountry: t.procedure
		.input(z.object({ countryId: z.string() }))
		.use(requireCountryAccess)
		.mutation(async ({ input }) => {
			const { countryId } = input;
			try {
				await dataService.deleteCountry(countryId);
			} catch (error) {
				console.error(error);
				throw new Error("Failed to delete country");
			}
		}),
});
