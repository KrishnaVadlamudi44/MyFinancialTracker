export const Get = async <T>(
  endPoint: string,
  authorizedCall: boolean = true,
  queryParameters?: string
): Promise<T> => {
  try {
    let requestHeaders = getDefaultHeaders();

    authorizedCall &&
      requestHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );

    endPoint = queryParameters ? `${endPoint}?${queryParameters}` : endPoint;
    const response = await fetch(endPoint, {
      method: 'GET',
      headers: requestHeaders,
    });

    if (response.ok) {
      return response.json();
    } else {
      return {} as T;
    }
  } catch {
    return {} as T;
  }
};

export const Post = async <R, T>(
  endPoint: string,
  authorizedCall: boolean = true,
  payload: T
): Promise<R> => {
  try {
    let requestHeaders = getDefaultHeaders();
    authorizedCall &&
      requestHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    const response = await fetch(endPoint, {
      method: 'POST',
      headers: requestHeaders,
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      return response.json();
    } else {
      return {} as R;
    }
  } catch {
    return {} as R;
  }
};

export const Delete = async (
  endPoint: string,
  authorizedCall: boolean = true
): Promise<boolean> => {
  try {
    let requestHeaders = getDefaultHeaders();
    authorizedCall &&
      requestHeaders.append(
        'Authorization',
        `Bearer ${localStorage.getItem('token')}`
      );
    const response = await fetch(endPoint, {
      method: 'DELETE',
      headers: requestHeaders,
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

const getDefaultHeaders = () => {
  return new Headers({
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json, text/plain',
  });
};

const getCookie = (name: string) => {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name + '=');

  if (parts.length === 2) {
    return parts.pop()!.split(';').shift();
  }
};
