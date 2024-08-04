import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Image,
  Text,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import Navbar from './Navbar';
import url from './vars';
import timeAgo from './timeAgo';
import axios from 'axios';

const MyItem = () => {
  const [items, setItems] = useState([]); 
  const URL = url;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${URL}/items/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setItems(response.data);
        } else {
          console.error('Expected an array but got:', response.data);
        }
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <>
      <Navbar />
      <Box p="10%" pt="5%" pb="5%">
        <Grid templateColumns="repeat(4, 1fr)" gap={4}>
          {items.map((item) => (
            <Box
              key={item._id}
              borderWidth="1px"
              borderRadius="lg"
              overflow="hidden"
              maxW={200}
              p={2}
            >
              <Image
                src={`${URL}/uploads/${item.image}`}
                alt={item.name}
                boxSize="200px"
                objectFit="cover"
              />
              <Box
                textAlign="center"
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={2}
              >
                <Text>{timeAgo(item.createdAt)}</Text>
              </Box>
              <Box p={4}>
                <Box
                  textAlign="center"
                  border="1px"
                  borderColor="grey"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  mb={2}
                >
                  <Text fontWeight={500} fontSize="lg">
                    {item.name}
                  </Text>
                </Box>

                <Flex align="center">
                  <Box fontWeight={500} fontSize="x-large">
                    <Text mt={2}>₹{item.price}</Text>
                  </Box>
                  <Spacer />
                  <Box
                    border="1px"
                    borderStyle="dotted"
                    bg={item.status === 'sold' ? 'red.500' : 'green.500'}
                    borderColor={
                      item.status === 'sold' ? 'red.500' : 'green.500'
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
                      bg="white"
                      border="1px"
                      borderStyle="dotted"
                      borderColor={
                        item.status === 'sold' ? 'red.500' : 'green.500'
                      }
                      borderRadius="50%"
                      p={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Text
                        fontSize="md"
                        fontWeight={500}
                        color={item.status === 'sold' ? 'red.500' : 'green.500'}
                        textAlign="center"
                      >
                        {item.status === 'sold' ? 'Sold' : 'Unsold'}
                      </Text>
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default MyItem;
