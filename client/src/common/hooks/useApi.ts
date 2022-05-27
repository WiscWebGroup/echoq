export type TData = { [key: string]: any } | null
export type THeader = HeadersInit | { [key: string]: any }
export type TRespHandler = (response: Response) => Response
export type TMethod = "GET" | "POST" | "PUT" | "DELETE"

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

const ORIGIN = process.env.REACT_APP_API_URL

async function fetchData({
  path,
  method,
  data,
  headers,
  onUnauthorized,
  onError
}: {
  path: string
  method: TMethod
  data: TData
  headers?: THeader
  onUnauthorized: TRespHandler
  onError: TRespHandler
}) {
  const response = await fetch(ORIGIN + path, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: headers ? headers : defaultHeaders
  }).then((response) => {
    if (response.status === 401 && !!onUnauthorized) {
      return onUnauthorized(response)
    } else if (response.status === 404 && !!onError) {
      console.debug(ORIGIN + path)
      console.debug("Endpoint " + path + " was not found")
      return response
    } else if (response.status === 401 && !!onUnauthorized) {
      return onUnauthorized(response)
    } else if (response.status >= 500 && !!onError) {
      return onError(response)
    } else {
      return response
    }
  })

  return response
}

export function useApi(onUnauthorized: TRespHandler, onError: TRespHandler) {
  return {
    get: (path: string, headers?: THeader): Promise<Response> =>
      fetchData({
        path: path,
        method: "GET",
        data: null,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    post: (path: string, data: TData, headers?: THeader): Promise<Response> =>
      fetchData({
        path: path,
        method: "POST",
        data: data,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    put: (path: string, data: TData, headers?: THeader): Promise<Response> =>
      fetchData({
        path: path,
        method: "PUT",
        data: data,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    del: (path: string, headers?: THeader): Promise<Response> =>
      fetchData({
        path: path,
        method: "DELETE",
        data: null,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      })
  }
}

export default useApi
