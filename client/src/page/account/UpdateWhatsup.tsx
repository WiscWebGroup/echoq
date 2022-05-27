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
  Heading,
  HStack,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { ChangeEvent, useRef, useState } from "react"

import { useUser, useUserUpdate } from "./UserContext"
import useApiResponse from "../../common/hooks/useApiResponse"
import { useAlertUpdate } from "../../components/alert/AlertProvider"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

import "./index.css"

const UpdateWhatsup = () => {
  const user = useUser()
  const setAlert = useAlertUpdate()
  const fetchUser = useUserUpdate()
  const { makeRequest } = useApiResponse()
  const { get } = useLocalStorage(TOKEN_KEY)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [whatsup, setWhatsup] = useState("")
  const [isOversize, setIsOversize] = useState(false)
  const [isSaveLoading, setIsSaveLoading] = useState(false)
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  const handleChangeWhatsup = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWhatsup(event.target.value)
    if (event.target.value === "" || event.target.value.length > 50) {
      setIsSaveDisabled(true)
      if (event.target.value.length > 50) {
        setIsOversize(true)
      } else {
        setIsOversize(false)
      }
    } else {
      setIsOversize(false)
      setIsSaveDisabled(false)
    }
  }

  const handleCancel = () => {
    setWhatsup("")
    setIsOversize(false)
    onClose()
  }

  const handleSave = async () => {
    setIsSaveLoading(true)
    const response = await makeRequest({
      path: "/user/updateInfoWhatsup",
      method: "POST",
      data: { whatsup },
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      fetchUser()
      handleCancel()
      setAlert({
        status: "success",
        text: "Successfully updated your what's up.",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to update your what's up. Please try again.",
        show: true
      })
    }
    setIsSaveLoading(false)
    onClose()
  }

  return (
    <div className="section-container">
      <div className="section-header-container">
        <Heading fontSize="sm">What's up</Heading>
        <Button
          colorScheme="teal"
          variant="outline"
          size="sm"
          isDisabled={isSaveDisabled}
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
                Update What's up
              </AlertDialogHeader>
              <AlertDialogBody>
                Are your sure you want to update your what's up?
              </AlertDialogBody>
              <AlertDialogFooter>
                <HStack spacing={5}>
                  <Button ref={cancelRef} onClick={handleCancel} size="sm">
                    Cancel
                  </Button>
                  <Button
                    colorScheme="teal"
                    onClick={handleSave}
                    isLoading={isSaveLoading}
                    size="sm"
                  >
                    Save
                  </Button>
                </HStack>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </div>
      <div className="section-content-container">
        <VStack spacing={3} width="100%">
          <Text>{user.whatsup}</Text>
          <FormControl isInvalid={isOversize}>
            <Textarea
              resize="none"
              value={whatsup}
              placeholder="Update your what's up here"
              onChange={handleChangeWhatsup}
            />
            <FormHelperText fontSize="xs">
              Type your thoughts, feelings, etc.
            </FormHelperText>
            {isOversize && (
              <FormErrorMessage fontSize="xs">
                Your whatsup should not exceed 50 characters.
              </FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </div>
    </div>
  )
}

export default UpdateWhatsup
