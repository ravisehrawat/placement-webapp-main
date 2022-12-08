import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { authenticate, selectLoading } from "./authSlice";

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    const values = { email, password };
    await dispatch(authenticate(values));
  };
  return (
    <Stack spacing={4}>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input onChange={(e) => setEmail(e.target.value)} type="email" />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <Input onChange={(e) => setPassword(e.target.value)} type="password" />
      </FormControl>
      <Stack spacing={10}>
        <Stack
          direction={{ base: "column", sm: "row" }}
          align={"start"}
          justify={"end"}
        >
          <Link color={"orange.400"}>Forgot password?</Link>
        </Stack>
        <Button
          onClick={signup}
          disabled={loading}
          bg={"orange.400"}
          color={"white"}
          _hover={{
            bg: "orange.500",
          }}
        >
          {loading ? "...." : "Sign in"}
        </Button>
      </Stack>
    </Stack>
  );
};
