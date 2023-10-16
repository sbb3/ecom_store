import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRegisterMutation } from "/src/redux/api/apiEndpoints/authApi";
import { setCredentials } from "../redux/slices/authSlice";
import useTitle from "../hooks/useTitle";
import Loader from "./Loader";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(4).max(15).required(),
});

const Signup = () => {
  useTitle("Store | Signup");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  const {
    register: registerForm,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [register, { isLoading, error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const onSubmit = async (data) => {
	const { data  } = await register(data);
	console.log(`response`, response);
	// reset();
    // if (isSuccess) {
    //   navigate("/");
    // }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box w={{ base: "full", sm: "full", md: 620 }}>
      <FormControl isInvalid={errors.name} mt={6}>
        <FormLabel htmlFor="name" fontSize="lg" fontWeight="bold">
          Name
        </FormLabel>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your fullname"
          w="full"
          {...registerForm("name")}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.email} mt={6}>
        <FormLabel htmlFor="email" fontSize="lg" fontWeight="bold">
          Email
        </FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email address"
          w="full"
          {...registerForm("email")}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={errors.password} mt={6}>
        <FormLabel htmlFor="password" fontSize="lg" fontWeight="bold">
          Password
        </FormLabel>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          w="full"
          {...registerForm("password")}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={8}
        w="full"
        colorScheme="purple"
        isLoading={isSubmitting}
        onClick={handleSubmit(onSubmit)}
      >
        Signup
      </Button>
	  <FormControl isInvalid={error} mt={6}>
        <FormErrorMessage>{error && error.data.message}</FormErrorMessage>
      </FormControl>
    </Box>
  );
};

export default Signup;
