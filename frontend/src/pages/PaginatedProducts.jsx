import { useState } from "react";
import { useGetProductsQuery } from "/src/redux/api/apiEndpoints/productApi";
import { Button, HStack, Spinner, Text, useToast } from "@chakra-ui/react";
import ProductList from "/src/components/ProductList";
import useTitle from "/src/hooks/useTitle";

function PaginatedProducts() {
	useTitle("Store | Shop");
  const toast = useToast();
  const [page, setPage] = useState(1);

  const {
    data: { products = [], currentPage = 0, totalPages = 0 } = {},
    isLoading,
    error,
  } = useGetProductsQuery({ page });

  const disablePrevious = !(page > 1);
  const disableNext = !(page < totalPages);

  const onPreviousClick = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  const onNextClick = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const onPageIndexClick = (pageIndex) => {
    setPage(pageIndex);
  };

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
  //     return toast({
  //       title: "Error fetching data",
  //       description: "Error happened while fetching data",
  //       status: "error",
  //       duration: 2000,
  //       isClosable: true,
  //     });
  //   }

  const renderPageIndexButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          variant={page === i ? "solid" : "outline"}
          colorScheme="purple"
          onClick={() => onPageIndexClick(i)}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      {error ? (
        <HStack mt={10} justifyContent={"center"}>
          <Text fontSize="md" fontWeight="semibold">
            {error.data.message}
          </Text>
        </HStack>
      ) : (
        <>
          <ProductList products={products} />
          <Button disabled={disablePrevious} onClick={onPreviousClick}>
            Previous
          </Button>
          {renderPageIndexButtons()}
          <Button disabled={disableNext} onClick={onNextClick}>
            Next
          </Button>
        </>
      )}
    </>
  );
}

export default PaginatedProducts;
