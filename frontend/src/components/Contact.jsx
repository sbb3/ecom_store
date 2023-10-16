import {
  Box,
  Button,
  Divider,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useWeb3forms from "use-web3forms";
import { useToast } from "@chakra-ui/react";

function Contact() {
  const toast = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  //   const onSubmit = (values) => {
  // 	console.log(values);
  //     return new Promise((resolve) => {
  //       setTimeout(() => {
  //         alert(JSON.stringify(values, null, 2));
  //         resolve();
  //       }, 3000);
  //     });
  //   };
  const { submit } = useWeb3forms({
    apikey: import.meta.env.VITE_WEB3FORMS_API_KEY,
    onSuccess(successMessage, data) {
      // console.log(data); {data: {name: 'name', email: 'email@gmail.com', message: 'eeee'}, message: "Email sent successfully!", success: true}
      toast({
        title: "Message sent.",
        description: successMessage,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    },
    onError: (errorMessage) => {
      toast({
        title: "Message not sent.",
        description: "Error happened during sending message.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    },
  });
  //   style={{ border: "2px solid", borderColor: "green" }}
  return (
    <VStack spacing={12} alignItems="center">
      <VStack w={{ base: "90%", sm: "80%", md: 620 }}>
        <Text
          fontSize="3xl"
          style={{
            fontWeight: "bold",
            letterSpacing: "0.8px",
            textTransform: "uppercase",
          }}
        >
          get in touch
        </Text>
      </VStack>

      <Box w={{ base: "90%", sm: "80%", md: 620 }} boxShadow="md">
        <form>
          <FormControl isInvalid={errors.name} mt={6}>
            <FormLabel htmlFor="name" fontSize="lg" fontWeight="semibold">
              Name
            </FormLabel>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              w="full"
              {...register("name", {
                required: "This field is required",
                minLength: {
                  value: 4,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.email} mt={6}>
            <FormLabel htmlFor="email" fontSize="lg" fontWeight="semibold">
              Email
            </FormLabel>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="your@email.com"
              {...register("email", {
                required: "This is required",
                pattern: "/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$/i",
              })}
            />
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.inquiryReason} mt={6}>
            <FormLabel
              htmlFor="inquiryReason"
              fontSize="lg"
              fontWeight="semibold"
            >
              Inquiry Reason
            </FormLabel>
            <Select
              placeholder="Choose a reason for your inquiry"
              {...register("inquiryReason", { required: "This is required" })}
            >
              <option value="General inquiry">General inquiry</option>
              <option value="Product support">Product support</option>
              <option value="Billing issue">Billing issue</option>
              <option value="Request Plugins">Request Plugins</option>
            </Select>
            <FormErrorMessage>
              {errors.inquiryReason && errors.inquiryReason.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.message} mt={6}>
            <FormLabel htmlFor="message" fontSize="lg" fontWeight="semibold">
              Message
            </FormLabel>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="What you would like to say"
              w="full"
              {...register("message", {
                required: "This field is required",
              })}
            />
            <FormErrorMessage>
              {errors.message && errors.message.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            mt={8}
            type="submit"
            w="full"
            colorScheme="purple"
            isLoading={isSubmitting}
            onClick={handleSubmit(submit)}
            letterSpacing={1}
          >
            Send Message
          </Button>
        </form>
      </Box>
    </VStack>
  );
}

export default Contact;
