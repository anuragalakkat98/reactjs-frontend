export function getLoggedInUserFromStorage() {
  const userData = localStorage.getItem("loggedInUser");
  return userData ? JSON.parse(userData) : null;
}

export function clearLoggedInUserFromStorage() {
  localStorage.removeItem("loggedInUser");
  localStorage.removeItem("token");
}

export function setLoggedInUserInStorage(userData: any, token?: any) {
  localStorage.setItem("loggedInUser", JSON.stringify(userData));
  localStorage.setItem("token", token);
}
