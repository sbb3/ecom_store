import { Box, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function Logo() {
  return (
    <Box
      fontWeight="bold"
      fontSize="1.5rem"
      bgGradient="linear(to-r, teal.500, purple.500)"
      bgClip="text"
      _hover={{
        bgGradient: "linear(to-r, teal.500, purple.500)",
        bgClip: "text",
      }}
    >
      <Link
        as={RouterLink}
        to="/"
        fontWeight="bold"
        fontSize="1.5rem"
        letterSpacing={1}
        _hover={{
          textDecoration: "none",
          color: "linear(to-r, teal.500, purple.500)",
        }}
      >
        Dukan
      </Link>
    </Box>
  );
}
