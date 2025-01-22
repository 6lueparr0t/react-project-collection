import { render, screen, logRoles } from "../../../test-utils/testing-library-utils";
import { server } from "../../../mocks/server";
import { http, HttpResponse } from "msw";

import OrderConfirmation from "../OrderConfirmation";

test("error response from server for submitting order", async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    http.post("http://localhost:3030/order", () => {
      return new HttpResponse(null, { status: 500 });
    })
  );

  // const { container } = render(<OrderConfirmation />);
  render(<OrderConfirmation />);

  // logRoles(alerts);
  const alerts = await screen.findByRole("alert");
  expect(alerts).toHaveTextContent("An unexpected error occurred. Please try again later.");

  const alertsAll = await screen.findAllByRole("alert");
  expect(alertsAll).toHaveLength(1);
});
