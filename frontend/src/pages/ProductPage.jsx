import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import {
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Container,
  Stack,
  Flex,
  Spacer,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { useParams, useNavigate, Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetSingleProductQuery } from "/src/redux/api/apiEndpoints/productApi";
import { addToCart } from "/src/redux/slices/cartSlice";

function ProductPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);
  const items = useSelector((state) => state.cart.items);
  const { slug } = useParams();

  useEffect(() => {
    const item = items.find((prod) => prod.slug === slug);
    if (item) {
      setAddedToCart(true);
    }
  }, [items, slug]);

  const {
    data: product,
    isLoading,
    error,
  } = useGetSingleProductQuery({ slug });

  const cartHandler = () => {
    const { name, price, imagesUrls, slug } = product;
    dispatch(addToCart({ name, price, imagesUrls, slug }));
  };

  if (isLoading) {
    return (
      <HStack justifyContent={"center"}>
        <Loader />;
      </HStack>
    );
  }
  const images = product.imagesUrls.map((img) => ({
    original: img,
  }));
  console.log(images);

  return (
    <Container as="footer" minW="full" boxShadow="md">
      {error ? (
        <Text fontSize="md" fontWeight="semibold">
          {error.data.message}
        </Text>
      ) : (
        <>
          <Stack
            as={"section"}
            direction={{ base: "column", md: "row" }}
            spacing={{ base: 4 }}
            // py={{ base: "10", md: "16" }}
          >
            <Box mb={4} flex={1}>
              {/* <Image
                src={images[0]}
                alt={product.name}
                // maxH={600}
                minW={"full"}
                objectFit="cover"
              /> */}
              <ImageGallery
                items={images}
                infinite={true}
                showBullets={true}
                showNav={true}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showIndex={false}
                autoPlay={true}
                slideDuration={1000}
                slideInterval={5000}
                lazyLoad={true}
              />
            </Box>
            <Stack spacing={2} flex={1} p={4} alignItems={"start"}>
              <VStack align="start">
                <Heading as="h1" size="xl" mb={2}>
                  {product.name}
                </Heading>
                <Text fontSize="lg" fontWeight="semibold" mb={4}>
                  Brand: {product.brand}
                </Text>
                <Text fontSize="lg" fontWeight="semibold">
                  Platform: {product.platform.map((plat) => plat + " ")}
                </Text>
              </VStack>
              <Stack
                as={"section"}
                direction={{ base: "column", md: "row" }}
                spacing={{ base: 4 }}
                w={"full"}
              >
                <Stack
                  direction={{ base: "column", md: "row" }}
                  spacing={4}
                  //   flex={1}
                  w={"full"}
                  justify={"space-between"}
                >
                  <Text fontSize="lg" fontWeight="semibold">
                    Price: ${product.price}
                  </Text>
                  <HStack spacing={2}>
                    <Link
                      as={RouterLink}
                      //   to={`${product.buyLinks[0].link}`}
                      to={`${product.buyLinks[0].link}`}
                      target="_blank"
                    >
                      <Button
                        colorScheme="purple"
                        boxShadow="md"
                        // onClick={() => navigate(`${product.buyLinks[0].link}`)}
                      >
                        Buy Now
                      </Button>
                    </Link>

                    {addedToCart ? (
                      <Button
                        bg="gray.900"
                        color="gray.500"
                        _hover={{ bg: "purple.500", color: "white" }}
                        ml="2"
                        onClick={() => navigate("/cart")} // replace: true will replace the current entry in the history stack instead of adding a new one, so the user can't go back to the product page, but will go back to the previous page before the product page
                      >
                        In Cart
                      </Button>
                    ) : (
                      <Button
                        onClick={cartHandler}
                        colorScheme="purple"
                        boxShadow="md"
                      >
                        Add to cart
                      </Button>
                    )}
                  </HStack>
                </Stack>
              </Stack>
              <HStack spacing={2}></HStack>
            </Stack>
          </Stack>
          <Stack>
            <Text fontSize="md">{product.description}</Text>
          </Stack>
        </>
      )}
    </Container>
  );

  //   return <div>ProductPage</div>;
}

export default ProductPage;
