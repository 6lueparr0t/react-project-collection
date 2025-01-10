import { Treatments } from "../Treatments";

import { render, screen } from "@/test-utils";

test("renders response from query", async () => {
  render(<Treatments />);

  const treatmentTItles = await screen.findAllByRole("heading", { name: /massage|facial|scrub/i });

  expect(treatmentTItles).toHaveLength(3);
});
