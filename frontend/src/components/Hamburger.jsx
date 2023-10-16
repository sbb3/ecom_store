import { useState } from "react";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Icon,
  IconButton,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Software from "./Software";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useRef } from "react";

function Hamburger() {
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const navLinks = [
    { path: "/contact", label: "Contact" },
    { path: "/wishlist", label: "Wishlist" },
    { path: "/cart", label: "Cart" },
  ];
  return (
    <>
      <IconButton
        display={{ base: "block", md: "none" }}
        icon={<HamburgerIcon />}
        aria-label="Open Navigation Menu"
        fontSize="2rem"
        color="purple.500"
        title="Open Navigation Menu"
        onClick={onOpen}
        bg="none"
        // boxSize={4}
        border="none"
        _hover={{
          // border: "none",
          outline: "none",
          background: "none",
        }}
        _focus={{
          boxShadow: "none",
          outline: "none",
        }}
        _active={{
          color: "none",
          background: "none",
        }}
      />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton size="lg" mt={4} mr={4} color="purple.500" />
          <DrawerBody mt={16}>
            {navLinks.map((link) => (
              <Link
                as={RouterLink}
                to={link.path}
                key={link.label}

                // w="full"

                // border="2px solid"
                // borderColor="green"
                // _hover={{
                //   color: "white",
                //   bg: "purple.500",
                // }}
              >
                <Flex
                  alignItems="start"
                  justifyContent="center"
                  p={3}
                  //   pl={6}
                  borderRadius="md"
                  boxShadow="md"
                  fontWeight="normal"
                  _hover={{
                    color: "white",
                    bg: "purple.500",
                  }}
                >
                  {/* <Icon as={link.icon} boxSize={5} /> */}
                  <Text ml={4} letterSpacing={1}>
                    {link.label}
                  </Text>
                </Flex>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default Hamburger;
