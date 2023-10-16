import {
  ChakraProvider,
  Input,
  Button,
  VStack,
  Select,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

// const validationSchema = yup.object().shape({
//   items: yup.array().of(yup.string().required("Item is required")),
// });

const validationSchema = yup.object().shape({
  items: yup.array().of(yup.string().required("Item is required")).defined(),
});

export default function MyForm() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const [selectedValues, setSelectedValues] = useState([]);
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  return (
    <Select
      value={selectedValues}
      onChange={(selectedOptions) => {
        setSelectedValues(selectedOptions);
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}
