export const GetToken = (): string | null => {
  return localStorage.getItem('token');
};

export const GetTokenExpiry = (): number | null => {
  const expiryValue = localStorage.getItem('sessionExpiry');

  return expiryValue ? Date.parse(expiryValue) : null;
};

export const IsTokenValid = (): boolean => {
  const expiry = GetTokenExpiry();
  if (!GetToken()) {
    return false;
  }

  if (!expiry || expiry < Date.now()) {
    return false;
  }

  return true;
};

const getCookie = (name: string) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length === 2) {
    return parts.pop()!.split(';').shift();
  }
};
