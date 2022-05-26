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
import { ChangeEvent, useEffect, useReducer, useState } from "react"
import { useNavigate } from "react-router-dom"

import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import { NormalHeader } from "../../components/Header"
import { initialCredentialState, signinReducer } from "./reducers/signinReducer"

import "./signin.css"

const Signin = () => {
  let navigate = useNavigate()
  const { makeRequest } = useApiResponse()
  const { get, set } = useLocalStorage(TOKEN_KEY)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(signinReducer, initialCredentialState)

  useEffect(() => {
    if (get() !== null) navigate("/account")
  }, [get, navigate])

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "username", payload: event.target.value })
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "password", payload: event.target.value })
  }

  const displayMessageForUsername = () => {
    if (state.isUsernameEmpty) {
      return <FormHelperText fontSize="xs">Enter your username.</FormHelperText>
    } else if (state.isUsernameError) {
      return (
        <FormErrorMessage fontSize="xs">
          Username must not contain any special character!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForPassword = () => {
    if (state.isPasswordEmpty) {
      return <FormHelperText fontSize="xs">Enter your password.</FormHelperText>
    } else if (state.isPasswordError) {
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
        username: state.username,
        password: state.password
      },
      headers: {
        "Content-Type": "application/json"
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
      dispatch({ type: "reset", payload: "" })
    }
  }

  return (
    <div className="signin-container">
      <NormalHeader variant="signin" />
      <div className="signin-form-container">
        <VStack spacing={8} width="calc(100% - 30px)">
          <Text fontSize="2xl">Sign In</Text>
          <FormControl
            isRequired
            id="username"
            isInvalid={state.isUsernameError || state.isUsernameEmpty}
          >
            <FormLabel htmlFor="username" fontSize="sm">
              Username
            </FormLabel>
            <Input
              id="username"
              type="text"
              value={state.username}
              onChange={handleChangeUsername}
              disabled={loading}
              placeholder="Username"
            />
            {displayMessageForUsername()}
          </FormControl>
          <FormControl
            isRequired
            id="password"
            isInvalid={state.isPasswordError || state.isPasswordEmpty}
          >
            <FormLabel htmlFor="password" fontSize="sm">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={state.password}
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
            disabled={!state.canSignin}
          >
            Sign In
          </Button>
        </VStack>
      </div>

      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
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
