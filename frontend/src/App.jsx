import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Layout from "./pages/Layout";
import LetsTalk from "./pages/LetsTalk";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import SearchedProducts from "./pages/SearchedProducts";
import PaginatedProducts from "./pages/PaginatedProducts";
import InfiniteScrollingProducts from "./pages/InfiniteScrollingProducts";
import ProductPage from "./pages/ProductPage";
import { Navigate } from "react-router-dom";
import CreateProduct from "./pages/crud/CreateProduct";
import Login from "/src/components/Login";
// import Signup from "/src/components/Signup";
import useTitle from "./hooks/useTitle";

function App() {
  useTitle("Store | Home");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Homepage />} />
		<Route path="/login" element={<Login />} />
		{/* <Route path="/register" element={<Signup />} /> */}
        <Route path="/shop" element={<PaginatedProducts />} />
        <Route path="/shop/:slug" element={<ProductPage />} />
        <Route path="/search" element={<SearchedProducts />} />
        <Route path="/contact" element={<LetsTalk />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/effects"
          element={<InfiniteScrollingProducts category="effects" />}
        />
        <Route
          path="/instruments"
          element={<InfiniteScrollingProducts category="instruments" />}
        />
        <Route
          path="/studio-tools"
          element={<InfiniteScrollingProducts category="studio-tools" />}
        />
        <Route path="/product/create" element={<CreateProduct />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
