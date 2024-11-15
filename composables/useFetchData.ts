type HTTP_METHODS =
  | 'GET'
  | 'HEAD'
  | 'PATCH'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE';

/* eslint-disable @typescript-eslint/no-explicit-any */
export const useFetchData = async <T>(
  endpoint: string,
  method: HTTP_METHODS = 'GET',
  body?: Record<string, any> | BodyInit | null | undefined
) => {
  const BASE_API_URL = 'https://fc692e31-74e2-4167-b8a5-76d61603bff9.mock.pstmn.iio';

  return await $fetch<T>(`${BASE_API_URL}${endpoint}`, {
    method,
    body
  });
};
