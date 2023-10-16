import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { addToCart } from "/src/redux/slices/cartSlice";

const ProductCard = ({ name, price, imagesUrls, slug }) => {
  const items = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartHandler = () => {
    // console.log("cartHandler");
    dispatch(addToCart({ name, price, imagesUrls, slug }));
  };

  useEffect(() => {
    const item = items.find((prod) => prod.slug === slug);
    if (item) {
      setAddedToCart(true);
    }
  }, [items, slug]);
  //   console.log(useSelector((state) => state));
  return (
    <VStack
      as={"section"}
      boxShadow="md"
      overflow="hidden"
      p="2"
      borderRadius="md"
      boxSizing="border-box"
      //   flex={1}
      // width="100%"
      // outline="2px solid red"
    >
      <Image
        boxShadow="md"
        borderRadius="md"
        // maxH="600px"
        // maxW="600px"
        objectFit="cover"
        src={imagesUrls[0]}
        alt={name}
        onClick={() => {
          navigate(`/shop/${slug}`);
        }}
        _hover={{
          cursor: "pointer",
          transform: "scale(1.05)",
          transition: "all 0.2s ease-in-out",
        }}
      />
      <VStack>
        <VStack align="center" spacing="3" mb={2}>
          <Heading
            mt="4"
            as="h3"
            size="md"
            fontWeight="semibold"
            overflow={"hidden"}
          >
            {name}
          </Heading>
          <Text mt="2" fontSize="md" fontWeight="semibold">
            ${price}
          </Text>
        </VStack>
        <HStack>
          <Button
          // bg="gray.900"
          // color='gray.500'
          // _hover={{ bg: "purple.500", color: 'white' }}
          // ml="2"
          >
            Add to wishlist
          </Button>
          {addedToCart ? (
            <Button
              bg="gray.900"
              color="gray.500"
              _hover={{ bg: "purple.500", color: "white" }}
              ml="2"
              onClick={() => navigate("/cart")}
            >
              In Cart
            </Button>
          ) : (
            <Button onClick={cartHandler} colorScheme="purple" boxShadow="md">
              Add to cart
            </Button>
          )}
        </HStack>
      </VStack>
    </VStack>
  );
};

export default ProductCard;
