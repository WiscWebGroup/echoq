export type TData = { [key: string]: any } | null
export type THeader = HeadersInit | { [key: string]: any }
export type TRespHandler = (response: Response) => {}
export type TMethod = "GET" | "POST" | "PUT" | "DELETE"

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

// set env var for this in production
const DEBUG_ENDPOINT = "http://192.168.1.110:8080" // for debug only

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
  const response = await fetch(DEBUG_ENDPOINT + path, {
    method: method,
    body: data ? JSON.stringify(data) : null,
    headers: headers ? headers : defaultHeaders
  }).then((response) => {
    if (response.status === 204) {
      return {}
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
    get: (path: string, headers?: THeader): Promise<any> =>
      fetchData({
        path: path,
        method: "GET",
        data: null,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    post: (path: string, data: TData, headers?: THeader): Promise<any> =>
      fetchData({
        path: path,
        method: "POST",
        data: data,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    put: (path: string, data: TData, headers?: THeader): Promise<any> =>
      fetchData({
        path: path,
        method: "PUT",
        data: data,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      }),
    del: (path: string, headers?: THeader): Promise<any> =>
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
