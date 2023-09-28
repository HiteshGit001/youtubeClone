export const getLocalStorage = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const setLocalStorage = (key: string, value: string): void => {
  return localStorage.setItem(key, value);
};

export const setSessionStorage = (key: string, value: string): void => {
  return sessionStorage.setItem(key, value);
};

export const getSessionStorage = (key: string): string | null => {
  return sessionStorage.getItem(key);
};
