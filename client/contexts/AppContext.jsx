import { createContext } from "react";

const AppContext = createContext({ user: null });
AppContext.displayName = "AppContext";

export default AppContext;
