import { getPostCategories } from "../../../utils/data.service";
import { t } from "./trpc";

export const cmsRouter = t.router({
	postCategories: t.procedure.query(async () => {
		return getPostCategories();
	}),
});
