import { useNavigate } from "react-router-dom"
import { TRespHandler } from "./useApi"
import useLocalStorage, { TOKEN_KEY } from "./useLocalStorage"

export const useUnauthorizedHandler = () => {
  let navigate = useNavigate()
  const { remove } = useLocalStorage(TOKEN_KEY)

  const handler: TRespHandler = (response: Response) => {
    remove()
    navigate("/signin")
    console.debug("Unauthenticated access")
    return response
  }
  return handler
}

export const useErrorHandler = () => {
  const handler: TRespHandler = (response: Response) => {
    console.debug("Server error")
    return response
  }
  return handler
}
