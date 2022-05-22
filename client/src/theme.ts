import { extendTheme } from "@chakra-ui/react"

export const theme = extendTheme({
  fonts: {
    body: "Inter, sans-serif",
    heading: "Inter, sans-serif"
  },
  textStyles: {
    appnameText: {
      fontWeight: "bold",
      fontSize: "sm"
    }
  },
  layerStyles: {
    appnameText: {
      color: "teal"
    }
  }
})
