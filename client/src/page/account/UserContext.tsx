import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

interface IUser {
  name: string
  username: string
  whatsup: string | null
  avatar: string | null
}

const initialUserState: IUser = {
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
    const data = (await response.json()).t
    setUser({
      ...data,
      avatar: data.avataraddr ? URL.createObjectURL(data.avataraddr) : null
    })
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
