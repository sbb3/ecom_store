import ProductList from "/src/components/ProductList";
import { useGetLatestProductsQuery } from "/src/redux/api/apiEndpoints/productApi";
import { HStack, Spinner, Text, VStack, useToast } from "@chakra-ui/react";

function LatestProducts() {
  const limit = 9;
  const toast = useToast();
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetLatestProductsQuery({ limit });

  if (isLoading) {
    return (
      <HStack justifyContent={"center"}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="purple.500"
          size="xl"
        />
      </HStack>
    );
  }
  //   if (error) {
  //     toast({
  //       title: "Error fetching data",
  //       description: "Error happened while fetching data",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }

  return (
    <VStack>
      <Text
        fontSize="3xl"
        style={{
          fontWeight: "bold",
          letterSpacing: "0.8px",
          textTransform: "uppercase",
        }}
      >
        Latest Products
      </Text>
      {error ? (
        <Text fontSize="md" fontWeight="semibold">
          {error.data.message}
        </Text>
      ) : (
        <ProductList products={products} />
      )}
    </VStack>
  );
}

export default LatestProducts;
