import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Heading,
  HStack,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"

import { useUser } from "./UserContext"

import "./index.css"

const UpdateWhatsup = () => {
  const user = useUser()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)
  const [whatsup, setWhatsup] = useState<string | undefined>("")

  useEffect(() => {
    setWhatsup(user.whatsup)
  }, [user.whatsup])

  useEffect(() => {
    setIsSaveDisabled(whatsup === user.whatsup)
  }, [whatsup, user.whatsup])

  const handleCancel = () => {
    setWhatsup(user.whatsup)
    onClose()
  }

  const handleSave = () => {
    console.log("save")
    // TODO: api call here to update what's up
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
        <VStack spacing={3} width="100%">
          <Text>{user.whatsup}</Text>
          <Textarea
            resize="none"
            value={whatsup}
            onChange={(e) => setWhatsup(e.target.value)}
          />
          <Text fontSize="xs" color="#718096" textAlign="left">
            Type your thoughts, feelings, etc.
          </Text>
        </VStack>
      </div>
    </div>
  )
}

export default UpdateWhatsup
