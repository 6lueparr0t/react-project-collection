import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
// import { render, screen } from "@testing-library/react";

import Options from "../Options";

test("displays image for each scoop option from server", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages.length).toBeGreaterThanOrEqual(2);

  // confirm alt text of images
  // @ts-ignore
  const altText = scoopImages.map((element) => element.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop", "Strawberry scoop"]);
});

test("displays image for each topping option from server", async () => {
  render(<Options optionType="toppings" />);

  // find images
  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  // confirm alt text of images
  // @ts-ignore
  const altText = toppingImages.map((element) => element.alt);
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("don't update total if scoops input is invalid", async () => {
  const user = userEvent.setup();
  render(<Options optionType="scoops" />);

  // wait for the vanilla input to appear after server call
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });

  // find the scoops subtotal, which starts out at 0
  const scoopsSubtotal = screen.getByText("Scoops total: $0.00");

  // clear the input
  await user.clear(vanillaInput);

  // .type() will type one character at a time
  await user.type(vanillaInput, "2.5");

  // make sure scoops subtotal hasn't updated
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // do the same test for "100";
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "100");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");

  // and for -1
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(scoopsSubtotal).toHaveTextContent("$0.00");
});
