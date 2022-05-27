import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthedFooter } from "../../components/footer/Footer"
import { AuthedHeader } from "../../components/header/Header"
import NewContent from "./NewContent"
import UnrespondedContent from "./RespondedContent"
import QuestionProvider from "./QuestionContext"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

import "./echo.css"

const Echo = () => {
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
    <div className="echo-container">
      <AuthedHeader page="My Echo" />

      <div className="echo-body-container">
        <Tabs width="100%" isFitted colorScheme="teal" isLazy>
          <TabList>
            <Tab _focus={{ outline: "none" }}>Responded Questions</Tab>
            <Tab _focus={{ outline: "none" }}>New Questions</Tab>
          </TabList>

          <TabPanels>
            <TabPanel padding="20px 0 0 0">
              <QuestionProvider>
                <UnrespondedContent />
              </QuestionProvider>
            </TabPanel>
            <TabPanel padding="20px 0 0 0">
              <QuestionProvider>
                <NewContent />
              </QuestionProvider>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <AuthedFooter active="echo" shareLink={shareLink} />
    </div>
  )
}

export default Echo
