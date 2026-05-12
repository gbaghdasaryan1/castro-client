export function saveToken(token: string) {
  localStorage.setItem("token", token);
  document.cookie = `token=${token}; path=/; SameSite=Lax`;
}

export function clearToken() {
  localStorage.removeItem("token");
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
}
