import {
  Grid,
  GridItem,
  Box,
  Image,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import ProductCard from "./ProductCard";

function TopSellingProducts() {
  const products = [
    {
      id: 1,
      name: "Product 1",
      price: "$19.99",
      imagesUrls: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      name: "Product 2",
      price: "$29.99",
      imagesUrls: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      name: "Product 3",
      price: "$39.99",
      imagesUrls: "https://via.placeholder.com/300x200",
    },
    {
      id: 4,
      name: "Product 1",
      price: "$19.99",
      imagesUrls: "https://via.placeholder.com/300x200",
    },
    {
      id: 5,
      name: "Product 2",
      price: "$29.99",
      imagesUrls: "https://via.placeholder.com/300x200",
    },
    {
      id: 6,
      name: "Product 3",
      price: "$39.99",
      imagesUrls: "https://via.placeholder.com/300x200",
    },
  ];
  return (
    <VStack spacing={6}>
      <Text
        fontSize="3xl"
        style={{
          fontWeight: "bold",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
        }}
      >
        Top Selling Products
      </Text>
      <Grid templateColumns="repeat(1, 1fr)" gap={2}>
        {products.map((product) => (
          <GridItem key={product.id}>
            <ProductCard {...product} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
}

export default TopSellingProducts;
