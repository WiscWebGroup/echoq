import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Image,
  Input,
  Text,
  VStack
} from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
import { Link } from "react-router-dom"

import LogoImage from "../../asset/png/logo.png"
import { containsSpecialChars } from "../../common/utils/utils"

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

const Signup = () => {
  const [loading, setLoading] = useState(false)
  const [canCreate, setCanCreate] = useState(false)
  const [user, setUser] = useState<IUserRegistration>({
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
  })

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

  const handleCreate = () => {
    setLoading(true)
    if (canCreate) {
      // TODO: api
      console.log("good")
    } else {
      console.log("not good")
    }
    setLoading(false)
  }

  return (
    <div className="signup-container">
      <div className="signup-nav-wrapper">
        <div className="signup-nav-container">
          <div className="signup-logo-container">
            <Image borderRadius="full" boxSize="66px" src={LogoImage} alt="" />
            <Text layerStyle="appnameText" textStyle="appnameText">
              Echoq
            </Text>
          </div>
          <Link to="/signin">
            <Button colorScheme="teal" variant="outline">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
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
            onClick={handleCreate}
            disabled={!canCreate}
          >
            Create
          </Button>
        </VStack>
      </div>
    </div>
  )
}

export default Signup
