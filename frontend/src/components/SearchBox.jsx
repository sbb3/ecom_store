import { Box } from "@chakra-ui/react";
import ReactSearchBox from "react-search-box";

export default function SearchBox() {
  return (
    <Box
		outline={"2px solid red"}
	>
      <ReactSearchBox
        placeholder="Search for John, Jane or Mary"
        data={[
          {
            key: "john",
            value: "John Doe",
          },
          {
            key: "jane",
            value: "Jane Doe",
          },
        ]}
        onSelect={(record) => console.log("record ", record)}
        onFocus={() => {
          console.log("This function is called when is focussed");
        }}
        onChange={(value) => console.log(value)}
        inputBackgroundColor="#F9F9F9"
        inputFontColor="red"

        //   autoFocus
        //   leftIcon={<>🎨</>}
        //   iconBoxSize="48px"
      />
    </Box>
  );
}
