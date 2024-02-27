import * as dataService from "../../../utils/data.service";
import { t } from "./trpc";

export const userRouter = t.router({
	me: t.procedure.query(async ({ ctx }) => {
		const { user } = ctx;
		if (!user) {
			return { user: null };
		}

		return dataService.getPopulatedUser(user);
	}),
	permissions: t.procedure.query(async ({ ctx }) => {
		if (!ctx.user) {
			return {
				permissions: {
					areas: [],
					countries: [],
					fieldsites: [],
					users: [],
				},
			};
		}

		const permissions = await dataService.getPermissions(ctx.user);
		return { permissions };
	}),
});
