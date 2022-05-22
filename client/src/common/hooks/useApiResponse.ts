import { useNavigate } from "react-router-dom"

import useApi, { TData, TMethod, TRespHandler } from "./useApi"

export interface IRequest {
  path: string
  method: TMethod
  data: TData
  headers?: HeadersInit
}

const useUnauthorizedHandler = () => {
  let navigate = useNavigate()

  const handler: TRespHandler = (response: Response) => {
    navigate("/signin")
    return response
  }
  return handler
}

const useErrorHandler = () => {
  const handler: TRespHandler = (response: Response) => {
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
    const { path, method, data, headers } = request

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
