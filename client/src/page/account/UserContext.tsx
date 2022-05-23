import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react"

interface IUser {
  name: string
  username: string
  whatsup?: string
  avatar?: string
}

const initUser: IUser = {
  name: "",
  username: ""
}

const UserContext = createContext<IUser>(initUser)
export const useUser = () => useContext(UserContext)

const UserProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<IUser>(initUser)

  useEffect(() => {
    // TODO: api call here to get user info, whatsup, and avatar blob
    setUser({ name: "natarich", username: "natarich", whatsup: "hey" })
    console.log("rendered in context")
  }, [])

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider
