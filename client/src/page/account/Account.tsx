import { Divider, VStack } from "@chakra-ui/react"

import { AuthedHeader } from "../../components/Header"
import { AuthedFooter } from "../../components/Footer"
import UpdateAccount from "./UpdateAccount"
import UpdateProfile from "./UpdateProfile"
import UpdateWhatsup from "./UpdateWhatsup"
import UserProvider from "./UserContext"

import "./account.css"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Account = () => {
  const navigate = useNavigate()
  const { get } = useLocalStorage(TOKEN_KEY)

  useEffect(() => {
    if (get() === null) navigate("/signin")
  }, [get, navigate])

  return (
    <div className="account-container">
      <AuthedHeader page="My Account" />
      <div className="account-info-container">
        <UserProvider>
          <VStack
            marginTop={10}
            marginBottom={10}
            spacing={8}
            width="100%"
            divider={<Divider />}
          >
            <UpdateProfile />
            <UpdateWhatsup />
            <UpdateAccount />
          </VStack>
        </UserProvider>
      </div>
      <AuthedFooter active="account" shareLink="http://localhost" />
    </div>
  )
}

export default Account
