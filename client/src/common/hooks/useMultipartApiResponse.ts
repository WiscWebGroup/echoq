import { useCallback } from "react"
import { useUnauthorizedHandler, useErrorHandler } from "./apiHandlers"

import { THeader, TMethod, useMultipartApi } from "./useMultipartApi"

export interface IRequest {
  path: string
  method: TMethod
  data: FormData
  headers?: THeader
}

export const useMultipartApiResponse = () => {
  const { postMultipart } = useMultipartApi(
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
        case "POST":
          return await postMultipart(path, data, headers)
      }
    }
    return requestCall()
  }

  const makeMultipartRequest = useCallback(makeRequestCallBack, [postMultipart])

  return { makeMultipartRequest }
}

export default useMultipartApiResponse
