import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Text,
  VStack
} from "@chakra-ui/react"
import { ChangeEvent, useEffect, useState } from "react"
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

const Signin = () => {
  const [canCreate, setCanCreate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [credentials, setCredentials] = useState<IUserCredentials>({
    username: "",
    isUsernameEmpty: true,
    isUsernameError: false,
    password: "",
    isPasswordEmpty: true,
    isPasswordError: false
  })

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

  const handleSignIn = () => {
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
    </div>
  )
}

export default Signin
