import { Text, VStack, Spacer, Box, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

import { NotFoundErrorHeader } from "../../components/header/Header"

import "./error.css"

const PageNotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="error-container">
      <NotFoundErrorHeader />
      <div className="error-body-container">
        <VStack width="100%" spacing={6}>
          <Text width="100%" fontSize="xl" fontWeight="bold">
            Reason
          </Text>
          <Text width="100%" fontSize="lg">
            This page does not exist.
          </Text>
          <Spacer />
          <Text width="100%" fontSize="xl" fontWeight="bold">
            Options
          </Text>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Create your own account:</Text>
            <Button colorScheme="teal" onClick={() => navigate("/signup")}>
              Sign Up
            </Button>
          </Box>
          <Box
            width="100%"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Sign in your account:</Text>
            <Button
              colorScheme="teal"
              variant="outline"
              onClick={() => navigate("/signin")}
            >
              Sign In
            </Button>
          </Box>
          <Button variant="outline" onClick={() => navigate("/")}>
            Go to Home
          </Button>
        </VStack>
      </div>
    </div>
  )
}

export default PageNotFound
