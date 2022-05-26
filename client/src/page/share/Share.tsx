import { EditIcon } from "@chakra-ui/icons"
import {
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack
} from "@chakra-ui/react"
import { ChangeEvent, useState } from "react"
import { Link, useParams } from "react-router-dom"

import { dummyCardData } from "../../common/dummy/cardData"
import useApiResponse from "../../common/hooks/useApiResponse"
import useDebounce from "../../common/hooks/useDebounce"
import { ShareFooter } from "../../components/Footer"
import { ShareHeader } from "../../components/Header"
import ViewerCard from "../../components/qcard/ViewerCard"
import SearchBar from "../../components/searchbar/SearchBar"
import LogoImage from "../../asset/png/logo.png"

import "./share.css"

const Share = () => {
  const { id } = useParams()
  const { makeRequest } = useApiResponse()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure()
  const [search, setSearch] = useState("")
  const [resultString, setResultString] = useState("0 results...")

  useDebounce(
    () => {
      console.log("searching (", id, "): ", search)
      setResultString("0 results...")
    },
    500,
    [search]
  )

  return (
    <div className="share-container">
      <ShareHeader name="Zihan" />
      <div className="share-content-container">
        <VStack spacing={6}>
          <SearchBar
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <Text width="100%" fontSize="md" color="gray.400" fontStyle="italic">
            {resultString}
          </Text>
          <VStack spacing={5} divider={<Divider />}>
            {dummyCardData.map(
              ({ order, question, response, askedAt, respondedAt }) => {
                return (
                  <ViewerCard
                    key={order}
                    order={order}
                    question={question}
                    response={response}
                    askedAt={new Date(askedAt)}
                    respondedAt={new Date(respondedAt)}
                  />
                )
              }
            )}
          </VStack>
        </VStack>
        <div className="share-content-logo-container">
          <Image borderRadius="full" boxSize="100px" src={LogoImage} alt="" />
          <Text layerStyle="appnameText" textStyle="appnameText">
            Echoq
          </Text>
        </div>
      </div>
      <ShareFooter onClick={onOpen} />
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Create</DrawerHeader>
          <DrawerBody>
            <VStack spacing={6} mb={10}>
              <Button
                leftIcon={<EditIcon />}
                width="70%"
                variant="solid"
                onClick={onModalOpen}
              >
                Ask a question
              </Button>
              <Link to="/signup">
                <Button variant="link">Create your own echo</Button>
              </Link>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Modal isOpen={isModalOpen} onClose={onModalClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Ask a question</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              resize="none"
              placeholder="Write down you question here."
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button colorScheme="teal">Post</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Share
