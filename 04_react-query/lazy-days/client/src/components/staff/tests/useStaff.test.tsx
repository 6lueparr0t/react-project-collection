import { useStaff } from "../hooks/useStaff";

import { act, renderHook, waitFor } from "@/test-utils";
import { createQueryClientWrapper } from "@/test-utils";

test("filter staff", async () => {
  const { result } = renderHook(() => useStaff(), {
    wrapper: createQueryClientWrapper(),
  });

  // wait for staff to populate
  await waitFor(() => expect(result.current.staff).toHaveLength(4));

  // set to filter for only staff who give massage
  act(() => result.current.setFilter("facial"));

  // wailt for staff list to display only 3
  await waitFor(() => {
    expect(result.current.staff).toHaveLength(3);
  });

  await waitFor(() => {
    const filteredStaff = result.current.staff;
    expect(filteredStaff.every((staff) => staff.treatmentNames.includes("facial"))).toBe(true);
  });
});
