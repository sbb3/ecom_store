import {
  Text,
  Icon,
  Flex,
  Link,
  HStack,
  IconButton,
  Box,
  VStack,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaUserPlus } from "react-icons/fa";
import { MdContactSupport } from "react-icons/md";
import Software from "./Software";
import { RiLoginCircleFill } from "react-icons/ri";

export default function Nav() {
  const navLinks = [
    { path: "/contact", icon: MdContactSupport, label: "Contact", boxSize: 7 },
    { path: "/wishlist", icon: FaHeart, label: "Wishlist", boxSize: 6 },
    { path: "/cart", icon: FaShoppingCart, label: "Cart", boxSize: 6 },
    { path: "/login", icon: RiLoginCircleFill, label: "Login", boxSize: 7 },
    { path: "/register", icon: FaUserPlus, label: "Signup", boxSize: 7 },
  ];
  const navigate = useNavigate();
  const toast = useToast();
  return (
    <HStack
      as="nav"
      boxSizing="border-box"
      spacing={1}
      display={{ base: "none", md: "flex" }}
    >
      <Software />
      {/* {navLinks.map((link) => (
        <Link
          as={RouterLink}
          to={link.path}
          key={link.label}
          p={3}
          borderRadius="full"
          _hover={{
            color: "white",
            bg: "purple.500",
          }}
          onClick={() => {
            if (link.path === "/wishlist") {
				console.log("wishlist");
				navigate("/");
			}
          }}
          //   outline="2px solid blue"
        >
          <Flex alignItems="center" justifyContent="center">
            <Icon as={link.icon} boxSize={link.boxSize} />
          </Flex>
        </Link>
      ))} */}
      <Flex alignItems="center" justifyContent="center">
        {navLinks.map((link) =>
          link.path === "/wishlist" ? (
            <Box
              key={link.label}
              p={3}
              borderRadius="full"
              _hover={{
                color: "white",
                bg: "purple.500",
              }}
              onClick={() => {
                toast({
                  title: "Wishlist",
                  description:
                    "Wishlist not available yet. Please check back later. Thank you! 🙏",
                  status: "info",
                  duration: 4000,
                  isClosable: true,
                });
              }}
            >
              <Icon as={link.icon} boxSize={link.boxSize} />
            </Box>
          ) : (
            <Link
              key={link.label}
              as={RouterLink}
              to={link.path}
              p={3}
              borderRadius="full"
              _hover={{
                color: "white",
                bg: "purple.500",
              }}
            >
              <Icon as={link.icon} boxSize={link.boxSize} />
            </Link>
          )
        )}
      </Flex>
    </HStack>
  );
}
