import React from "react";
import { Image, Spacer, Text } from "@chakra-ui/react";
import ImageCard from "../components/ImageCard";
const Landing = () => {
  return (
    <div>
      <Image
        src="https://placements.iiitl.ac.in/static/media/iiitl.7631c287.jpeg"
        alt="College Pic"
        objectFit={"cover"}
        height={"50vh"}
        width={"100%"}
        margin={"auto"}
      />

      <Text
        padding={"10"}
        fontSize={"5xl"}
        fontWeight={"light"}
        letterSpacing="widest"
        textAlign={"center"}
      >
        THE INSTITUTE SPEAKS
      </Text>

      <ImageCard />

      <Spacer height={"10"} />

      <ImageCard />

      <Spacer height={"10"} />
    </div>
  );
};

export default Landing;
