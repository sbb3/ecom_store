import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Radio,
  RadioGroup,
  VStack,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import {
  useForm,
  Controller,
  useFieldArray,
  useController,
} from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useCreateProductMutation } from "/src/redux/api/apiEndpoints/productApi";
import Quill from "/src/components/Quill";
import { useRef, useState } from "react";
import useTitle from "/src/hooks/useTitle";

const FileInput = ({ control, name }) => {
  const {
    field: { ref, ...inputProps },
  } = useController({
    name,
    control,
  });

  return <Input type="file" ref={ref} {...inputProps} multiple />;
};

function CreateProduct() {
	useTitle("Store | Create Product");
  const [description, setDescription] = useState("");
  const selectedPlatformRef = useRef([]);
  const [createProduct, { isLoading: isCreatingProductLoaidng }] =
    useCreateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    resetField,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      brand: "",
      price: "",
      platform: [""],
      category: "",
      buyLinks: [{ link: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "buyLinks",
  });

  //   console.log("fields: ", fields);

  const onSubmit = async (data) => {
    // console.log(data);
    // console.log("buyLinks: ", data.buyLinks);
    // console.log(data.image);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("brand", data.brand);
    formData.append("price", data.price);

    for (let i = 0; i < data?.images?.length; i++) {
      formData.append("images", data.images[i]);
    }

    for (let i = 0; i < data?.platform?.length; i++) {
      // formData.append("platform[]", data.platform[i]);
      formData.append("platform", data.platform[i]);
    }
    formData.append("category", data.category);
    formData.append("buyLinks", JSON.stringify(data.buyLinks));
    formData.append("description", description);

    // console.log(formData);

    await createProduct({ formData });
    // reset();
    // fields.map((_, index) => {
    //   remove(index);
    // });
    // setDescription("");
  };

  return (
    <>
      <DevTool control={control} placement="top-left" />
      <Box w={{ base: "full", sm: "full", md: 620 }}>
        <form
          method="POST"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl isInvalid={errors.name} mt={6}>
            <FormLabel htmlFor="name" fontSize="lg" fontWeight="bold">
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
                  value: 1,
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.brand} mt={6}>
            <FormLabel htmlFor="brand" fontSize="lg" fontWeight="bold">
              Brand
            </FormLabel>
            <Input
              type="text"
              id="brand"
              name="brand"
              placeholder="Brand"
              {...register("brand", {
                required: "This is required",
                minLength: {
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.brand && errors.brand.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.price} mt={6}>
            <FormLabel htmlFor="price" fontSize="lg" fontWeight="bold">
              Price
            </FormLabel>
            <Input
              type="text"
              id="price"
              name="price"
              placeholder="price"
              {...register("price", {
                required: "This is required",
                minLength: {
                  message: "Minimum length should be 4",
                },
              })}
            />
            <FormErrorMessage>
              {errors.price && errors.price.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.image} mt={6}>
            <FormLabel htmlFor="image" fontSize="lg" fontWeight="bold">
              Upload Image
            </FormLabel>
            <Input
              type="file"
              id="images"
              name="images"
              placeholder="upload images"
              {...register("images", {
                required: "This is required",
              })}
              multiple
            />
            <FormErrorMessage>
              {errors.image && errors.image.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.platform} mt={6}>
            <FormLabel htmlFor="platform" fontSize="lg" fontWeight="bold">
              Platform
            </FormLabel>
            <Controller
              name="platform"
              control={control}
              defaultValue={selectedPlatformRef.current} // Set the default value from useRef
              render={({ field }) => (
                // console.log(
                //   "{selectedPlatformRef.current: ",
                //   selectedPlatformRef.current[0]
                // ),
                // console.log("field: ", field),
                // when the value of the checkbox is changed, the value of the field is updated
                // and the value of the field is updated, the value of the useRef is updated
                // when reset is called, the value of the field is updated to the default value
                <CheckboxGroup value={field.value}>
                  <VStack spacing={2} align="start">
                    <Checkbox
                      value="Windows"
                      onChange={(e) => {
                        const updatedValue = e.target.checked
                          ? [...field.value, e.target.value]
                          : field.value.filter(
                              (pltfrm) => pltfrm !== e.target.value
                            );
                        field.onChange(updatedValue);
                        selectedPlatformRef.current = updatedValue; // Update the useRef value
                      }}
                    >
                      Windows
                    </Checkbox>
                    <Checkbox
                      value="Mac"
                      onChange={(e) => {
                        const updatedValue = e.target.checked
                          ? [...field.value, e.target.value]
                          : field.value.filter(
                              (pltfrm) => pltfrm !== e.target.value
                            );
                        // console.log("updatedValue: ", updatedValue);
                        field.onChange(updatedValue);
                        selectedPlatformRef.current = updatedValue; // Update the useRef value
                      }}
                    >
                      Mac
                    </Checkbox>
                  </VStack>
                </CheckboxGroup>
              )}
            />
            <FormErrorMessage>
              {errors.platform && errors.platform.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.category} mt={6}>
            <FormLabel htmlFor="category" fontSize="lg" fontWeight="bold">
              Category
            </FormLabel>
            <RadioGroup defaultValue="">
              <VStack spacing={2} align="start">
                <Radio
                  value="Effects"
                  spacing={2}
                  {...register("category", {
                    required: "This is required",
                  })}
                >
                  Effects
                </Radio>
                <Radio
                  value="Instruments"
                  spacing={2}
                  {...register("category", {
                    required: "This is required",
                  })}
                >
                  Instruments
                </Radio>
                <Radio
                  value="Studio tools"
                  spacing={2}
                  {...register("category", {
                    required: "This is required",
                  })}
                >
                  Studio tools
                </Radio>
              </VStack>
            </RadioGroup>

            <FormErrorMessage>
              {errors.category && errors.category.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.buyLinks} mt={6} w={"full"}>
            <FormLabel htmlFor="buyLinks" fontSize="lg" fontWeight="bold">
              Buy Links
            </FormLabel>
            {fields.map((item, index) => {
              //   console.log("item: ", item);
              return (
                <HStack
                  as={"div"}
                  key={item.id}
                  spacing={6}
                  justifyContent="space-between"
                  alignItems="center"
                  mb={4}
                  w={"full"}
                >
                  <Input
                    type="text"
                    id="buyLinks"
                    name="buyLinks"
                    placeholder="Enter a buy link"
                    {...register(`buyLinks.${index}.link`, {
                      required: "This is required",
                    })}
                    // defaultValue={item.buyLinks}
                    // onChange={(e) => {
                  />
                  <Button
                    onClick={() => {
                      remove(index);
                    }}
                    colorScheme="red"
                  >
                    Remove
                  </Button>
                </HStack>
              );
            })}
            <HStack
              as={"div"}
              justifyContent="end"
              alignItems="center"
              mt={8}
              mb={4}
            >
              <Button
                onClick={() => {
                  append({ link: "" });
                }}
                colorScheme="green"
                //   w={'full'}
              >
                Append
              </Button>
            </HStack>

            <FormErrorMessage>
              {errors.buyLinks && errors.buyLinks.message}
            </FormErrorMessage>
          </FormControl>
          {/* <Button
            mt={8}
            type="submit"
            w="full"
            colorScheme="purple"
            isLoading={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            Send Message
          </Button> */}
          <Quill description={description} setDescription={setDescription} />
          <Button
            mt={8}
            type="submit"
            w="full"
            colorScheme="purple"
            isLoading={isSubmitting}
          >
            Send Message
          </Button>
        </form>
      </Box>
    </>
  );
}

export default CreateProduct;
