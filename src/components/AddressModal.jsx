import React, { useState } from 'react';
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
  Button, FormControl, FormLabel, Input, VStack, useToast
} from '@chakra-ui/react';

function AddressModal({ isOpen, onClose, onConfirmOrder }) {
  const [address, setAddress] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  const toast = useToast();

  const handleSubmit = () => {
    if (!address || !pinCode || !phone) {
      toast({ title: "Please fill all required fields.", status: 'error', duration: 3000 });
      return;
    }
    const fullAddress = { address, landmark, pinCode, phone };
    onConfirmOrder(fullAddress);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delivery Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Flat, House no., Building</FormLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Area, Street, Landmark</FormLabel>
              <Input value={landmark} onChange={(e) => setLandmark(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Pincode</FormLabel>
              <Input value={pinCode} onChange={(e) => setPinCode(e.target.value)} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Phone Number</FormLabel>
              <Input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </FormControl>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={onClose}>Cancel</Button>
          <Button colorScheme='teal' onClick={handleSubmit}>Confirm & Place Order</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddressModal;