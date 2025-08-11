import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import AddressModal from '../components/AddressModal';
import {
  Box, Container, Heading, Text, Flex, Image, VStack,
  IconButton, Button, Link, useToast, useDisclosure, Divider
} from '@chakra-ui/react';
import { AddIcon, MinusIcon, DeleteIcon } from '@chakra-ui/icons';

function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, clearCart } = useContext(CartContext);
  const { currentUser, signInWithGoogle } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({ title: "Your cart is empty!", status: 'warning', duration: 2000 });
      return;
    }
    if (currentUser) {
      onOpen();
    } else {
      signInWithGoogle()
        .then(() => {
          toast({ title: "Signed in successfully! Please proceed to checkout again.", status: 'success', duration: 4000 });
        })
        .catch(error => {
          toast({ title: "Sign in failed.", description: error.message, status: 'error' });
        });
    }
  };
  
  const handleConfirmOrder = async (deliveryInfo) => {
    const order = {
      items: cart,
      totalPrice,
      createdAt: serverTimestamp(),
      status: 'Pending', // This line is added
      customerInfo: {
        uid: currentUser.uid,
        name: currentUser.displayName,
        email: currentUser.email,
        phone: deliveryInfo.phone,
        address: `${deliveryInfo.address}, ${deliveryInfo.landmark}, Pincode - ${deliveryInfo.pinCode}`
      }
    };

    try {
      await addDoc(collection(db, "orders"), order);
      toast({ title: "Order placed successfully!", status: 'success', duration: 3000 });
      clearCart();
    } catch (error) {
      toast({ title: "Failed to place order.", description: error.message, status: 'error', duration: 3000 });
    }
  };

  return (
    <>
      <Container maxW="container.lg" py={8}>
        <Heading as="h1" size="xl" mb={6}>Your Shopping Cart</Heading>
        {cart.length === 0 ? (
          <Box textAlign="center" p={10} borderWidth="1px" borderRadius="lg">
            <Text fontSize="xl">Your cart is empty.</Text>
            <Button as={RouterLink} to="/" colorScheme="teal" mt={4}>Continue Shopping</Button>
          </Box>
        ) : (
          <Flex direction={{ base: 'column', md: 'row' }} gap={8}>
            {/* Cart Items */}
            <VStack flex="2" spacing={4} align="stretch">
              {cart.map(item => (
                <Flex key={item.id} align="center" justify="space-between" p={4} borderWidth="1px" borderRadius="lg">
                  <Image src={item.imageUrl} alt={item.name} boxSize="80px" objectFit="cover" borderRadius="md" />
                  <Box flex="1" ml={4}>
                    <Text fontWeight="bold">{item.name}</Text>
                    <Text fontSize="sm">₹{item.price.toFixed(2)}</Text>
                  </Box>
                  <Flex align="center">
                    <IconButton size="sm" icon={<MinusIcon />} onClick={() => decreaseQuantity(item.id)} />
                    <Text mx={3} fontWeight="bold">{item.quantity}</Text>
                    <IconButton size="sm" icon={<AddIcon />} onClick={() => increaseQuantity(item)} />
                  </Flex>
                  <IconButton ml={4} variant="ghost" colorScheme="red" icon={<DeleteIcon />} onClick={() => removeFromCart(item.id)} />
                </Flex>
              ))}
            </VStack>

            {/* Order Summary */}
            <Box flex="1" p={6} borderWidth="1px" borderRadius="lg" h="fit-content">
              <Heading as="h2" size="lg" mb={4}>Order Summary</Heading>
              <Divider />
              <Flex justify="space-between" my={4}>
                <Text fontSize="lg">Subtotal</Text>
                <Text fontSize="lg">₹{totalPrice.toFixed(2)}</Text>
              </Flex>
              <Text fontSize="sm" color="gray.500" mb={4}>Shipping and taxes calculated at checkout.</Text>
              <Button colorScheme="teal" size="lg" w="100%" onClick={handleCheckout}>
                {currentUser ? 'Proceed to Checkout' : 'Sign In & Checkout'}
              </Button>
              <Link as={RouterLink} to="/" color="teal.500" display="block" textAlign="center" mt={4}>
                or Continue Shopping
              </Link>
            </Box>
          </Flex>
        )}
      </Container>
      <AddressModal isOpen={isOpen} onClose={onClose} onConfirmOrder={handleConfirmOrder} />
    </>
  );
}

export default CartPage;