import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <Flex
      height={"100vh"}
      direction={"column"}
    >
      <Navbar />
      <Box flex={1}>
        <Outlet />
      </Box>
      <Footer />
    </Flex>
  );
};

export default Layout;
