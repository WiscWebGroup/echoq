import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Badge,
  Box,
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Spacer,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { useRef, useState } from "react"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import DotIcon from "../icons/DotIcon"

import "./owner-card.css"

export interface IOwnerCard {
  order: number
  questionId: number
  question: string
  response?: string
  show: boolean
  askedAt: Date
  respondedAt?: Date

  handleEdit: (
    questionId: number,
    show: boolean,
    questionResponse: string
  ) => void
  handleTurn: (id: number, show: boolean) => void
  handleDelete: (id: number) => void
}

const OwnerCard = ({
  order,
  questionId,
  question,
  response,
  show,
  askedAt,
  respondedAt,
  handleEdit,
  handleTurn,
  handleDelete
}: IOwnerCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure()
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose
  } = useDisclosure()
  const cancelRef = useRef<HTMLButtonElement>(null)

  const [newResponse, setNewResponse] = useState("")

  const toggleCollapse = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  const handleQuestionEdit = () => {
    handleEdit(questionId, show, newResponse)
    onModalClose()
  }

  const handleQuestionTurn = () => {
    handleTurn(questionId, !show)
  }

  const handleQuestionDelete = () => {
    handleDelete(questionId)
    onAlertClose()
  }

  return (
    <div className="owner-card-container">
      <HStack width="100%" spacing={4}>
        <div className="owner-card-order-container">
          <Text fontSize="xl">{order}</Text>
          <Popover isLazy placement="bottom-end">
            <PopoverTrigger>
              <IconButton
                size="sm"
                variant="ghost"
                aria-label="Setting icon"
                _hover={{ bgColor: "#fff" }}
                _focus={{ bgColor: "#fff" }}
                icon={<DotIcon />}
              />
            </PopoverTrigger>
            <Portal>
              <PopoverContent _focus={{ outline: "none" }}>
                <PopoverHeader>
                  Response <strong>#{order}</strong>
                </PopoverHeader>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <HStack
                    spacing={4}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Button
                      size="sm"
                      colorScheme="teal"
                      variant="outline"
                      onClick={onModalOpen}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="yellow"
                      variant="outline"
                      onClick={handleQuestionTurn}
                    >
                      Turn {show ? "private" : "public"}
                    </Button>
                    <Button size="sm" colorScheme="red" onClick={onAlertOpen}>
                      Delete
                    </Button>
                  </HStack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </div>
        <VStack
          width="100%"
          minHeight="62px"
          spacing={4}
          onClick={toggleCollapse}
        >
          <Text width="100%" fontSize="xl" color="teal" fontWeight="bold">
            {question} {!show && <Badge colorScheme="yellow">PRIVATE</Badge>}
          </Text>
          <Collapse startingHeight={0} in={isOpen} style={{ width: "100%" }}>
            <Text width="100%">{response}</Text>
            <Spacer height={4} />
            <Text fontSize="sm" color="gray.500">
              {askedAt.toDateString()} (Asked)
            </Text>
            {respondedAt && (
              <Text fontSize="sm" color="gray.500">
                {respondedAt.toDateString()} (Responded)
              </Text>
            )}
          </Collapse>
        </VStack>
      </HStack>

      {/* edit */}
      <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered>
        <ModalOverlay />
        <ModalContent width="calc(100% - 30px)">
          <ModalHeader>Edit Response</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Box width="100%">
                <Text width="100%" fontSize="sm" color="gray.500">
                  Question
                </Text>
                <Text
                  width="100%"
                  maxHeight="100px"
                  overflowY="scroll"
                  fontSize="lg"
                  color="teal"
                  fontWeight="bold"
                >
                  {question}
                </Text>
              </Box>
              {response && (
                <Box width="100%">
                  <Text width="100%" fontSize="sm" color="gray.500">
                    Old Response
                  </Text>
                  <Text maxHeight="200px" overflowY="scroll">
                    {response}
                  </Text>
                </Box>
              )}
              <Box width="100%">
                <Text width="100%" fontSize="sm" color="gray.500">
                  New Response
                </Text>
                <FormControl>
                  <Textarea
                    resize="none"
                    placeholder="Write your response here"
                    value={newResponse}
                    onChange={(e) => setNewResponse(e.target.value)}
                  />
                  <FormHelperText fontSize="xs">
                    {response &&
                      'Leave it empty and save to put this question back to the"New Question" tab.'}
                  </FormHelperText>
                </FormControl>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button colorScheme="teal" onClick={handleQuestionEdit}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* alert */}
      <AlertDialog
        isCentered
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent width="calc(100% - 30px)">
          <AlertDialogHeader>Delete Question</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this question entirely?
          </AlertDialogBody>
          <AlertDialogFooter>
            <HStack spacing={5}>
              <Button ref={cancelRef} onClick={onAlertClose} size="sm">
                Cancel
              </Button>
              <Button
                colorScheme="red"
                size="sm"
                onClick={handleQuestionDelete}
              >
                Delete
              </Button>
            </HStack>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default OwnerCard
