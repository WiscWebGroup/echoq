import { ExternalLinkIcon } from "@chakra-ui/icons"
import {
  Button,
  Heading,
  HStack,
  Link,
  Spacer,
  Text,
  VStack
} from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { HomeHeader } from "../../components/header/Header"

import "./home.css"

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="home-container">
      <HomeHeader />
      <div className="home-content-container">
        <VStack width="100%" spacing={6}>
          <Heading color="teal">Echoq</Heading>
          <Text>
            消去防备，让心在朋友的世界里开诚布公；戴上面具，令情于彼此的欢乐中日引月长。
          </Text>
          <Text>
            Echoq是一款二人开发的应用，初衷是保持简洁性的同时帮助朋友们更方便快捷地创建以及回答自己的提问箱，您可以作为答主回复或者作为普通用户匿名提问。
          </Text>
          <Spacer />
          <Spacer />
          <Spacer />
          <HStack spacing={10}>
            <Button
              size="lg"
              colorScheme="teal"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
            <Button
              size="lg"
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </HStack>
          <Spacer />
          <Text width="100%" color="gray.500">
            See more in our{" "}
            <Link
              href="https://github.com/NataRich/echoq"
              textDecoration="underline"
              isExternal
            >
              GitHub repo <ExternalLinkIcon mx="2px" />
            </Link>
            .
          </Text>
        </VStack>
      </div>
    </div>
  )
}

export default Home
