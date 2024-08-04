import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Heading,
  Stack,
  Input,
  Flex,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AddIcon } from "@chakra-ui/icons";
import DownNavbar from "./DownNavbar";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg="white"
      boxShadow="md"
    >
      <Flex as="nav" p={4} justifyContent="space-between" alignItems="center">
        <Box>
          <Heading
            size="md"
            fontWeight={1000}
            color="black"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            O|X
          </Heading>
        </Box>
        <Box display="flex" alignItems="center" flex="1" ml={6}>
          <Input placeholder="Search location..." size="md" mr={4} w={"30%"} />
          <Input placeholder="Search Item..." size="md" w={"60%"} />
        </Box>
        <Box>
          <Stack direction="row" spacing={4} align="center">
            <Link to="/">Home</Link>
            <Button
              bg="white"
              _hover="none"
              borderRadius="30px"
              p="17px"
              borderTop="5px solid #23e5db"
              borderLeft="5px solid #ffce32"
              borderRight="5px solid #3a77ff"
              borderBottom="5px solid #ffce32"
              className="sellBtn"
              onClick={() => navigate("/addItem")}
            >
              <AddIcon mr="5px" />
              SELL
            </Button>
            {isLoggedIn ? (
              <>
                <Menu
                  isOpen={isOpen}
                  onOpen={() => setIsOpen(true)}
                  onClose={() => setIsOpen(false)}
                >
                  <MenuButton>
                    <Flex align="center">
                      <Avatar size="sm" name="User" />
                      <IconButton
                        aria-label="Menu"
                        icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
                        variant="link"
                        ml={-2}
                        fontSize="xl"
                        color="gray.600"
                        _hover={{ color: "gray.800" }}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem as={Link} to="/profile">
                      Profile
                    </MenuItem>
                    <MenuItem as={Link} to="/myItems">
                      My-Items
                    </MenuItem>

                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              </>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Stack>
        </Box>
      </Flex>
      <DownNavbar />
    </Box>
  );
};

export default Navbar;
