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
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { AddIcon, SearchIcon } from "@chakra-ui/icons"; 
import { MdSearch } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import axios from 'axios';
import DownNavbar from "./DownNavbar";
import url from "./vars";

const Navbar = ({ setItems , setLoading }) => {
  const URL = url;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState("");
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

  const handleLocationSearchClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/items/location`, {
        location: locationSearch,
      });
      if (Array.isArray(response.data)) {
        setItems(response.data); 
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleItemSearchClick = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${URL}/items/search`, {
        name: itemSearch,
      });
      if (Array.isArray(response.data)) {
        setItems(response.data); 
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
    } catch (error) {
      console.error("Error fetching items:", error.message);
    }
  };

  const handleFilterClick = async (filter) => {
    try {
      setLoading(true);
      console.log("Filter by:", filter);
      if(filter==""){
        const response = await axios.get(`${URL}/items/`, {
        });
        if (Array.isArray(response.data)) {
          setItems(response.data);
          setLoading(false);
        } else {
          console.error("Expected an array but got:", response.data);
        }
        setFilterData(filter);
        setFilterOpen(false);
        return;
      }
      const response = await axios.post(`${URL}/items/${filter}`, {
      });
      if (Array.isArray(response.data)) {
        setItems(response.data);
        setLoading(false);
      } else {
        console.error("Expected an array but got:", response.data);
      }
      setFilterData(filter);
      setFilterOpen(false);
    } catch (error) {
      console.error("Error fetching filtered items:", error.message);
    }
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
          <Input
            placeholder="Search location..."
            size="md"
            mr={4}
            w={"30%"}
            value={locationSearch}
            onChange={(e) => setLocationSearch(e.target.value)}
          />
          <IconButton
            aria-label="Search Location"
            icon={<SearchIcon />} 
            ml={-4}
            backgroundColor={"grey"}
            variant="outline"
            colorScheme="blue"
            onClick={handleLocationSearchClick}
          />
          <Input
            placeholder="Search Item..."
            size="md"
            w={"50%"}
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value)}
            ml={4}
          />
          <IconButton
            aria-label="Search Item"
            icon={<MdSearch />} 
            backgroundColor={"grey"}
            variant="outline"
            colorScheme="blue"
            onClick={handleItemSearchClick}
          />
          <Menu
            isOpen={filterOpen}
            onOpen={() => setFilterOpen(true)}
            onClose={() => setFilterOpen(false)}
          >
            <MenuButton
              ml={4}
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                cursor="pointer"
              >
                <path
                  fill="#F58332"
                  d="M9 5a1 1 0 1 0 0 2a1 1 0 0 0 0-2zM6.17 5a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 0 1 0-2h1.17zM15 11a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-1.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h7.17zM9 17a1 1 0 1 0 0 2a1 1 0 0 0 0-2zm-2.83 0a3.001 3.001 0 0 1 5.66 0H19a1 1 0 1 1 0 2h-7.17a3.001 3.001 0 0 1-5.66 0H5a1 1 0 1 1 0-2h1.17"
                />
              </svg>
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => handleFilterClick("")}>All Items</MenuItem>
              <MenuItem onClick={() => handleFilterClick("sold")}>Sold</MenuItem>
              <MenuItem onClick={() => handleFilterClick("unSold")}>Unsold</MenuItem>
            </MenuList>
          </Menu>
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
              onClick={() =>isLoggedIn? navigate("/addItem"): navigate("/login")}
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
                      <Avatar size="sm" name={localStorage.getItem("name")} />
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
      <DownNavbar setItems={setItems} setLoading={setLoading} />
    </Box>
  );
};

export default Navbar;
