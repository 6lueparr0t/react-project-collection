import { render, screen } from "../../../test-utils/testing-library-utils";
// import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
// import { OrderDetailsProvider } from "../../../contexts/OrderDetails";

test("update scoop subtotal when scoops change", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);
  // render(<Options optionType="scoops" />, { wrapper: OrderDetailsProvider });

  // make sure total starts out at $0.00
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false }); // exact: partial match
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  // update vanilla scoops to 1 and check the subtotal
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");
  expect(scoopsSubtotal).toHaveTextContent("2.00");

  // update chocolate scoops to 2 and check the subtotal
  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });

  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");
  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when toppings change", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"toppings"} />);

  const toppingsSubtotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsSubtotal).toHaveTextContent("0.00");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });

  // add cherries and check subtotal
  await user.click(cherriesCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");

  const mnmsCheckbox = await screen.findByRole("checkbox", {
    name: "M&Ms",
  });

  // add M&Ms and check subtotal
  await user.click(mnmsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("3.00");

  // remove M&Ms and check subtotal
  await user.click(mnmsCheckbox);
  expect(toppingsSubtotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {});
  test("grand total updates properly if scoop is added first", () => {});
  test("grand total updates properly if topping is added first", () => {});
  test("grand total updates properly if item is removed", () => {});
});
