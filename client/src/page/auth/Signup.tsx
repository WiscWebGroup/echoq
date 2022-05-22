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

import "./signup.css"

interface IUserRegistration {
  name: string
  isNameEmpty: boolean
  isNameError: boolean
  username: string
  isUsernameEmpty: boolean
  isUsernameError: boolean
  password: string
  isPasswordEmpty: boolean
  isPasswordError: boolean
  confirmPassword: string
  isConfirmPasswordEmpty: boolean
  isConfirmPasswordError: boolean
}

const defaultUser: IUserRegistration = {
  name: "",
  isNameEmpty: true,
  isNameError: false,
  username: "",
  isUsernameEmpty: true,
  isUsernameError: false,
  password: "",
  isPasswordEmpty: true,
  isPasswordError: false,
  confirmPassword: "",
  isConfirmPasswordEmpty: true,
  isConfirmPasswordError: false
}

const Signup = () => {
  let navigate = useNavigate()
  const { makeRequest } = useApiResponse()
  const [loading, setLoading] = useState(false)
  const [canCreate, setCanCreate] = useState(false)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { get, set, remove } = useLocalStorage(TOKEN_KEY)
  const [user, setUser] = useState(defaultUser)

  useEffect(() => {
    setCanCreate(
      !user.isNameEmpty &&
        !user.isUsernameEmpty &&
        !user.isPasswordEmpty &&
        !user.isConfirmPasswordEmpty &&
        !user.isNameError &&
        !user.isUsernameError &&
        !user.isPasswordError &&
        !user.isConfirmPasswordError
    )
  }, [user])

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      name: event.target.value,
      isNameEmpty: event.target.value.length === 0,
      isNameError: containsSpecialChars(event.target.value)
    }))
  }

  const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      username: event.target.value,
      isUsernameEmpty: event.target.value.length === 0,
      isUsernameError: containsSpecialChars(event.target.value)
    }))
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      password: event.target.value,
      isPasswordEmpty: event.target.value.length === 0,
      isPasswordError:
        event.target.value.length < 8 && event.target.value.length !== 0,
      isConfirmPasswordError:
        event.target.value !== prevState.confirmPassword &&
        !prevState.isConfirmPasswordEmpty
    }))
  }

  const handleChangeConfirmPassword = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setUser((prevState) => ({
      ...prevState,
      confirmPassword: event.target.value,
      isConfirmPasswordEmpty: event.target.value.length === 0,
      isConfirmPasswordError: event.target.value !== prevState.password
    }))
  }

  const displayMessageForName = () => {
    if (user.isNameEmpty) {
      return (
        <FormHelperText fontSize="xs">
          Enter the name you'd like others to call you.
        </FormHelperText>
      )
    } else if (user.isNameError) {
      return (
        <FormErrorMessage fontSize="xs">
          Name must not contain any special character!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForUsername = () => {
    if (user.isUsernameEmpty) {
      return (
        <FormHelperText fontSize="xs">
          Enter the username you'd like to sign in with.
        </FormHelperText>
      )
    } else if (user.isUsernameError) {
      return (
        <FormErrorMessage fontSize="xs">
          Username must not contain any special character!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForPassword = () => {
    if (user.isPasswordEmpty) {
      return (
        <FormHelperText fontSize="xs">
          Enter a password of a minimum of 8 characters.
        </FormHelperText>
      )
    } else if (user.isPasswordError) {
      return (
        <FormErrorMessage fontSize="xs">
          Password must be at least 8 characters!
        </FormErrorMessage>
      )
    }
  }

  const displayMessageForConfirmPassword = () => {
    if (user.isConfirmPasswordEmpty) {
      return (
        <FormHelperText fontSize="xs">Enter the password again.</FormHelperText>
      )
    } else if (user.isConfirmPasswordError) {
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
        name: user.name,
        username: user.username,
        password: user.password
      }
    })
    const data = response.json()
    if (data.t === 1) {
      set(data.token)
      setLoading(false)
      navigate("/account")
    } else {
      setLoading(false)
      onOpen()
      setUser((prevState) => ({
        ...prevState,
        username: defaultUser.username,
        isUsernameEmpty: true,
        isUsernameError: false
      }))
    }
  }

  return (
    <div className="signup-container">
      <NormalHeader variant="signup" />
      <div className="signup-form-container">
        <VStack spacing={8}>
          <Text fontSize="2xl">Sign Up</Text>
          <FormControl
            isRequired
            id="display-name"
            variant="floating"
            width="360px"
            isInvalid={user.isNameError || user.isNameEmpty}
          >
            <FormLabel htmlFor="display-name" fontSize="sm">
              Name
            </FormLabel>
            <Input
              id="display-name"
              type="text"
              value={user.name}
              onChange={handleChangeName}
              disabled={loading}
              placeholder="Name"
            />
            {displayMessageForName()}
          </FormControl>
          <FormControl
            isRequired
            id="username"
            variant="floating"
            width="360px"
            isInvalid={user.isUsernameError || user.isUsernameEmpty}
          >
            <FormLabel htmlFor="username" fontSize="sm">
              Username
            </FormLabel>
            <Input
              id="username"
              type="text"
              value={user.username}
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
            isInvalid={user.isPasswordError || user.isPasswordEmpty}
          >
            <FormLabel htmlFor="password" fontSize="sm">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={user.password}
              onChange={handleChangePassword}
              disabled={loading}
              placeholder="Password"
            />
            {displayMessageForPassword()}
          </FormControl>
          <FormControl
            isRequired
            id="confirm-password"
            variant="floating"
            width="360px"
            isInvalid={
              user.isConfirmPasswordError || user.isConfirmPasswordEmpty
            }
          >
            <FormLabel htmlFor="confirm-password" fontSize="sm">
              Confirm Password
            </FormLabel>
            <Input
              id="confirm-password"
              type="password"
              value={user.confirmPassword}
              onChange={handleChangeConfirmPassword}
              disabled={loading}
              placeholder="Confirm Password"
            />
            {displayMessageForConfirmPassword()}
          </FormControl>
          <Button
            colorScheme="teal"
            width="150px"
            onClick={handleSignUp}
            disabled={!canCreate}
          >
            Sign Up
          </Button>
        </VStack>
      </div>

      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
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
