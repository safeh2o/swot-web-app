import { createTRPCClient, httpBatchLink } from "@trpc/client";

import type { AppRouter } from "../../../server/src/routes/api/v2/index";

export default createTRPCClient<AppRouter>({
	links: [
		httpBatchLink({
			url: "/api/v2",
		}),
	],
});
