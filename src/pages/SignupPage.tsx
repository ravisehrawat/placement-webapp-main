import { Flex, Box, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import { useAppSelector } from "../app/hooks";
import { selectUser } from "../features/auth/authSlice";
import LogoutButton from "../features/auth/LogoutButton";
import { SignupForm } from "../features/auth/SignupForm";

export default function SignupPage() {
  const user = useAppSelector(selectUser);
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>
            {user==null?"Sign in to your account":user.email}
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >{user==null?
          <SignupForm />:
          <LogoutButton/>
          }
        </Box>
      </Stack>
    </Flex>
  );
}
