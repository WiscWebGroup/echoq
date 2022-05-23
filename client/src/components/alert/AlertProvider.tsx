import { SlideFade, useDisclosure } from "@chakra-ui/react"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"

import LeftAccentAlert from "./LeftAccentAlert"

import "./alert.css"

interface IAlertContext {
  status: "info" | "warning" | "success" | "error" | "loading"
  text: string
  show: boolean
}

const AlertContext = createContext<IAlertContext>({
  status: "info",
  text: "",
  show: false
})
const AlertUpdateContext = createContext<
  Dispatch<SetStateAction<IAlertContext>>
>(() => {})

export const useAlert = () => useContext(AlertContext)
export const useAlertUpdate = () => useContext(AlertUpdateContext)

const AlertProvider = ({ children }: { children?: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [alert, setAlert] = useState<IAlertContext>({
    status: "info",
    text: "",
    show: false
  })

  useEffect(() => {
    if (alert.show) {
      onOpen()
      const timer = setTimeout(() => {
        onClose()
        setAlert((prevState) => ({ ...prevState, show: false }))
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [alert.show, onClose, onOpen])

  return (
    <AlertContext.Provider value={alert}>
      <SlideFade in={isOpen}>
        <div className="alert-container">
          <LeftAccentAlert status={alert.status} text={alert.text} />
        </div>
      </SlideFade>
      <AlertUpdateContext.Provider value={setAlert}>
        {children}
      </AlertUpdateContext.Provider>
    </AlertContext.Provider>
  )
}

export default AlertProvider
