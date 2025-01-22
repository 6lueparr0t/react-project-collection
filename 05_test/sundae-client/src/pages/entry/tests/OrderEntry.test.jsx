import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen, logRoles } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

test.only("handles errors for scoops and toppings routes", async () => {
  server.resetHandlers(
    http.get("http://localhost:3030/scoops", () => {
      return new HttpResponse(null, { status: 500 });
    }),
    http.get("http://localhost:3030/toppings", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  const { container } = render(<OrderEntry />);

  const alerts = await screen.findAllByRole("alert");
  // const alerts = await screen.findAllByText(
  //   /An unexpected error occurred. Please try again later./i
  // );

  // logRoles(container);

  expect(alerts).toHaveLength(2);
});

// eslint-disable-next-line vitest/no-commented-out-tests
// test.skip("skip test", () => {});

test("disable order button if there are no scoops ordered", async () => {
  const user = userEvent.setup();
  // render(<OrderEntry setOrderPhase={jest.fn()}/>); // tsx 인 경우
  render(<OrderEntry />);

  // order button should be disabled at first, even before options load
  const orderButton = await screen.findByRole("button", {
    name: /order sundae/i,
  });
  expect(orderButton).toBeDisabled();

  // expect button to be enabled after adding scoop
  const vanillaInput = await screen.findByRole("spinbutton", {
    name: "Vanilla",
  });
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "1");
  expect(orderButton).toBeEnabled();

  // expect button to be disabled again after removing scoop
  await userEvent.clear(vanillaInput);
  await userEvent.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
