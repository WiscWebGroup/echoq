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
import { NormalHeader } from "../../components/header/Header"
import { signupReducer, initialFormState } from "./reducers/signupReducer"

import "./signup.css"

const Signup = () => {
  let navigate = useNavigate()
  const { makeRequest } = useApiResponse()
  const { get, set } = useLocalStorage(TOKEN_KEY)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [loading, setLoading] = useState(false)
  const [state, dispatch] = useReducer(signupReducer, initialFormState)

  useEffect(() => {
    if (get() !== null) navigate("/echo")
  }, [get, navigate])

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "name", payload: event.target.value })
  }

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "username", payload: event.target.value })
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "password", payload: event.target.value })
  }

  const handleChangeConfirm = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "confirm", payload: event.target.value })
  }

  const displayMessageForName = () => {
    if (state.isNameEmpty) {
      return (
        <FormHelperText fontSize="xs">
          Enter the name you'd like others to call you.
        </FormHelperText>
      )
    } else if (state.isNameError) {
      return (
        <FormErrorMessage fontSize="xs">
          Name must not contain any special character!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForUsername = () => {
    if (state.isUsernameEmpty) {
      return (
        <FormHelperText fontSize="xs">
          Enter the username you'd like to sign in with.
        </FormHelperText>
      )
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
      return (
        <FormHelperText fontSize="xs">
          Enter a password of a minimum of 8 characters.
        </FormHelperText>
      )
    } else if (state.isPasswordError) {
      return (
        <FormErrorMessage fontSize="xs">
          Password must be at least 8 characters!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForConfirmPassword = () => {
    if (state.isConfirmPasswordEmpty) {
      return (
        <FormHelperText fontSize="xs">Enter the password again.</FormHelperText>
      )
    } else if (state.isConfirmPasswordError) {
      return (
        <FormErrorMessage fontSize="xs">
          This does not match the password!
        </FormErrorMessage>
      )
    }
  }

  const handleSignUp = async () => {
    setLoading(true)
    const response = await makeRequest({
      path: "/user/signup",
      method: "POST",
      data: {
        name: state.name,
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
      navigate("/echo")
    } else {
      setLoading(false)
      onOpen()
      dispatch({ type: "username", payload: "" })
    }
  }

  return (
    <div className="signup-container">
      <NormalHeader variant="signup" />
      <div className="signup-form-container">
        <VStack spacing={8} width="calc(100% - 30px)">
          <Text fontSize="2xl">Sign Up</Text>
          <FormControl
            isRequired
            id="display-name"
            isInvalid={state.isNameError || state.isNameEmpty}
          >
            <FormLabel htmlFor="display-name" fontSize="sm">
              Name
            </FormLabel>
            <Input
              id="display-name"
              type="text"
              value={state.name}
              onChange={handleChangeName}
              disabled={loading}
              placeholder="Name"
            />
            {displayMessageForName()}
          </FormControl>
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
          <FormControl
            isRequired
            id="confirm-password"
            isInvalid={
              state.isConfirmPasswordError || state.isConfirmPasswordEmpty
            }
          >
            <FormLabel htmlFor="confirm-password" fontSize="sm">
              Confirm Password
            </FormLabel>
            <Input
              id="confirm-password"
              type="password"
              value={state.confirmPassword}
              onChange={handleChangeConfirm}
              disabled={loading}
              placeholder="Confirm Password"
            />
            {displayMessageForConfirmPassword()}
          </FormControl>
          <Button
            colorScheme="teal"
            width="150px"
            onClick={handleSignUp}
            disabled={!state.canCreate}
          >
            Sign Up
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
        <ModalContent width="calc(100% - 30px)">
          <ModalHeader color="red">Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>The username already exists. Please use another one.</Text>
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

export default Signup
