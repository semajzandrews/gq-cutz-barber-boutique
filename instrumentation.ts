export async function register() {
  if (typeof localStorage === "undefined") {
    (global as unknown as { localStorage: object }).localStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
  if (typeof sessionStorage === "undefined") {
    (global as unknown as { sessionStorage: object }).sessionStorage = {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    };
  }
}
