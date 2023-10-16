import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  HStack,
  Container,
  Center,
  Icon,
  Text,
  IconButton,
  Stack,
  VStack,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { Link as RouterLink } from "react-router-dom";
import { BiSolidLogInCircle } from "react-icons/bi";

function SubmenuExample() {
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const openSubmenu = () => {
    if (!submenuOpen) {
      setSubmenuOpen(true);
    }
  };

  const closeSubmenu = () => {
    if (submenuOpen) {
      setSubmenuOpen(false);
    }
  };

  return (
    <Menu>
      <MenuButton>Software</MenuButton>
      <MenuList mt={4}>
        <MenuItem>Effects</MenuItem>
        <MenuItem>Instruments</MenuItem>
        <MenuItem>Studio Tools</MenuItem>
        {/* Submenu */}
        {/* <Menu isOpen={submenuOpen} placement="right-end" onClose={closeSubmenu}>
          <MenuButton as={MenuItem} onClick={() => setSubmenuOpen(!submenuOpen)}>
            Open Submenu
          </MenuButton>
          <MenuList>
            <MenuItem>Submenu Item 1</MenuItem>
            <MenuItem>Submenu Item 2</MenuItem>
            <MenuItem>Submenu Item 3</MenuItem>
          </MenuList>
        </Menu> */}
      </MenuList>
    </Menu>
  );
}

function NavBar() {
  return (
    <HStack display={{ base: "none", md: "flex" }} m={6}>
      <HStack>
        {/* <Link
          as={RouterLink}
          to={"/"}
          flex={1}
          p={4}
          _hover={{
            borderBottom: "5px solid",
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Text ml={0} letterSpacing={1}>
              Home
            </Text>
          </Flex>
        </Link> */}
        <Box
          flex={1}
          p={4}
          _hover={{
            borderBottom: "5px solid",

            //   color: "white",
            //   bg: "purple.500",
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <SubmenuExample />
          </Flex>
        </Box>
        {/* <Link
          as={RouterLink}
          to={"/contact"}
          // key={'Cart'}

          // w="150px"
          // h={14}
          // flex={1}
          flex={1}
          p={4}
          // pl={6}
          // border="2px solid"
          // borderColor="green"
          _hover={{
            borderBottom: "5px solid",

            //   color: "white",
            //   bg: "purple.500",
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Text ml={0} letterSpacing={1}>
              Contact us
            </Text>
          </Flex>
        </Link> */}
      </HStack>

      <HStack>
        <Link
          as={RouterLink}
          to="/wishlist"
          // key='Wishlist'
          // minW="100px"
          //   w="120px"
          flex={1}
          p={4}
          // pl={6}
          // border="2px solid"
          // borderColor="green"
          _hover={{
            color: "white",
            bg: "purple.500",
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Icon as={FaHeart} boxSize={5} />
            <Text ml={2} letterSpacing={1}>
              Wishlist
            </Text>
          </Flex>
        </Link>
        {/* <Link
          as={RouterLink}
          to={"/cart"}
          // key={'Cart'}
          //   w="120px"
          p={4}
          flex={1}
          // pl={6}
          // border="2px solid"
          // borderColor="green"
          // color="white"
          // bg="purple.500"
          _hover={{
            color: "white",
            bg: "purple.500",
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Icon as={FaShoppingCart} boxSize={5} />
            <Text ml={2} letterSpacing={1}>
              Cart
            </Text>
          </Flex>
        </Link> */}
      </HStack>
      <HStack>
        <Link
          as={RouterLink}
          to="/login"
          flex={1}
          p={4}
          _hover={{
            color: "white",
            bg: "purple.500",
          }}
        >
          <Flex alignItems="center" justifyContent="center">
            <Icon as={FaHeart} boxSize={5} />
            <Text ml={2} letterSpacing={1}>
              Login
            </Text>
          </Flex>
        </Link>
      </HStack>
    </HStack>
  );
}

export default NavBar;
