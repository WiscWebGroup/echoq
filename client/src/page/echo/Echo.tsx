import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"

import { AuthedFooter } from "../../components/Footer"
import { AuthedHeader } from "../../components/Header"
import NewContent from "./NewContent"
import UnrespondedContent from "./UnrespondedContent"

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
              <UnrespondedContent />
            </TabPanel>
            <TabPanel padding="20px 0 0 0">
              <NewContent />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
      <AuthedFooter active="echo" shareLink="http://localhost" />
    </div>
  )
}

export default Echo
