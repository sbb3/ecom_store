import { Box, Button, Divider, Flex, Icon, IconButton } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Footer from "/src/components/Footer";
import ScrollToTop from "/src/components/scrollToTop";
import Header from "/src/components/Header";
import Hamburger from "../components/Hamburger";
import DrawerC from "../components/Drawer";
import Quill from "../components/Quill";

function Layout() {
  return (
    <Box // outter-container - outter box
      bg="#F5F5F5"
      color="#2B373A"
      boxSizing="border-box"
      m={0}
      //   outline="2px solid black"
      mb={6}
      pos="relative"
    >
      <Box // inner-container - inner box
        mx="auto"
        maxW={{ base: "full", md: 748, lg: 972, xl: 1260 }} // full of its parent Box, sm of its parent width, md of 708px, lg of 964px and so
        bg="white"
        // outline="2px solid black"
      >
        <Header />
        <Outlet />
        <Divider mt={12} mb={0} size="lg" bg="gray" />
        <Footer />
      </Box>
      <ScrollToTop />
    </Box>
  );
}

export default Layout;
