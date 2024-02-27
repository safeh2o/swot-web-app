import { render, screen } from "../test-utils";
import Home from "./Home";

describe("Home", () => {
	it("should render", () => {
		render(<Home />);
		expect(screen.getByText("Welcome Visitor,")).not.toBeNull();
	});
});
