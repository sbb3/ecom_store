import { useNavigate, useSearchParams } from "react-router-dom";
import ProductList from "../components/ProductList";
import { useGetSearchedProductsQuery } from "/src/redux/api/apiEndpoints/productApi";
import { HStack, Spinner } from "@chakra-ui/react";

function SearchedProducts() {
  const navigate = useNavigate();
  const [queryString, setQueryString] = useSearchParams();
  const query = queryString.get("query");
  const type = queryString.get("type");
  //   console.log("::::: ", type);
  const {
    data: products = [],
    isLoading,
    error,
  } = useGetSearchedProductsQuery({ query, type });

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
  if (error) {
    navigate("/");
  }

  return <ProductList products={products} />;
}

export default SearchedProducts;
