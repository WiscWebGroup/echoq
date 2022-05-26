import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { ChangeEvent, useReducer, useRef } from "react"

import { useUser, useUserUpdate } from "./UserContext"
import useApiResponse from "../../common/hooks/useApiResponse"
import { useAlertUpdate } from "../../components/alert/AlertProvider"
import { accountReducer, initialAccountState } from "./reducers/accountReducer"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

import "./index.css"

const UpdateAccount = () => {
  const user = useUser()
  const setAlert = useAlertUpdate()
  const fetchUser = useUserUpdate()
  const { makeRequest } = useApiResponse()
  const { get } = useLocalStorage(TOKEN_KEY)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [state, dispatch] = useReducer(accountReducer, initialAccountState)

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "name", payload: event.target.value })
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "pass", payload: event.target.value })
  }

  const handleReset = () => {
    dispatch({ type: "reset", payload: "" })
    onClose()
  }

  const updateName = async () => {
    const response = await makeRequest({
      path: "/user/updateInfoName",
      method: "POST",
      data: { name: state.name },
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      fetchUser()
      handleReset()
      setAlert({
        status: "success",
        text: "Successfully updated your display name.",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to update your display name. Please try again.",
        show: true
      })
    }
    onClose()
  }

  const updatePassword = async () => {
    const response = await makeRequest({
      path: "/user/updateInfoPassword",
      method: "POST",
      data: { password: state.pass },
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      fetchUser()
      handleReset()
      setAlert({
        status: "success",
        text: "Successfully updated your password.",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to update your password. Please try again.",
        show: true
      })
    }
    onClose()
  }

  const handleSave = async () => {
    if (state.name && !state.isNameEmpty && !state.isNameError) updateName()
    if (state.pass && !state.isPassEmpty && !state.isPassError) updatePassword()
  }

  return (
    <div className="section-container">
      <div className="section-header-container">
        <Heading fontSize="sm">Account</Heading>
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          isDisabled={!state.canSave}
          onClick={onOpen}
        >
          Save
        </Button>

        <AlertDialog
          isCentered
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent width="340px">
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Update Account
              </AlertDialogHeader>
              <AlertDialogBody>Are your sure?</AlertDialogBody>
              <AlertDialogFooter>
                <HStack spacing={5}>
                  <Button ref={cancelRef} onClick={handleReset} size="sm">
                    Cancel
                  </Button>
                  <Button colorScheme="teal" onClick={handleSave} size="sm">
                    Save
                  </Button>
                </HStack>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
      <div className="section-content-container">
        <VStack spacing={6} width="100%">
          <FormControl isReadOnly>
            <FormLabel htmlFor="username" fontSize="sm">
              Username
            </FormLabel>
            <Input
              id="username"
              type="text"
              _focus={{ borderColor: "#CBD5E0" }}
              defaultValue={user.username}
            />
            <FormHelperText fontSize="xs">
              Username is permanent and unique.
            </FormHelperText>
          </FormControl>
          <FormControl isInvalid={state.isNameError}>
            <FormLabel htmlFor="name" fontSize="sm">
              Name
            </FormLabel>
            <Input
              id="name"
              type="text"
              value={state.name}
              onChange={handleChangeName}
            />
            <FormHelperText fontSize="xs">
              Type your new display name here (current: {user.name})
            </FormHelperText>
            {state.isNameError && (
              <FormErrorMessage fontSize="xs">
                Name must not contain any special character!
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={state.isPassError}>
            <FormLabel htmlFor="password" fontSize="sm">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={state.pass}
              onChange={handleChangePassword}
            />
            <FormHelperText fontSize="xs">
              Type your new password here
            </FormHelperText>
            {state.isPassError && (
              <FormErrorMessage fontSize="xs">
                Password must be at least 8 characters!
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </div>
    </div>
  )
}

export default UpdateAccount
