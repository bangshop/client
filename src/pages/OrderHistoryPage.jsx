import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { Box, Container, Heading, Text, VStack, Spinner, Center, Badge, Divider, Flex } from '@chakra-ui/react';

function OrderHistoryPage() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();

    useEffect(() => {
        if (currentUser) {
            const q = query(
                collection(db, "orders"),
                where("customerInfo.uid", "==", currentUser.uid),
                orderBy("createdAt", "desc")
            );

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const ordersData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setOrders(ordersData);
                setLoading(false);
            });

            return () => unsubscribe();
        } else {
            setLoading(false);
        }
    }, [currentUser]);

    const getStatusColorScheme = (status) => {
        switch (status) {
            case "Pending": return "yellow";
            case "Processing": return "blue";
            case "Shipped": return "purple";
            case "Delivered": return "green";
            case "Cancelled": return "red";
            default: return "gray";
        }
    };
    
    if (loading) {
        return <Center h="50vh"><Spinner size="xl" /></Center>;
    }

    return (
        <Container maxW="container.lg" py={8}>
            <Heading as="h1" size="xl" mb={8}>My Orders</Heading>
            {orders.length > 0 ? (
                <VStack spacing={6} align="stretch">
                    {orders.map(order => (
                        <Box key={order.id} p={6} borderWidth="1px" borderRadius="lg" boxShadow="sm">
                            <Flex justify="space-between" mb={3}>
                                <Box>
                                    <Text fontSize="xs" color="gray.500">ORDER ID</Text>
                                    <Text fontWeight="bold">{order.id}</Text>
                                </Box>
                                <Badge colorScheme={getStatusColorScheme(order.status)} p={2} borderRadius="md">
                                    {order.status}
                                </Badge>
                            </Flex>
                            <Divider my={3} />
                            <Text fontSize="sm">Date: {new Date(order.createdAt?.toDate()).toLocaleString()}</Text>
                            <Text fontWeight="bold" mt={2}>Total: ₹{order.totalPrice.toFixed(2)}</Text>
                            <VStack align="start" mt={3} pl={2} spacing={1} fontSize="sm">
                                {order.items.map(item => (
                                    <Text key={item.id} color="gray.600">{item.quantity} x {item.name}</Text>
                                ))}
                            </VStack>
                        </Box>
                    ))}
                </VStack>
            ) : (
                <Text>You have not placed any orders yet.</Text>
            )}
        </Container>
    );
}

export default OrderHistoryPage;