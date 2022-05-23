import { Alert, AlertIcon } from "@chakra-ui/react"

interface ILeftAccentAlert {
  status: "info" | "warning" | "success" | "error" | "loading"
  text: string
}

const LeftAccentAlert = ({ status, text }: ILeftAccentAlert) => {
  return (
    <Alert
      status={status}
      borderRadius="sm"
      variant="left-accent"
      width="calc(100% - 30px)"
      mt="10px"
    >
      <AlertIcon />
      {text}
    </Alert>
  )
}

export default LeftAccentAlert
