import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Button,
  Heading,
  HStack,
  Image,
  useDisclosure
} from "@chakra-ui/react"
import { useState, useRef } from "react"

import { useUser } from "./UserContext"

import "./index.css"

const UpdateProfile = () => {
  const user = useUser()
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  // TODO: handle file upload

  const handleSave = () => {
    console.log("save")
    // TODO: api call here to update profile picture
    onClose()
  }

  return (
    <div className="section-container">
      <div className="section-header-container">
        <Heading fontSize="sm">Profile Picture</Heading>
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
                Update Profile Picture
              </AlertDialogHeader>
              <AlertDialogBody>
                Are your sure you want to update your profile picture?
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
        <div className="avatar-wrapper">
          {user.avatar ? (
            <Image
              borderRadius="full"
              boxSize="100px"
              src={user.avatar}
              alt=""
            />
          ) : (
            <Avatar size="xl" bgColor="teal" name={user.name} />
          )}
        </div>
      </div>
    </div>
  )
}

export default UpdateProfile
