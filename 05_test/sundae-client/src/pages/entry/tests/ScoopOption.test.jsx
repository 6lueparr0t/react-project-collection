import { render, screen, logRoles } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import ScoopOptions from "../ScoopOption";

test("indicate if scoop count is non-int or out of range", async () => {
  const user = userEvent.setup();
  const { container } = render(<ScoopOptions />);
  // logRoles(container);

  // expect input to be invalid with negative numer
  const counter = screen.getByRole("spinbutton");
  await user.clear(counter);
  await user.type(counter, "-1");
  expect(counter).toHaveClass("is-invalid");

  // replace with decimal input
  await user.clear(counter);
  await user.type(counter, "2.5");
  expect(counter).toHaveClass("is-invalid");

  // replace with input that's too high
  await user.clear(counter);
  await user.type(counter, "11");
  expect(counter).toHaveClass("is-invalid");
});
