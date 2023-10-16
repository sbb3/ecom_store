import {
  Grid,
  GridItem,
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";

const ProductList = ({ products = [] }) => {
	// console.log("products", products);
  return (
    <>
      {products.length === 0 ? (
        <HStack mt={12} w="100%" h="100%" justifyContent="center">
          <Text fontSize="xl" fontWeight="bold">
            No products found
          </Text>
        </HStack>
      ) : (
        <VStack spacing={0}
		//  w="100%"
		// outline="2px solid yellow"
>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: 8, md: 4, lg: 2 }}
            overflow="hidden"
			// outline="2px solid blue"
			width="100%"
          >
            {products?.map((product) => (
              <GridItem key={product._id}>
                <ProductCard {...product} />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      )}
    </>
  );
};
export default ProductList;
