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
  Input,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { useState, useRef, ChangeEvent } from "react"

import CameraUnfilled from "../../asset/svg/camera-unfilled.svg"
import { useUser, useUserUpdate } from "./UserContext"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import { useAlertUpdate } from "../../components/alert/AlertProvider"
import useMultipartApiResponse from "../../common/hooks/useMultipartApiResponse"

import "./index.css"

const UpdateProfile = () => {
  const user = useUser()
  const formData = new FormData()
  const setAlert = useAlertUpdate()
  const fetchUser = useUserUpdate()
  const { get } = useLocalStorage(TOKEN_KEY)
  const fileRef = useRef<HTMLInputElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { makeMultipartRequest } = useMultipartApiResponse()

  const [isSaveDisabled, setIsSaveDisabled] = useState(true)

  const handleUploadFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      formData.append("img", event.target.files[0])
      setIsSaveDisabled(false)
      return
    }
    setIsSaveDisabled(true)
  }

  const handleSelectFile = () => {
    fileRef.current?.click()
  }

  const handleResetFile = () => {
    if (fileRef.current) fileRef.current.value = ""
    setIsSaveDisabled(true)
    onClose()
  }

  const handleSave = async () => {
    const response = await makeMultipartRequest({
      path: "/user/updateInfoAvatar",
      method: "POST",
      data: formData,
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "multipart/form-data"
      }
    })
    if (response.status === 200) {
      fetchUser()
      handleResetFile()
      setAlert({
        status: "success",
        text: "Successfully updated your profile picture.",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to update your profile picture. Please try again.",
        show: true
      })
    }
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
                  <Button ref={cancelRef} onClick={handleResetFile} size="sm">
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
        <VStack spacing={4}>
          <div className="avatar-wrapper" onClick={handleSelectFile}>
            {user.avatar ? (
              <Image
                borderRadius="full"
                boxSize="100px"
                src={user.avatar}
                alt=""
              />
            ) : (
              <Avatar
                size="xl"
                bgColor="teal"
                color="#fff"
                margin="2px"
                name={user.name}
              />
            )}
            <div className="avatar-icon-container">
              <Image
                borderRadius="full"
                boxSize="30px"
                src={CameraUnfilled}
                alt=""
              />
            </div>
          </div>
          <Input
            ref={fileRef}
            type="file"
            accept=""
            onChange={handleUploadFile}
            display="none"
          />
        </VStack>
      </div>
    </div>
  )
}

export default UpdateProfile
