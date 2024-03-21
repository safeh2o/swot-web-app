import { TRPCError, experimental_trpcMiddleware } from "@trpc/server";
import * as dataService from "../../../utils/data.service";
import { type ApiContext } from "./trpc";

export const requireFieldsiteAccess = experimental_trpcMiddleware<{
	ctx: ApiContext;
	input: { fieldsiteId: string };
}>().create(async (opts) => {
	const fieldsiteId = opts.input.fieldsiteId;
	const hasAccess = await dataService.isUserAllowedAccessToFieldsite(opts.ctx.user, fieldsiteId);

	if (!hasAccess) {
		throw new TRPCError({
			code: "FORBIDDEN",
		});
	}

	return opts.next();
});

export const requireAreaAccess = experimental_trpcMiddleware<{
	ctx: ApiContext;
	input: { areaId: string };
}>().create(async (opts) => {
	const areaId = opts.input.areaId;
	const hasAccess = await dataService.isUserAllowedAccessToArea(opts.ctx.user, areaId);

	if (!hasAccess) {
		throw new TRPCError({
			code: "FORBIDDEN",
		});
	}

	return opts.next();
});

export const requireCountryAccess = experimental_trpcMiddleware<{
	ctx: ApiContext;
	input: { countryId: string };
}>().create(async (opts) => {
	const countryId = opts.input.countryId;
	const hasAccess = await dataService.isUserAllowedAccessToCountry(opts.ctx.user, countryId);

	if (!hasAccess) {
		throw new TRPCError({
			code: "FORBIDDEN",
		});
	}

	return opts.next();
});
