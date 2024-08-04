import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import {
  Box,
  Text,
  Image,
  Progress,
  Flex,
  Grid,
  Center,
  Input,
  Button,
  Textarea,
  Stack,
  Avatar,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import url from "./vars";
import timeAgo from "./timeAgo";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";

const ItemPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [isFavorite, setIsFavorite] = useState(false); 
  const URL = url;
  const toast = useToast();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${URL}/items/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const simulateLoading = () => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev < 100) {
            return prev + 10;
          }
          clearInterval(interval);
          return 100;
        });
      }, 300);
    };

    simulateLoading();
    fetchItem();
  }, [id]);

  const handleSendMessage = () => {
    console.log("Price:", price);
    console.log("Message:", message);
    setPrice("");
    setMessage("");
    toast({
      title: "Message sent.",
      description: "Your message has been sent successfully.",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const toggleFavorite = async () => {
    try {
      const response = await axios.post(`${URL}/items/favourites`, { itemId: id }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setIsFavorite((prev) => !prev);
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error updating favorites:', error);
      toast({
        title: "Error",
        description: "An error occurred while updating favorites.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <Flex
          direction="column"
          align="center"
          justify="center"
          h="calc(100vh - 60px)"
          p={4}
          position="relative"
          top="60px"
        >
          <Box textAlign="center">
            <Progress
              value={progress}
              size="lg"
              colorScheme="green"
              mb={6}
              width="50%"
            />
            <Text fontSize="3xl">Loading... {progress}%</Text>
          </Box>
        </Flex>
      </>
    );

  if (error)
    return (
      <>
        <Navbar />
        <Center h="calc(100vh - 60px)" p={4}>
          <Text color="red.500">Error: {error}</Text>
        </Center>
      </>
    );

  return (
    <>
      <Navbar />
      <Box p={4} mt={150} ml={"10%"} mr={"10%"}>
        {item ? (
          <Grid templateColumns={{ base: "1fr", md: "1fr 2fr" }} gap={6}>
            <Box position="relative">
              <Image
                src={`${URL}/uploads/${item.image}`}
                alt={item.name}
                borderRadius="md"
                objectFit="cover"
                maxW={700}
                maxH={700}
              />

              <Box
                border="1px"
                borderStyle="dotted"
                bg={item.status === "sold" ? "red.500" : "green.500"}
                borderColor={item.status === "sold" ? "red.500" : "green.500"}
                borderRadius="50%"
                p={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                top={3}
                left={2}
                transform="rotate(-30deg)"
                transformOrigin="center"
              >
                <Box
                  bg={"white"}
                  border="1px"
                  borderStyle="dotted"
                  borderColor={item.status === "sold" ? "red.500" : "green.500"}
                  borderRadius="50%"
                  p={4}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize={"md"}
                    fontWeight={500}
                    color={item.status === "sold" ? "red.500" : "green.500"}
                    textAlign="center"
                  >
                    {item.status === "sold" ? "Sold" : "Unsold"}
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box
              borderWidth={1}
              borderRadius="md"
              borderColor="gray.300"
              p={10}
              position="relative"
            >
              <IconButton
                icon={isFavorite ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
                onClick={toggleFavorite}
                position="absolute"
                top={2}
                right={2}
                aria-label="Toggle Favorite"
                variant="outline"
                borderColor="black"
                boxSize={10} 
                fontSize="3xl" 
              />
              <Flex direction="column" gap={4}>
                <Text fontSize="4xl" fontWeight="bold">
                  ₹{item.price}
                </Text>

                <Text fontSize="2xl" mt={4} color={"grey"}>
                  Product:{" "}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {item.name}
                  </span>
                </Text>
                <Text fontSize="2xl" mt={4} color={"grey"}>
                  Type:{" "}
                  <span style={{ fontWeight: "bold", color: "black" }}>
                    {item.categories}
                  </span>
                </Text>

                <Box
                  borderWidth={1}
                  borderRadius="md"
                  borderColor="gray.300"
                  p={4}
                  mt={4}
                  maxW="100%"
                  bg="gray.50"
                >
                  <Text fontSize="l" color="grey">
                    Description:{" "}
                    <span style={{ color: "teal.500" }}>
                      {item.description}
                    </span>
                  </Text>
                </Box>
                <Flex justify="space-between" mb={4}>
                  <Box>
                    <Text fontSize="2xl" mt={4} color={"grey"}>
                      Location:{" "}
                      <span style={{ fontWeight: "bold", color: "black" }}>
                        {item.location}
                      </span>
                    </Text>
                  </Box>
                  <Box>
                    <Text mt={5} color={"grey"}>{timeAgo(item.createdAt)}</Text>
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Grid>
        ) : (
          <Text>No item found</Text>
        )}

        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          mt={8}
          gap={6}
          justify="center"
        >
          <Flex
            align="center"
            gap={4}
            flex={1}
            flexDirection="row"
            justify="center"
            maxW={300}
          >
            <Avatar
              name={item.ownerName}
              src="https://bit.ly/dan-abramov"
              size="xl"
            />
            <Text fontSize="xl" fontWeight="bold">
              {item.ownerName}
            </Text>
          </Flex>
          <Box
            flex={1}
            p={4}
            borderWidth={1}
            borderRadius="md"
            borderColor="gray.300"
            boxShadow="md"
            maxW={800}
          >
            <Text fontSize="xl" mb={4}>
              Send a Message
            </Text>
            <Stack spacing={4}>
              <Input
                type="number"
                placeholder="Enter price"
                value={price}
                maxW={200}
                onChange={(e) => setPrice(e.target.value)}
              />
              <Textarea
                placeholder="Enter your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button
                color={"white"}
                bg={"green.600"}
                _hover={{ bg: "green.800" }}
                maxW={100}
                onClick={handleSendMessage}
              >
                Send
              </Button>
            </Stack>
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default ItemPage;
