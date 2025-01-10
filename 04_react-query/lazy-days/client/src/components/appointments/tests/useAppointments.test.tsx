import { useAppointments } from "../hooks/useAppointments";
import { AppointmentDateMap } from "../types";

import { act, renderHook, waitFor } from "@/test-utils";
import { createQueryClientWrapper } from "@/test-utils";

// a helper function to get the total number of appointments from an AppointmentDateMap
const getAppointmentCount = (appointments: AppointmentDateMap) => {
  return Object.values(appointments).reduce(
    (runningCount, appoinmentsOnDate) => runningCount + appoinmentsOnDate.length,
    0
  );
};

test("filter appointments by availability", async () => {
  const { result } = renderHook(() => useAppointments(), {
    wrapper: createQueryClientWrapper(),
  });

  // wait for appoinments to populate
  await waitFor(() => expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(0));

  // appoinments start out filtered )show only available)
  const filteredAppoinmentsLength = getAppointmentCount(result.current.appointments);

  // set to return all appointments
  act(() => result.current.setShowAll(true));

  // wait for count of appointments to be greater than when filtered
  await waitFor(() =>
    expect(getAppointmentCount(result.current.appointments)).toBeGreaterThan(
      filteredAppoinmentsLength
    )
  );
});
