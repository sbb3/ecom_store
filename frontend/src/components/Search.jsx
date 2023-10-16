import {
  InputGroup,
  InputLeftElement,
  Input,
  IconButton,
  useColorModeValue,
  HStack,
  Flex,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { FaApple, FaWindows } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const togglePlatform = (platform) => {
    setSelectedPlatform((prevPlatform) =>
      prevPlatform === platform ? null : platform
    );
  };

  const searchHandler = () => {
    let type = selectedPlatform ? selectedPlatform.toLowerCase() : "";

    if (keyword) {
      let query = keyword.trim().toLowerCase().replace(/\s+/g, "+");
      navigate(`/search?query=${query}&type=${type}`);
    } else {
      navigate(`/`);
    }

    setKeyword("");
    setSelectedPlatform(null);
  };

  const isPlatformSelected = (platform) => selectedPlatform === platform;

  return (
    <HStack
      flex={{ sm: 1, md: 0 }}
      spacing={2}
      minW={{ base: "full", sm: 260, md: 360, lg: 480, xl: 580 }}
      boxShadow="lg"
    >
      <InputGroup mr={4}>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon />}
          bg="purple.500"
          color="white"
          px={2}
          py={1}
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
          cursor="pointer"
        />
        <Input
          onChange={(e) => setKeyword(e.target.value)}
          value={keyword}
          ml={3}
          flex={1}
          variant="filled"
          bg="#F9F9F9"
          type="text"
          placeholder="Search products ..."
        />
      </InputGroup>
      <IconButton
        onClick={() => togglePlatform("Windows")}
        icon={<FaWindows />}
        aria-label="Windows"
        fontSize="1.5rem"
        color={isPlatformSelected("Windows") ? "white" : "#2B373A"}
        bg={isPlatformSelected("Windows") ? "purple.500" : "white"}
        boxShadow="md"
        _focus={{
          outline: "none",
        }}
        _active={{
          outline: "none",
        }}
        _hover={{
          color: isPlatformSelected("Windows") ? "white" : "#2B373A",
          bg: isPlatformSelected("Windows") ? "purple.500" : "white",
        }}
        title="Windows"
      />
      <IconButton
        onClick={() => togglePlatform("Mac")}
        icon={<FaApple />}
        aria-label="Mac"
        fontSize="1.5rem"
        color={isPlatformSelected("Mac") ? "white" : "#2B373A"}
        bg={isPlatformSelected("Mac") ? "purple.500" : "white"}
        title="Mac"
        boxShadow="md"
        _focus={{
          outline: "none",
        }}
        _active={{
          outline: "none",
        }}
        _hover={{
          color: isPlatformSelected("Mac") ? "white" : "#2B373A",
          bg: isPlatformSelected("Mac") ? "purple.500" : "white",
        }}
      />
      <Button
        fontSize={"lg"}
        letterSpacing={1}
        _hover={{
          borderRadius: "none",
        }}
        boxShadow={"md"}
        px={6}
        onClick={searchHandler}
      >
        Search
      </Button>
    </HStack>
  );
}
