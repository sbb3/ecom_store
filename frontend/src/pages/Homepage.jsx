import { Box, Button, Divider, Flex, HStack } from "@chakra-ui/react";
import ProductList from "../components/ProductList";
import ImageGalleryCaroussel from "../components/ImageGalleryCaroussel";
import Contact from "../components/Contact";
import TopSellingProducts from "../components/TopSellingProducts";
import LatestProducts from "./LatestProducts";
import { useNavigate } from "react-router-dom";

function Homepage() {
  const navigate = useNavigate();
  const onMoreProductsClick = () => {
    navigate("/shop");
  };

  return (
    <>
      <ImageGalleryCaroussel />
      <Divider mt={8} mb={8} size="sm" bg="gray" />
      {/* <LatestProducts /> */}
      <HStack
        // outline="2px solid green"
        mt={8}
        mb={8}
        justify="center"
      >
        <Button
          fontSize={"2xl"}
          letterSpacing={1}
          _hover={{
            bg: "none",
            // color: "white",
          }}
          onClick={onMoreProductsClick}
        >
          More Products
        </Button>
      </HStack>
      {/* <Divider mt={8} mb={8} size="lg" bg="gray" /> */}
      {/* <TopSellingProducts /> */}
      <Divider mt={8} mb={8} size="lg" bg="gray" />
      <Contact />
    </>
  );
}

export default Homepage;
