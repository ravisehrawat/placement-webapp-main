import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectLoading, updateUserProfile } from "../features/auth/authSlice";

const ProfileForm = () => {
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const submit = () => {
    dispatch(updateUserProfile({ name, phone }));
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>{"Update your profile"}</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name">
              <FormLabel>Name</FormLabel>
              <Input onChange={(e) => setName(e.target.value)} type="name" />
            </FormControl>
            <FormControl id="phone">
              <FormLabel>Mobile No</FormLabel>
              <NumberInput onChange={(e) => setPhone(e)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <Stack spacing={10}>
              <Button
                onClick={submit}
                disabled={loading}
                bg={"orange.400"}
                color={"white"}
                _hover={{
                  bg: "orange.500",
                }}
              >
                {loading ? "...." : "Submit"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default ProfileForm;
