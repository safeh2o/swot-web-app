import * as trpcExpress from "@trpc/server/adapters/express";
import { cmsRouter } from "./cms";
import { manageRouter } from "./manage";
import { createContext, t } from "./trpc";
import { userRouter } from "./user";

const appRouter = t.router({
	users: userRouter,
	cms: cmsRouter,
	manage: manageRouter,
});

export const middleware = trpcExpress.createExpressMiddleware({
	router: appRouter,
	createContext,
});

export type AppRouter = typeof appRouter;
