import { useNavigate } from "react-router-dom"

import useApi, { TData, THeader, TMethod, TRespHandler } from "./useApi"

export interface IRequest {
  path: string
  method: TMethod
  data: TData
  headers?: THeader
}

const useUnauthorizedHandler = () => {
  let navigate = useNavigate()

  const handler: TRespHandler = (response: Response) => {
    console.debug("Unauthenticated access")
    console.debug("TODO: remove authentication here")
    navigate("/signin")
    return response
  }
  return handler
}

const useErrorHandler = () => {
  const handler: TRespHandler = (response: Response) => {
    console.debug("Server error")
    return response
  }
  return handler
}

export const useApiResponse = () => {
  const { get, post, put, del } = useApi(
    useUnauthorizedHandler(),
    useErrorHandler()
  )

  const makeRequest = async (request: IRequest) => {
    const { path, method, data, headers: requestHeaders = {} } = request

    const headers = {
      ...requestHeaders,
      "Content-Type": "application/json",
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

  return { makeRequest }
}

export default useApiResponse
