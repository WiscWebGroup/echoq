import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

import { AuthedFooter } from "../../components/Footer"
import { AuthedHeader } from "../../components/Header"
import NewContent from "./NewContent"
import UnrespondedContent from "./RespondedContent"
import QuestionProvider from "./QuestionContext"

import "./echo.css"

const Echo = () => {
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
      <AuthedFooter active="echo" shareLink="http://localhost" />
    </div>
  )
}

export default Echo
