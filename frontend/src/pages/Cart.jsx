import {
  Box,
  Flex,
  Text,
  Button,
  VStack,
  Divider,
  Link,
} from "@chakra-ui/react";
import { removeFromCart, clearCart } from "/src/redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.total);

  const onRemoveItem = ({ slug, price }) => {
    dispatch(removeFromCart({ slug, price }));
  };

  const onClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <Box borderWidth="1px" borderRadius="md" p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Cart
      </Text>
      {items.length === 0 ? (
        <Text color="gray.500">Your cart is empty.</Text>
      ) : (
        <VStack spacing={4} align="stretch">
          {items.map((item) => (
            <Flex
              key={item.slug}
              justifyContent="space-between"
              alignItems="center"
            >
              <Text>{item.name}</Text>
              <Text>${item.price}</Text>
              <Flex gap={4} alignItems="center">
                <Link
                  as={RouterLink}
                  to={`/products/${item.slug}`}
                >
                  <Button size="md" >
                    Buy
                  </Button>
                </Link>
                <Button
                  size="md"
                  onClick={() =>
                    onRemoveItem({ slug: item.slug, price: item.price })
                  }
                >
                  Remove
                </Button>
              </Flex>
            </Flex>
          ))}
          <Divider />
          <Flex justifyContent="space-between" alignItems="center">
            <Text fontWeight="bold">Total: ${total}</Text>
          </Flex>
          <Flex justifyContent="flex-end">
            <Button
              onClick={() => onClearCart()}
              colorScheme="red"
              size="sm"
              mt={2}
            >
              Clear Cart
            </Button>
          </Flex>
        </VStack>
      )}
    </Box>
  );
};

export default Cart;
