import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import {
    Box,
    SimpleGrid,
    Image,
    Text,
    Button,
    Heading,
    Stack,
    useToast,
    Skeleton
} from '@chakra-ui/react';

// ProductList now receives products and loading state as props
function ProductList({ products, loading }) {
    const { addToCart } = useContext(CartContext);
    const toast = useToast();

    const handleAddToCart = (product) => {
        addToCart(product);
        toast({
            title: 'Added to cart!',
            description: `${product.name} has been added to your cart.`,
            status: 'success',
            duration: 2000,
            isClosable: true,
            position: 'top',
        });
    };

    // Show skeleton loaders while loading
    if (loading) {
        return (
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
                {Array.from({ length: 8 }).map((_, index) => (
                    <Stack key={index}>
                        <Skeleton height="150px" borderRadius="lg" />
                        <Skeleton height="20px" />
                        <Skeleton height="20px" />
                    </Stack>
                ))}
            </SimpleGrid>
        );
    }
    
    // Show message if no products match filters
    if (products.length === 0) {
        return (
             <Box textAlign="center" p={10}>
                <Heading as="h3" size="lg">No products found</Heading>
                <Text mt={2}>Try selecting a different category or clearing your search!</Text>
            </Box>
        );
    }

    // Display the grid of products
    return (
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
            {products.map(product => (
                <Box
                    key={product.id}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="md"
                    transition="all 0.2s"
                    _hover={{ transform: 'translateY(-5px)', boxShadow: 'lg' }}
                >
                    <Image src={product.imageUrl} alt={product.name} objectFit="cover" h="150px" w="100%" />

                    <Box p={4}>
                        <Stack spacing={1}>
                            <Heading as="h3" size="md" noOfLines={1}>
                                {product.name}
                            </Heading>
                            <Text fontSize="sm" color="gray.600" noOfLines={2}>
                                {product.description}
                            </Text>
                            <Text fontWeight="bold" fontSize="lg" color="teal.500">
                                ₹{product.price.toFixed(2)}
                            </Text>
                        </Stack>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            w="100%"
                            onClick={() => handleAddToCart(product)}
                        >
                            Add to Cart
                        </Button>
                    </Box>
                </Box>
            ))}
        </SimpleGrid>
    );
}

export default ProductList;