import { useEffect } from "react"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

const Account = () => {
  const { makeRequest } = useApiResponse()
  const { get, set, remove } = useLocalStorage(TOKEN_KEY)
  useEffect(() => {
    console.log(get())
  }, [])
  return <div></div>
}

export default Account
