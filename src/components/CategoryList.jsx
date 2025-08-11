import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Box, HStack, VStack, Text, Avatar, Heading } from '@chakra-ui/react';

function CategoryList({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "categories"), (snapshot) => {
      setCategories(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  return (
    <Box mb={8}>
      <Heading as="h2" size="lg" mb={4}>Categories</Heading>
      <HStack spacing={6} overflowX="auto" pb={4}>
        {/* "All" Category Button */}
        <VStack
          as="button"
          onClick={() => onSelectCategory(null)}
          spacing={2}
          minW="80px"
        >
          <Avatar size="lg" bg="teal.500" name="All" />
          <Text fontSize="sm" fontWeight="medium">All</Text>
        </VStack>

        {/* Dynamic Categories from Firebase */}
        {categories.map(cat => (
          <VStack
            key={cat.id}
            as="button"
            onClick={() => onSelectCategory(cat.name)}
            spacing={2}
            minW="80px"
          >
            <Avatar size="lg" src={cat.imageUrl} name={cat.name} />
            <Text fontSize="sm" fontWeight="medium">{cat.name}</Text>
          </VStack>
        ))}
      </HStack>
    </Box>
  );
}

export default CategoryList;