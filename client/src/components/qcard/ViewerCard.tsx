import {
  Collapse,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  VStack
} from "@chakra-ui/react"

import "./viewer-card.css"

export interface IViewerCard {
  order: number
  question: string
  response: string
  askedAt: Date
  respondedAt: Date
}

const ViewerCard = ({
  order,
  question,
  response,
  askedAt,
  respondedAt
}: IViewerCard) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const toggleCollapse = () => {
    if (isOpen) {
      onClose()
    } else {
      onOpen()
    }
  }

  return (
    <div className="viewer-card-container">
      <HStack spacing={4}>
        <div className="viewer-card-order-container">
          <Text fontSize="xl">{order}</Text>
        </div>
        <VStack spacing={4} width="calc(100% - 10px)" onClick={toggleCollapse}>
          <Text width="100%" fontSize="xl" color="teal" fontWeight="bold">
            {question}
          </Text>
          <Collapse startingHeight={0} in={isOpen} style={{ width: "100%" }}>
            <Text width="100%">{response}</Text>
            <Spacer height={4} />
            <Text fontSize="sm" color="gray.500">
              {askedAt.toDateString()} (Asked)
            </Text>
            <Text fontSize="sm" color="gray.500">
              {respondedAt.toDateString()} (Responded)
            </Text>
          </Collapse>
        </VStack>
      </HStack>
    </div>
  )
}

export default ViewerCard
