import React, { useState, useEffect } from "react";
import {
  Box,
  Grid,
  Image,
  Text,
  Button,
  Flex,
  Stack,
  Spacer,
  Progress,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import timeAgo from "./timeAgo";
import url from "./vars";

const Container = ({ items, loading }) => {
  const URL = url;
  const [currentPage, setCurrentPage] = useState(1);
  const [progress, setProgress] = useState(0);
  const itemsPerPage = 9;
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) {
      const simulateLoading = () => {
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev < 95) {
              return prev + 5;
            }
            clearInterval(interval);
            return 95; 
          });
        }, 300);
      };

      simulateLoading();
    } else {
      setProgress(100); 
    }
  }, [loading]);

  if (loading && progress < 95) return (
    <Center h="calc(100vh - 60px)" p={4}>
      <Box textAlign="center">
        <Progress value={progress} size="lg" colorScheme="green" mb={6} width="50%" />
        <Text fontSize="3xl">Loading... {progress}%</Text>
      </Box>
    </Center>
  );

  if (items.length === 0) return (
    <Center h="calc(100vh - 60px)" p={4}>
      <Text fontSize="2xl" fontWeight="bold">
        No Items Found. Try another search.
      </Text>
    </Center>
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(items.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Box p={"10%"} pt={"5%"} pb={"5%"} mt={20}>
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)', 
          sm: 'repeat(2, 1fr)',  
          md: 'repeat(3, 1fr)',  
          lg: 'repeat(4, 1fr)', 
        }}
        gap={4}
      >
        {currentItems.map((item) => (
          <Box
            key={item._id}
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            maxW={200}
            p={2}
            onClick={() => navigate(`/itemPage/${item._id}`)}
            position="relative"
          >
            <Image
              src={`${URL}/uploads/${item.image}`}
              alt={item.name}
              boxSize="200px"
              objectFit="cover"
            />
            <Box
              textAlign="center"
              justifyContent="center"
              display="flex"
              alignItems="right"
            >
              <Text>{timeAgo(item.createdAt)}</Text>
            </Box>
            <Box p={4}>
              <Box
                textAlign="center"
                justifyContent="center"
                border="1px"
                borderColor="grey"
                display="flex"
                alignItems="center"
                mb={2}
              >
                <Text fontWeight={500} fontSize="lg">
                  {item.name}
                </Text>
              </Box>

              <Flex>
                <Box fontWeight={500} fontSize={"x-large"}>
                  <Text mt={2}>₹{item.price}</Text>
                </Box>
                <Spacer />
                <Box
                  border="1px"
                  borderStyle="dotted"
                  bg={item.status === "sold" ? "red.500" : "green.500"}
                  borderColor={
                    item.status === "sold" ? "red.500" : "green.500"
                  }
                  borderRadius="50%"
                  p={0.5}
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  transform="rotate(-10deg) translateY(5px)"
                  transformOrigin="center"
                >
                  <Box
                    bg={"white"}
                    border="1px"
                    borderStyle="dotted"
                    borderColor={
                      item.status === "sold" ? "red.500" : "green.500"
                    }
                    borderRadius="50%"
                    p={2}
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
              </Flex>
            </Box>
          </Box>
        ))}
      </Grid>
      <Flex justifyContent="center" mt={4}>
        <Stack spacing={4} direction="row">
          {pageNumbers.map((number) => (
            <Button
              key={number}
              onClick={() => paginate(number)}
              variant={number === currentPage ? "solid" : "outline"}
              colorScheme={number === currentPage ? "teal" : "gray"}
            >
              {number}
            </Button>
          ))}
        </Stack>
      </Flex>
    </Box>
  );
};

export default Container;
