import { useEffect, useState } from "react";
import { useGetProductsQuery } from "/src/redux/api/apiEndpoints/productApi";
import { useToast } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import ProductList from "../components/ProductList";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "/src/components/Loader";
import useTitle from "/src/hooks/useTitle";

function InfiniteScrollingProducts({ category }) {
  useTitle(
    "Store | " +
      category.charAt(0).toUpperCase() +
      category.slice(1).replace("-", " ")
  );
  const location = useLocation();
  const toast = useToast();
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    setAllProducts([]);
    setPage(1);
  }, [category, location.pathname]);

  const {
    data: { products = [], currentPage = 0, totalPages = 0 } = {},
    isLoading,
    error,
  } = useGetProductsQuery({ page, category });

  useEffect(() => {
    setAllProducts((prev) => [...new Set([...prev, ...products])]);
  }, [products]);

  const handleFetchMore = () => {
    setPage((prev) => prev + 1);
  };

  if (isLoading && !allProducts.length) {
    return <Loader />;
  }

  if (error) {
    toast({
      title: "Error fetching data",
      description: error.data.message,
      status: "error",
      duration: 3000,
      isClosable: true,
    });
    return <ProductList products={allProducts} />;
  }

  return (
    <>
      {products.length > 0 && (
        <InfiniteScroll
          style={{ overflow: "hidden" }}
          dataLength={allProducts.length}
          next={handleFetchMore}
          hasMore={currentPage < totalPages}
          loader={<Loader />}
        >
          <ProductList products={allProducts} />
        </InfiniteScroll>
      )}
    </>
  );
}

export default InfiniteScrollingProducts;
