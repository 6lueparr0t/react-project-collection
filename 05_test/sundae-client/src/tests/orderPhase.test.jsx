import { render, screen } from "@testing-library/react";
import { logRoles } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

test("order phases for happy path", async () => {
  // render app
  const { container, unmount } = render(<App />);
  // logRoles(container)

  // add ice cream scoops and toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");

  const chocolateInput = await screen.findByRole("spinbutton", {
    name: "Chocolate",
  });
  await userEvent.clear(chocolateInput);
  await userEvent.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesCheckbox);

  // find and click order summary button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await userEvent.click(orderSummaryButton);

  // check summary subtotal
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: /Scoops: \$/ });
  expect(scoopsHeading).toHaveTextContent("6.00");

  const toppingsHeading = screen.getByRole("heading", { name: /Toppings: \$/ });
  expect(toppingsHeading).toHaveTextContent("1.50");

  // check summary option items
  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  // // alternatively
  // const optionItems = screen.getAllByRole('listitem');
  // const optionItemsText = optionItems.map((item) => item.textContent);
  // expect(optionItemsText).toEqual(['1 Vanilla', '2 Chocolate', 'Cherries']);

  // accept terms and conditions and click button to confirm order
  const tcCheckbox = await screen.findByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await userEvent.click(tcCheckbox);

  const confirmOrderButton = screen.getByRole("button", { name: /confirm order/i });
  await userEvent.click(confirmOrderButton);

  // Expect "loading" to show
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // check confirmation page text
  // this one is async because there is a POST request to server in between summary
  // and confirmation pages
  const thankYouHeader = await screen.findByRole("heading", {
    name: /thank you/i,
  });
  expect(thankYouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();

  // click new order button on confirmation page
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");
  expect(scoopsSubtotal).toBeInTheDocument();
  const toppingsSubtotal = screen.getByText("Toppings total: $0.00");
  expect(toppingsSubtotal).toBeInTheDocument();

  unmount();
});

test("Toppings header is not on summary page if no toppings ordered", async () => {
  const user = userEvent.setup();
  // render app
  render(<App />);

  // add ice cream scoops but no toppings
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  // add a topping and confirm
  const cherriesTopping = await screen.findByRole("checkbox", {
    name: "Cherries",
  });
  await userEvent.click(cherriesTopping);
  expect(cherriesTopping).toBeChecked();
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  // remove the topping
  await user.click(cherriesTopping);
  expect(cherriesTopping).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  // find and click order summary button
  const orderSummaryButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  await userEvent.click(orderSummaryButton);

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $2.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
