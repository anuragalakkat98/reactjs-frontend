import { proxy, useSnapshot } from "valtio";

export const userDetailsStore = proxy(
  { user: getLoggedInUserDetails() } || { user: null }
);

export function useUserSnapshot() {
  return useSnapshot(userDetailsStore);
}

export function setLoggedInUser(userData: any) {
  userDetailsStore.user = userData;
}

export function getLoggedInUser() {
  return userDetailsStore.user;
}

export function clearLoggedInUser() {
  userDetailsStore.user = null;
}

export function getLoggedInUserDetails() {
  try {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      return JSON.parse(loggedInUser);
    }
    return null;
  } catch (e) {
    console.log("error", e);
    return null;
  }
}
