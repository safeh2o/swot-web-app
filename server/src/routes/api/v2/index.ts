import { createContext, t } from "./trpc";
import * as trpcExpress from "@trpc/server/adapters/express";
import { userRouter } from "./user";

const appRouter = t.router({
	users: userRouter
});

export const middleware = trpcExpress.createExpressMiddleware({
	router: appRouter,
	createContext,
});

export type AppRouter = typeof appRouter;
