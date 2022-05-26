export type THeader = { [key: string]: any }
export type TRespHandler = (response: Response) => Response
export type TMethod = "POST"

const defaultHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

// set env var for this in production
const DEBUG_ENDPOINT = "http://192.168.1.110:8080" // for debug only

async function fetchMultipartData({
  path,
  method,
  data,
  headers,
  onUnauthorized,
  onError
}: {
  path: string
  method: TMethod
  data: FormData
  headers?: THeader
  onUnauthorized: TRespHandler
  onError: TRespHandler
}) {
  const response = await fetch(DEBUG_ENDPOINT + path, {
    method: method,
    body: data,
    headers: headers ? headers : defaultHeaders
  }).then((response) => {
    if (response.status === 401 && !!onUnauthorized) {
      return onUnauthorized(response)
    } else if (response.status === 404 && !!onError) {
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

export const useMultipartApi = (
  onUnauthorized: TRespHandler,
  onError: TRespHandler
) => {
  return {
    postMultipart: (
      path: string,
      data: FormData,
      headers?: THeader
    ): Promise<Response> =>
      fetchMultipartData({
        path: path,
        method: "POST",
        data: data,
        headers: headers,
        onUnauthorized: onUnauthorized,
        onError: onError
      })
  }
}

export default useMultipartApi
