import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import { base64toBlob } from "../../common/utils/utils"

interface IUser {
  userId: number
  name: string
  username: string
  whatsup: string | null
  avatar: Blob | null
}

const initialUserState: IUser = {
  userId: 0,
  name: "",
  username: "",
  whatsup: null,
  avatar: null
}

const UserContext = createContext(initialUserState)
const UserUpdateContext = createContext<() => void>(() => {})

export const useUser = () => useContext(UserContext)
export const useUserUpdate = () => useContext(UserUpdateContext)

const UserProvider = ({ children }: { children?: ReactNode }) => {
  const { makeRequest } = useApiResponse()
  const { get } = useLocalStorage(TOKEN_KEY)
  const [user, setUser] = useState(initialUserState)

  const getInfo = async () => {
    const response = await makeRequest({
      path: "/user/getInfo",
      method: "GET",
      data: null,
      headers: {
        "XXX-SToken": get()
      }
    })
    if (response.status === 200) {
      const data = (await response.json()).t
      if (data !== null) {
        setUser({
          ...data,
          userId: data.userid,
          avatar: data.avataraddr ? base64toBlob(data.avataraddr) : null
        })
      }
    }
  }

  useEffect(() => {
    getInfo()
  }, [])

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={getInfo}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  )
}

export default UserProvider
