import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import { containsSpecialChars } from "../../common/utils/utils"
import { NormalHeader } from "../../components/Nav"

import "./signin.css"

interface IUserCredentials {
  username: string
  isUsernameEmpty: boolean
  isUsernameError: boolean
  password: string
  isPasswordEmpty: boolean
  isPasswordError: boolean
}

const defaultCredentials: IUserCredentials = {
  username: "",
  isUsernameEmpty: true,
  isUsernameError: false,
  password: "",
  isPasswordEmpty: true,
  isPasswordError: false
}

const Signin = () => {
  let navigate = useNavigate()
  const { makeRequest } = useApiResponse()
  const [loading, setLoading] = useState(false)
  const [canCreate, setCanCreate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { get, set, remove } = useLocalStorage(TOKEN_KEY)
  const [credentials, setCredentials] = useState(defaultCredentials)

  useEffect(() => {
    setCanCreate(
      !credentials.isUsernameEmpty &&
        !credentials.isPasswordEmpty &&
        !credentials.isUsernameError &&
        !credentials.isPasswordError
    )
  }, [credentials])

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      username: event.target.value,
      isUsernameEmpty: event.target.value.length === 0,
      isUsernameError: containsSpecialChars(event.target.value)
    }))
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials((prevState) => ({
      ...prevState,
      password: event.target.value,
      isPasswordEmpty: event.target.value.length === 0,
      isPasswordError:
        event.target.value.length < 8 && event.target.value.length !== 0
    }))
  }

  const displayMessageForUsername = () => {
    if (credentials.isUsernameEmpty) {
      return <FormHelperText fontSize="xs">Enter your username.</FormHelperText>
    } else if (credentials.isUsernameError) {
      return (
        <FormErrorMessage fontSize="xs">
          Username must not contain any special character!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForPassword = () => {
    if (credentials.isPasswordEmpty) {
      return <FormHelperText fontSize="xs">Enter your password.</FormHelperText>
    } else if (credentials.isPasswordError) {
      return (
        <FormErrorMessage fontSize="xs">
          Password must be at least 8 characters!
        </FormErrorMessage>
      )
    }
  }

  const handleSignIn = async () => {
    setLoading(true)
    const response = await makeRequest({
      path: "/user/signin",
      method: "POST",
      data: {
        username: credentials.username,
        password: credentials.password
      }
    })
    const data = await response.json()
    if (data.t === 1) {
      set(data.token)
      setLoading(false)
      navigate("/account")
    } else {
      setLoading(false)
      onOpen()
      setCredentials(defaultCredentials)
    }
  }

  return (
    <div className="signin-container">
      <NormalHeader variant="signin" />
      <div className="signin-form-container">
        <VStack spacing={8}>
          <Text fontSize="2xl">Sign In</Text>
          <FormControl
            isRequired
            id="username"
            variant="floating"
            width="360px"
            isInvalid={
              credentials.isUsernameError || credentials.isUsernameEmpty
            }
          >
            <FormLabel htmlFor="username" fontSize="sm">
              Username
            </FormLabel>
            <Input
              id="username"
              type="text"
              value={credentials.username}
              onChange={handleChangeUsername}
              disabled={loading}
              placeholder="Username"
            />
            {displayMessageForUsername()}
          </FormControl>
          <FormControl
            isRequired
            id="password"
            variant="floating"
            width="360px"
            isInvalid={
              credentials.isPasswordError || credentials.isPasswordEmpty
            }
          >
            <FormLabel htmlFor="password" fontSize="sm">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={credentials.password}
              onChange={handleChangePassword}
              disabled={loading}
              placeholder="Password"
            />
            {displayMessageForPassword()}
          </FormControl>
          <Button
            colorScheme="teal"
            width="150px"
            onClick={handleSignIn}
            disabled={!canCreate}
          >
            Sign In
          </Button>
        </VStack>
      </div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="red">Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The username or password was incorrect.</Text>
          </ModalBody>
        </ModalContent>

        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Signin
