import { Divider, Image, Text, VStack } from "@chakra-ui/react"
import { useState, ChangeEvent, useEffect } from "react"

import useDebounce from "../../common/hooks/useDebounce"
import OwnerCard from "../../components/qcard/OwnerCard"
import SearchBar from "../../components/searchbar/SearchBar"
import LogoImage from "../../asset/png/logo.png"
import { useQuestion, useQuestionUpdate } from "./QuestionContext"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"
import { useAlertUpdate } from "../../components/alert/AlertProvider"

import "./echo.css"

const RespondedContent = () => {
  const questions = useQuestion()
  const setAlert = useAlertUpdate()
  const { makeRequest } = useApiResponse()
  const { get } = useLocalStorage(TOKEN_KEY)
  const { getQuestions, searchQuestion } = useQuestionUpdate()

  const [search, setSearch] = useState("")
  const [isSearching, setIsSearching] = useState(true)

  useEffect(() => {
    getQuestions("answered")
    setIsSearching(false)
  }, [])

  useDebounce(
    () => {
      setIsSearching(true)
      if (search !== "") searchQuestion(search, "answered")
      if (search === "") getQuestions("answered")
      setIsSearching(false)
    },
    500,
    [search]
  )

  const handleEdit = async (
    questionId: number,
    show: boolean,
    questionResponse: string
  ) => {
    const response = await makeRequest({
      path: "/user/respondQuestion",
      method: "POST",
      data: {
        questionid: questionId,
        response: questionResponse,
        visibility: show
      },
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      getQuestions("answered")
      setAlert({
        status: "success",
        text: "Succesesfully edited the response",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to change the response",
        show: true
      })
    }
  }

  const handleTurn = async (questionId: number, show: boolean) => {
    const response = await makeRequest({
      path:
        "/user/updateVisibility?questionId=" +
        questionId +
        "&visibility=" +
        show,
      method: "POST",
      data: null,
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      getQuestions("answered")
      setAlert({
        status: "success",
        text: "Succesesfully changed the visibility",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to change the visibility",
        show: true
      })
    }
  }

  const handleDelete = async (questionId: number) => {
    const response = await makeRequest({
      path: "/user/deleteQuestion?questionId=" + questionId,
      method: "DELETE",
      data: null,
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      getQuestions("answered")
      setAlert({
        status: "success",
        text: "Succesesfully deleted a question and its response",
        show: true
      })
    } else {
      setAlert({
        status: "error",
        text: "Failed to delete a question and its response",
        show: true
      })
    }
  }

  return (
    <>
      <VStack spacing={6}>
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
            ({
              order,
              questionId,
              question,
              response,
              show,
              askedAt,
              respondedAt
            }) => {
              return (
                <OwnerCard
                  key={questionId}
                  order={order}
                  questionId={questionId}
                  question={question}
                  response={response}
                  show={show}
                  askedAt={new Date(askedAt)}
                  respondedAt={new Date(respondedAt)}
                  handleEdit={handleEdit}
                  handleTurn={handleTurn}
                  handleDelete={handleDelete}
                />
              )
            }
          )}
          {questions.length === 0 && (
            <>
              <Text width="calc(100% - 20px)" textAlign="center" color="gray">
                You have not responded any questions yet.
              </Text>
              <Text width="calc(100% - 20px)" textAlign="center" color="gray">
                Check out the new question tab.
              </Text>
            </>
          )}
        </VStack>
      </VStack>
      <div className="echo-content-logo-container">
        <Image borderRadius="full" boxSize="100px" src={LogoImage} alt="" />
        <Text layerStyle="appnameText" textStyle="appnameText">
          Echoq
        </Text>
      </div>
    </>
  )
}

export default RespondedContent
