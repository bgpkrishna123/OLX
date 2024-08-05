import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Box,
  Text,
  Link,
  useToast,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import url from "./vars";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();
  const URL = url;

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${URL}/user/register`, {
        name,
        email,
        password,
      });

      // Show success toast
      toast({
        title: "Registration successful!",
        description: response.data.msg,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      setName("");
      setEmail("");
      setPassword("");
      navigate("/login");
    } catch (error) {
      // Show error toast
      toast({
        title: "Registration failed.",
        description: error.response?.data?.error || "There was an issue with registration.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Button
        position="absolute"
        top="10px"
        left="10px"
        color={"white"}
        bg={"green.600"}
        _hover={{ bg: "green.800" }}
        onClick={() => navigate("/")}
      >
        Go Back
      </Button>
      <Box
        maxW="sm"
        width="100%"
        p={4}
        borderWidth={1}
        borderRadius="md"
        boxShadow="md"
      >
        <form onSubmit={handleRegister}>
        <Flex
      alignItems="center"
      justifyContent="center"
      bg="gray.100" 
    >
      <Text 
        fontSize="3xl" 
        fontWeight="extrabold" 
        textAlign="center" 
        color="teal.600"
      >
        Discover Great Deals
        <br />
        Sign In to OLX
      </Text>
    </Flex>
          <FormControl mb={4}>
            <FormLabel htmlFor="name">Name</FormLabel>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel htmlFor="password">Password</FormLabel>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormControl>
          <Button
            color={"white"}
            bg={"green.600"}
            _hover={{ bg: "green.800" }}
            type="submit"
            isLoading={loading}
            loadingText="Registering..."
          >
            Register
          </Button>
        </form>
        <Text mt={4}>
          Already have an account?{" "}
          <Link color="teal.500" onClick={() => navigate("/login")}>
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default RegisterPage;
