import { createContext, t } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import { userRouter } from "./user";
import { cmsRouter } from "./cms";

const appRouter = t.router({
	users: userRouter,
	cms: cmsRouter,
});

export const middleware = trpcExpress.createExpressMiddleware({
	router: appRouter,
	createContext,
});

export type AppRouter = typeof appRouter;
