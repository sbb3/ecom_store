import { Flex } from "@chakra-ui/react";
import Logo from "./Logo";
import NavBar from "./NavBar";
import Search from "./Search";
import Nav from "./Nav";
import Hamburger from "./Hamburger";
import Software from "./Software";

function Header() {
  return (
    <>
      <Flex
        as="header"
        p={{ base: 0, md: 0 }}
        m={6}
        // mt={{ base: 4, md: 4 }}
        // direction={{ base: "column", sm: "row" }}
        // alignItems={{ base: "start", sm: "center" }}
        gap={3}
        justifyContent="space-between"
      >
        <Flex
          //   p={{ base: 0, md: 0 }}
          //   m={6}
          // mt={{ base: 4, md: 4 }}
          direction={{ base: "column", sm: "row" }}
          alignItems={{ base: "start", sm: "center" }}
          gap={7}
        >
          <Logo />
          <Search />
        </Flex>
        <Flex
		// alignItems={"center"}
		>
          <Nav />
          <Hamburger />
        </Flex>
      </Flex>
    </>
  );
}

export default Header;
