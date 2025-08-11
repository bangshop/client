// src/App.jsx
import React, { useContext } from 'react';
import { Routes, Route, Link as RouterLink } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import { CartContext } from './context/CartContext';
import { useAuth } from './context/AuthContext'; // 1. Import useAuth
import { 
    Box, Flex, Heading, IconButton, Badge, 
    Button, Avatar, Menu, MenuButton, MenuList, MenuItem // 2. Import new components
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';

function App() {
  const { cart } = useContext(CartContext);
  const { currentUser, signInWithGoogle, logout } = useAuth(); // 3. Use auth context
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Box bg="gray.50" minH="100vh">
      <Flex as="header" align="center" justify="space-between" p={4} bg="white" boxShadow="sm" position="sticky" top="0" zIndex="banner">
        <Heading size="lg" color="teal.500" _hover={{ textDecor: 'none' }} as={RouterLink} to="/">
          My Awesome Shop
        </Heading>
        <Flex align="center">
          <Box position="relative" mr={4}>
            <IconButton as={RouterLink} to="/cart" aria-label="Open cart" icon={<FiShoppingCart />} variant="ghost" fontSize="2xl" />
            {cartItemCount > 0 && (
              <Badge colorScheme='red' borderRadius='full' position='absolute' top='-1' right='-1' fontSize='0.8em' px={2}>
                {cartItemCount}
              </Badge>
            )}
          </Box>
          {/* 4. Conditional UI for login */}
          {currentUser ? (
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Avatar size="sm" src={currentUser.photoURL} name={currentUser.displayName} />
              </MenuButton>
              <MenuList>
                <MenuItem onClick={logout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button onClick={signInWithGoogle} colorScheme="teal" variant="ghost">Sign In</Button>
          )}
        </Flex>
      </Flex>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Box>
  );
}

export default App;