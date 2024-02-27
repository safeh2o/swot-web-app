import { render, RenderOptions } from "@testing-library/react";
import Providers from "./components/Providers";

const customRender = (ui: React.ReactElement, options?: Omit<RenderOptions, "wrapper">) =>
	render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { customRender as render };
