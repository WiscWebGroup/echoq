import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState
} from "react"
import useApiResponse from "../../common/hooks/useApiResponse"
import useLocalStorage, { TOKEN_KEY } from "../../common/hooks/useLocalStorage"

interface IQuestion {
  order: number
  questionId: number
  question: string
  response: string
  show: boolean
  askedAt: string
  respondedAt: string
}

type TQType = "answered" | "unanswered"

interface IQuestionUpdate {
  getQuestions: (e: TQType) => void
  searchQuestion: (e: string, q: TQType) => void
}

export const initialQuestionsState: IQuestion[] = []

const QuestionContext = createContext(initialQuestionsState)
const QuestionUpdateContext = createContext<IQuestionUpdate>({
  getQuestions: () => {},
  searchQuestion: () => {}
})

export const useQuestion = () => useContext(QuestionContext)
export const useQuestionUpdate = () => useContext(QuestionUpdateContext)

const QuestionProvider = ({ children }: { children?: ReactNode }) => {
  const { makeRequest } = useApiResponse()
  const { get } = useLocalStorage(TOKEN_KEY)

  const [questions, setQuestions] = useState(initialQuestionsState)

  const getQuestions = async (type: TQType) => {
    const path = type
      ? "/user/selectQuestions?condition=" + type
      : "/user/selectQuestions"
    const response = await makeRequest({
      path: path,
      method: "GET",
      data: null,
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      const data = (await response.json()).t
      let questionArray: IQuestion[] = []
      for (let [index, qdata] of data.entries()) {
        let q: IQuestion = {
          order: index + 1,
          questionId: qdata.questionid,
          question: qdata.question,
          response: qdata.response,
          show: qdata.visibility,
          askedAt: qdata.crtime,
          respondedAt: qdata.updtime
        }
        questionArray = [...questionArray, q]
      }
      setQuestions(questionArray)
    }
  }

  const searchQuestion = async (search: string, condition: TQType) => {
    const response = await makeRequest({
      path:
        "/user/searchQuestion?searchContent=" +
        search +
        "&condition=" +
        condition,
      method: "GET",
      data: null,
      headers: {
        "XXX-SToken": get(),
        "Content-Type": "application/json"
      }
    })
    if (response.status === 200) {
      const data = (await response.json()).t
      let questionArray: IQuestion[] = []
      for (let [index, qdata] of data.entries()) {
        let q: IQuestion = {
          order: index + 1,
          questionId: qdata.questionid,
          question: qdata.question,
          response: qdata.response,
          show: qdata.visibility,
          askedAt: qdata.crtime,
          respondedAt: qdata.updtime
        }
        questionArray = [...questionArray, q]
      }
      setQuestions(questionArray)
    }
  }

  return (
    <QuestionContext.Provider value={questions}>
      <QuestionUpdateContext.Provider value={{ getQuestions, searchQuestion }}>
        {children}
      </QuestionUpdateContext.Provider>
    </QuestionContext.Provider>
  )
}

export default QuestionProvider
