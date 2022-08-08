import { createContext } from "react";

const AppContext = createContext({ currentCommitSha: "", gtag: "" });
AppContext.displayName = "AppContext";

export default AppContext;
