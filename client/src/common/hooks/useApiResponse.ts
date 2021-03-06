import { useCallback } from "react"

import useApi, { TData, THeader, TMethod } from "./useApi"
import { useUnauthorizedHandler, useErrorHandler } from "./apiHandlers"

export interface IRequest {
  path: string
  method: TMethod
  data: TData
  headers?: THeader
}

export const useApiResponse = () => {
  const { get, post, put, del } = useApi(
    useUnauthorizedHandler(),
    useErrorHandler()
  )

  const makeRequestCallBack = async (request: IRequest) => {
    const { path, method, data, headers: requestHeaders = {} } = request

    const headers = {
      ...requestHeaders,
      Accept: "application/json"
    }

    const requestCall = async () => {
      switch (method) {
        case "GET":
          return await get(path, headers)
        case "POST":
          return await post(path, data, headers)
        case "PUT":
          return await put(path, data, headers)
        case "DELETE":
          return await del(path, headers)
      }
    }
    return requestCall()
  }

  const makeRequest = useCallback(makeRequestCallBack, [get, post, put, del])

  return { makeRequest }
}

export default useApiResponse
