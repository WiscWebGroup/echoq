import { Divider, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthedHeader } from "../../components/header/Header"
import { AuthedFooter } from "../../components/footer/Footer"
import UpdateAccount from "./UpdateAccount"
import UpdateProfile from "./UpdateProfile"
import UpdateWhatsup from "./UpdateWhatsup"
import UserProvider from "./UserContext"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

import "./account.css"

const Account = () => {
  const navigate = useNavigate()
  const { makeRequest } = useApiResponse()
  const { get } = useLocalStorage(TOKEN_KEY)

  const [shareLink, setShareLink] = useState("")

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
      const origin = window.location.origin.toString()
      if (data !== null) setShareLink(`${origin}/share/${data.userid}`)
    }
  }

  useEffect(() => {
    if (get() === null) navigate("/signin")
    getInfo()
  }, [])

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
      <AuthedFooter active="account" shareLink={shareLink} />
    </div>
  )
}

export default Account
