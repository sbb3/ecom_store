import { Flex, Icon, Text } from "@chakra-ui/react";
import { FaUserPlus } from "react-icons/fa";

export default function SignUpButton() {
  return (
    <Flex align="center" justify="center" direction="column">
      <Icon as={FaUserPlus} boxSize="1rem" mb="0.5rem" />
      <Text fontSize="sm" fontWeight="bold" textTransform="uppercase">
        Sign ups
      </Text>
    </Flex>
  );
}
