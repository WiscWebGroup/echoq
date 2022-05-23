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
import { ChangeEvent, useEffect, useRef, useState } from "react"

import { useUser } from "./UserContext"
import { containsSpecialChars } from "../../common/utils/utils"

import "./index.css"

interface IAccount {
  name: string
  isNameEmpty: boolean
  isNameError: boolean
  password: string
  isPasswordEmpty: boolean
  isPasswordError: boolean
}

const initAccount: IAccount = {
  name: "",
  isNameEmpty: true,
  isNameError: false,
  password: "",
  isPasswordEmpty: true,
  isPasswordError: false
}

const UpdateAccount = () => {
  const user = useUser()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [alertText, setAlertText] = useState("")
  const [account, setAccount] = useState(initAccount)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  useEffect(() => {
    if (account.isNameEmpty) {
      setIsSaveDisabled(account.isPasswordEmpty || account.isPasswordError)
    } else if (account.isPasswordEmpty) {
      setIsSaveDisabled(account.isNameEmpty || account.isNameError)
    } else {
      setIsSaveDisabled(account.isNameError || account.isPasswordError)
    }
  }, [account])

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setAccount((prevState) => ({
      ...prevState,
      name: event.target.value,
      isNameEmpty: event.target.value.length === 0,
      isNameError: containsSpecialChars(event.target.value)
    }))
  }

  const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setAccount((prevState) => ({
      ...prevState,
      password: event.target.value,
      isPasswordEmpty: event.target.value.length === 0,
      isPasswordError:
        event.target.value.length < 8 && event.target.value.length !== 0
    }))
  }

  const handleSaveClick = () => {
    if (account.isNameEmpty) {
      setAlertText("password")
    } else if (account.isPasswordEmpty) {
      setAlertText("name")
    } else {
      setAlertText("name and password")
    }
    onOpen()
  }

  const handleSave = () => {
    console.log("save")
    // TODO: api call here to update what's up
    onClose()
  }

  return (
    <div className="section-container">
      <div className="section-header-container">
        <Heading fontSize="sm">Account</Heading>
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          isDisabled={isSaveDisabled}
          onClick={handleSaveClick}
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
              <AlertDialogBody>
                Are your sure you want to update your {alertText}?
              </AlertDialogBody>
              <AlertDialogFooter>
                <HStack spacing={5}>
                  <Button ref={cancelRef} onClick={onClose} size="sm">
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
          <FormControl isInvalid={account.isNameError}>
            <FormLabel htmlFor="name" fontSize="sm">
              Name
            </FormLabel>
            <Input
              id="name"
              type="text"
              value={account.name}
              onChange={handleChangeName}
            />
            <FormHelperText fontSize="xs">
              Type your new display name here (current: {user.name}){" "}
            </FormHelperText>
            {account.isNameError && (
              <FormErrorMessage fontSize="xs">
                Name must not contain any special character!
              </FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={account.isPasswordError}>
            <FormLabel htmlFor="password" fontSize="sm">
              Password
            </FormLabel>
            <Input
              id="password"
              type="password"
              value={account.password}
              onChange={handleChangePassword}
            />
            <FormHelperText fontSize="xs">
              Type your new password here
            </FormHelperText>
            {account.isPasswordError && (
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
