import {FC, useRef} from "react"
import {TextInput, View} from "react-native"
import SearchIcon from "../icons/SearchIcon"

interface SearchInputProps {
  handleSubmit: (text: string) => void
}

const SearchInput:FC<SearchInputProps> = ({ handleSubmit }) => {
  const inputRef = useRef<TextInput>(null);

  return (
    <View className="relative">
      <TextInput ref={inputRef} onSubmitEditing={( event ) =>
      {
        handleSubmit(event.nativeEvent.text);
        inputRef.current?.clear();
      }} style={{paddingLeft: 40, paddingRight: 15, paddingTop: 12, paddingBottom: 12, height: 45}} placeholder="Введіть запит..." className="text-primary placeholder:text-gray-70p w-full border border-gray-30p rounded-xl border-solid">
      </TextInput>
      <SearchIcon style={{position: "absolute", left: 15, top: 15}} />
    </View>
  )
}
export default SearchInput