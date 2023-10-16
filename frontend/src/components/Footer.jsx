import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Container
      as="footer"
      minW="full"
      //   mt={24}
      boxShadow="md"
    >
      <Stack
        as="section"
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 10 }}
        // justify="space-between"
        py={{ base: "10", md: "16" }}
      >
        <Stack
          spacing={{ base: "6", md: "6" }}
          align="start"
          //   flex={1}
        >
          {/* <Logo /> */}
          <Logo />
          <Text fontSize="md" fontWeight="semibold">
            &copy; {new Date().getFullYear()} Tagline. All rights reserved.
          </Text>
        </Stack>
        <Stack
          flex={1}
          direction={{ base: "column-reverse", md: "column", lg: "row" }}
          spacing={{ base: "10" }}
        >
          <Stack direction="row" spacing={2}>
            <VStack
              spacing="4"
              minW="36"
              //   flex={1}
              align="start"
              //   style={{ border: "1px solid", borderColor: "black" }}
            >
              <Text fontSize="sm" fontWeight="semibold">
                Product
              </Text>
              <Stack spacing={4} shouldWrapChildren>
                <Link fontSize="md" fontWeight="semibold" as={RouterLink}>
                  How it works
                </Link>
                <Link
                  fontSize="md"
                  fontWeight="semibold"
                  variant="custom"
                  as={RouterLink}
                >
                  Refund policy
                </Link>
                <Link fontSize="md" fontWeight="semibold" as={RouterLink}>
                  Contact us
                </Link>
              </Stack>
            </VStack>
            <VStack
              spacing="4"
              minW="40"
              //   flex={1}
              align="start"
            >
              <Text fontSize="sm" fontWeight="semibold">
                Legal
              </Text>
              <Stack spacing={4} shouldWrapChildren>
                <Link fontSize="md" fontWeight="semibold" as={RouterLink}>
                  Privacy
                </Link>
                <Link fontSize="md" fontWeight="semibold" as={RouterLink}>
                  Terms and Conditions
                </Link>
              </Stack>
            </VStack>
          </Stack>

          <Box w="full">
            <form>
              {/* <FormControl isInvalid={errors.name} mt={6}> */}
              <FormLabel htmlFor="email" fontSize="sm" fontWeight="semibold">
                Stay up to date
              </FormLabel>
              <Stack
                direction={{ base: "column", md: "column", lg: "row" }}
                // mt={6}
                // style={{ border: "1px solid", borderColor: "black" }}
                spacing={4}
              >
                <FormControl flex={1}>
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your email"
                    // w="full"
                    // w={"260px"}
                    // {...register("name", {
                    //   required: "This field is required",
                    //   minLength: {
                    //     value: 4,
                    //     message: "Minimum length should be 4",
                    //   },
                    // })}
                  />
                  <FormErrorMessage>
                    {/* {errors.name && errors.name.message} */}
                  </FormErrorMessage>
                </FormControl>
                <Button
                  //   mt={8}
                  p={4}
                  type="submit"
                  //   w="full"
                  colorScheme="purple"
                  w={{ base: "full", lg: 100 }}
                  // ml={{ base: 10,  lg: 0}}
                  // mr={{ base: 10,  lg: 0}}
                  //   isLoading={isSubmitting}
                  //   onClick={handleSubmit(submit)}
                >
                  Subscribe
                </Button>
                {/* <HStack style={{ border: "1px solid", borderColor: "black" }} justifyContent='center' >
                  <Button
                    //   mt={8}
                    p={4}
                    type="submit"
                    //   w="full"
                    colorScheme="purple"
                    w={{ base: "full", md: 100 }}

                    //   isLoading={isSubmitting}
                    //   onClick={handleSubmit(submit)}
                  >
                    Subscribe
                  </Button>
                </HStack> */}
              </Stack>
            </form>
          </Box>
        </Stack>
      </Stack>
    </Container>
  );
}
