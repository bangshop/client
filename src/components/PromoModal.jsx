import React from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, VStack, Text, Image, Flex, Box, Heading
} from '@chakra-ui/react';

// This component receives isOpen and onClose props to control its state
function PromoModal({ isOpen, onClose }) {

  // When the modal is closed, we set a flag in localStorage
  const handleClose = () => {
    localStorage.setItem('hasSeenPromo', 'true');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="3xl" isCentered>
      <ModalOverlay bg="blackAlpha.700" />
      <ModalContent borderRadius="lg" overflow="hidden">
        <ModalBody p={0}>
          <Flex>
            {/* Image Section - hidden on small screens */}
            <Box flex="1" display={{ base: 'none', md: 'block' }}>
              <Image
                objectFit="cover"
                w="100%"
                h="100%"
                src="https://images.unsplash.com/photo-1555529771-835f59ee5020?q=80&w=1887"
                alt="Jewellery model"
              />
            </Box>

            {/* Form Section */}
            <VStack flex="1" p={10} spacing={4} align="center" textAlign="center">
              <ModalCloseButton onClick={handleClose} />
              <Heading as="h2" size="lg">Unlock Your Style</Heading>
              <Text>
                Enjoy <Text as="span" color="teal.500" fontWeight="bold">5% Off</Text> on your first order!
              </Text>
              <Text fontSize="sm" color="gray.500">
                Be the first to know about new arrivals, sales, and exclusive offers.
              </Text>
              <FormControl>
                <FormLabel srOnly>Enter Your Name</FormLabel>
                <Input placeholder="Enter Your Name" />
              </FormControl>
              <FormControl>
                <FormLabel srOnly>Enter Your Email</FormLabel>
                <Input type="email" placeholder="Enter Your Email" />
              </FormControl>
              <Button colorScheme="teal" w="full" onClick={handleClose}>
                Get My Discount
              </Button>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default PromoModal;