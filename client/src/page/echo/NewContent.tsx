import { VStack, Image, Text, Divider } from "@chakra-ui/react"
import { useState, ChangeEvent } from "react"

import { dummyOwnerRCardData } from "../../common/dummy/cardData"
import useDebounce from "../../common/hooks/useDebounce"
import OwnerCard from "../../components/qcard/OwnerCard"
import SearchBar from "../../components/searchbar/SearchBar"
import LogoImage from "../../asset/png/logo.png"

const NewContent = () => {
  const [search, setSearch] = useState("")
  const [resultString, setResultString] = useState("0 results...")

  useDebounce(
    () => {
      console.log("searching: ", search)
      setResultString("0 results...")
    },
    500,
    [search]
  )

  return (
    <>
      <VStack spacing={6}>
        <SearchBar
          value={search}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
        <Text
          width="calc(100% - 20px)"
          fontSize="md"
          color="gray.400"
          fontStyle="italic"
        >
          {resultString}
        </Text>
        <VStack spacing={5} divider={<Divider />}>
          {dummyOwnerRCardData.map(({ order, question, show, askedAt }) => {
            return (
              <OwnerCard
                key={order}
                order={order}
                question={question}
                show={show}
                askedAt={new Date(askedAt)}
              />
            )
          })}
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

export default NewContent
