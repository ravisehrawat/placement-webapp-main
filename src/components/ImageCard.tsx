import React from "react";
import {
  GridItem,
  SimpleGrid,
  Image,
  Text,
  Flex,
  Button,
} from "@chakra-ui/react";

const ImageCard = () => {
  return (
    <SimpleGrid
      margin={"auto"}
      alignContent={"center"}
      maxWidth={"2xl"}
      columns={3}
      shadow={"xl"}
      borderRadius="lg"
    >
      <GridItem>
        <Image
          src="https://placements.iiitl.ac.in/static/media/iiitl.7631c287.jpeg"
          alt="College Pic"
          objectFit={"cover"}
          height="full"
          paddingX={"2"}
        />
      </GridItem>
      <GridItem padding={5} colSpan={2}>
        <Text fontSize={"3xl"} fontWeight={"semibold"}>
          Director's Message
        </Text>
        <Text>
          Evolving a brand-name takes years of nurturing, hard work and passion.
          IIIT Lucknow, which started its journey in 2015, has brought in the
          culture of innovation among its students
        </Text>

        <Flex justifyContent={"end"} marginTop={2}>
          <Button colorScheme="orange" variant="link">
            Read More...
          </Button>
        </Flex>
      </GridItem>
    </SimpleGrid>
  );
};

export default ImageCard;
