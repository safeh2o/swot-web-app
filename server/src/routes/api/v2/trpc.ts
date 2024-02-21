import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

type KeystoneContext = {
	req: {
		user?: {
			_id: string;
			name: { first: string; last: string };
			email: string;
			isAdmin: boolean;
		};
	} & trpcExpress.CreateExpressContextOptions["req"];
	res: trpcExpress.CreateExpressContextOptions["res"];
};

export const createContext = (opts: KeystoneContext) => {
	return { user: opts.req.user };
};

type Context = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<Context>().create();
