import { proxy, useSnapshot } from "valtio";

export const authStore = proxy({
  isLoggedIn: false,
});

export function useAuthState() {
  return useSnapshot(authStore);
}
