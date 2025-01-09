import { queryKeys } from "./constants";

export const generateUserKey = (userId: number) => {
  // deliberately exclude the userToken from the dependency array
  // to keep key consistent for userId regardless of token changes
  return [queryKeys.user, userId];
};

export const generateUserAppoinmentsKey = (userId: number, userToken: string) => {
  return [queryKeys.appointments, queryKeys.user, userId, userToken];
};
