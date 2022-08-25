type FetcherConfig = {
  method?: HTTPMethod;
  body?: object;
  config?: RequestInit;
};

type HTTPMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'DELETE'
  | 'CONNECT'
  | 'OPTIONS'
  | 'TRACE'
  | 'PATCH';

export async function fetcher(
  path: string,
  { method, body, config }: FetcherConfig = { method: 'GET' },
  baseUrl = '/api'
) {
  const response = await fetch(baseUrl + path, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method,
    ...config,
    ...(body && { body: JSON.stringify(body) }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch data');
  }

  return data;
}
