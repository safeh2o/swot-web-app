import { initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export type ReqUser = {
	_id: string;
	name: { first: string; last: string };
	email: string;
	isAdmin: boolean;
};

type KeystoneContext = {
	req: trpcExpress.CreateExpressContextOptions["req"] & {
		user?: ReqUser;
	};
	res: trpcExpress.CreateExpressContextOptions["res"];
};

export const createContext = (opts: KeystoneContext) => {
	if (!opts.req.user) {
		return { user: null };
	}

	const user = {
		_id: opts.req.user._id,
		isAdmin: opts.req.user.isAdmin,
		name: opts.req.user.name,
		email: opts.req.user.email,
	};

	return { user };
};

export type ApiContext = Awaited<ReturnType<typeof createContext>>;
export const t = initTRPC.context<ApiContext>().create();
