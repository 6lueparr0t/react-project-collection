import { http, HttpResponse } from "msw";
import { server } from "../../../mocks/server";

import { render, screen, logRoles } from "../../../test-utils/testing-library-utils";
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

test.skip("skip test", () => {});
