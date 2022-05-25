import { SearchIcon } from "@chakra-ui/icons"
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react"
import { ChangeEvent } from "react"

const SearchBar = ({
  value,
  onChange
}: {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <InputGroup>
      <InputLeftElement
        pointerEvents="none"
        children={<SearchIcon color="gray" />}
      />
      <Input
        border="none"
        bgColor="#EDEDED"
        type="text"
        placeholder="Search responses"
        _placeholder={{ color: "gray" }}
        _focus={{ outline: "none" }}
        value={value}
        onChange={onChange}
      />
    </InputGroup>
  )
}

export default SearchBar
