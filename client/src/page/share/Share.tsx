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
import { ChangeEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import useApiResponse from "../../common/hooks/useApiResponse"
import useDebounce from "../../common/hooks/useDebounce"
import { ShareFooter } from "../../components/footer/Footer"
import { ShareHeader } from "../../components/header/Header"
import ViewerCard from "../../components/qcard/ViewerCard"
import SearchBar from "../../components/searchbar/SearchBar"
import LogoImage from "../../asset/png/logo.png"
import { base64toBlob } from "../../common/utils/utils"
import { useAlertUpdate } from "../../components/alert/AlertProvider"

import "./share.css"

interface IUserInfo {
  name: string
  avatar: Blob | null
  whatsup: string | null
}

interface IQuestion {
  order: number
  question: string
  response: string
  askedAt: string
  respondedAt: string
}

const initialUserInfoState: IUserInfo = {
  name: "",
  avatar: null,
  whatsup: ""
}

const initialQuestionsState: IQuestion[] = []

const Share = () => {
  const { userId } = useParams()
  const navigate = useNavigate()
  const setAlert = useAlertUpdate()
  const { makeRequest } = useApiResponse()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose
  } = useDisclosure()

  const [search, setSearch] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [newQuestion, setNewQuestion] = useState("")
  const [user, setUser] = useState(initialUserInfoState)
  const [questions, setQuestions] = useState(initialQuestionsState)

  const getUser = async () => {
    const response = await makeRequest({
      path: "/user/userDisplayInfo?userId=" + userId,
      method: "GET",
      data: null,
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      const data = (await response.json()).t
      if (data !== null) {
        setUser({
          name: data.name,
          whatsup: data.whatsup,
          avatar: base64toBlob(data.avataraddr)
        })
      } else {
        navigate("/error/user")
        setAlert({
          status: "error",
          text: "The user with the given share link does not exist",
          show: true
        })
      }
    }
  }

  const getQuestions = async () => {
    const res = await fetch("https://geolocation-db.com/json/")
    const ip = (await res.json()).IPv4
    const params = new URLSearchParams({
      condition: "answered",
      ip: ip
    } as any)
    const response = await makeRequest({
      path: "/user/getQ/" + userId + "?" + params,
      method: "GET",
      data: null,
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      const data = (await response.json()).t
      if (data !== null) {
        let questionArray: IQuestion[] = []
        for (let [index, qdata] of data.entries()) {
          let q: IQuestion = {
            order: index + 1,
            question: qdata.question,
            response: qdata.response,
            askedAt: qdata.crtime,
            respondedAt: qdata.updtime
          }
          questionArray = [...questionArray, q]
        }
        setQuestions(questionArray)
      }
    }
  }

  const searchQuestions = async () => {
    const res = await fetch("https://geolocation-db.com/json/")
    const ip = (await res.json()).IPv4
    const params = new URLSearchParams({
      id: userId,
      searchContent: search,
      condition: "answered",
      ip: ip
    } as any)
    const response = await makeRequest({
      path: "/user/searchQuestionUser?" + params,
      method: "GET",
      data: null,
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      const data = (await response.json()).t
      if (data !== null) {
        let questionArray: IQuestion[] = []
        for (let [index, qdata] of data.entries()) {
          let q: IQuestion = {
            order: index + 1,
            question: qdata.question,
            response: qdata.response,
            askedAt: qdata.crtime,
            respondedAt: qdata.updtime
          }
          questionArray = [...questionArray, q]
        }
        setQuestions(questionArray)
      }
    }
  }

  useEffect(() => {
    getUser()
    getQuestions()
  }, [])

  useDebounce(
    () => {
      setIsSearching(true)
      if (search === "") getQuestions()
      else searchQuestions()
      setIsSearching(false)
    },
    500,
    [search]
  )

  const handleChangeNewQuestion = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuestion(event.target.value)
    if (event.target.value === "" && !isDisabled) setIsDisabled(true)
    if (event.target.value !== "" && isDisabled) setIsDisabled(false)
  }

  const handleResetNewQuestion = () => {
    setNewQuestion("")
    setIsDisabled(true)
    onModalClose()
  }

  const handleAskQuestion = async () => {
    setIsLoading(true)
    const res = await fetch("https://geolocation-db.com/json/")
    const ip = (await res.json()).IPv4
    const params = new URLSearchParams({
      question: newQuestion,
      ip: ip
    } as any)
    const response = await makeRequest({
      path: "/questions/ask/" + userId + "?" + params,
      method: "POST",
      data: null,
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      handleResetNewQuestion()
      setAlert({
        status: "success",
        text: "Successfully posted a question",
        show: true
      })
      onClose()
    } else {
      setAlert({
        status: "error",
        text: "Failed to post a question",
        show: true
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="share-container">
      <ShareHeader
        avatar={user.avatar}
        name={user.name}
        whatsup={user.whatsup}
      />
      <div className="share-content-container">
        <VStack width="100%" spacing={6}>
          <SearchBar
            value={search}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
          <Text width="calc(100% - 20px)" color="gray.400" fontStyle="italic">
            {questions.length} results {isSearching && "(fetching...)"}
          </Text>
          <VStack width="100%" spacing={5} divider={<Divider />}>
            {questions.map(
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
            {questions.length === 0 && (
              <Text width="calc(100% - 20px)" textAlign="center" color="gray">
                Click the green buton to ask {user.name} a question
              </Text>
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
          <ModalCloseButton onClick={handleResetNewQuestion} />
          <ModalBody>
            <Textarea
              resize="none"
              placeholder="Write down you question here."
              value={newQuestion}
              onChange={handleChangeNewQuestion}
            />
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={handleResetNewQuestion}>
              Close
            </Button>
            <Button
              colorScheme="teal"
              isDisabled={isDisabled}
              isLoading={isLoading}
              onClick={handleAskQuestion}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default Share
