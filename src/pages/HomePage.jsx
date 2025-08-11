import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import ProductList from '../components/ProductList';
import CategoryList from '../components/CategoryList';
import PromoModal from '../components/PromoModal'; // 1. Import the new modal
import { Container, Input, InputGroup, InputLeftElement, Stack, Heading, useDisclosure } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

function HomePage() {
  const { isOpen, onOpen, onClose } = useDisclosure(); // 2. Hook to control modal

  // ... (all your existing state variables for products, filtering, etc. remain the same)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  // 3. This new effect handles the modal logic
  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('hasSeenPromo');
    if (!hasSeenPromo) {
      // If the user has never seen the promo, open it after 3 seconds
      const timer = setTimeout(() => {
        onOpen();
      }, 3000);
      return () => clearTimeout(timer); // Clean up the timer
    }
  }, [onOpen]);


  // ... (all your existing useEffects for fetching and filtering products remain the same)
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let newFilteredProducts = products;
    if (selectedCategory) {
      newFilteredProducts = newFilteredProducts.filter(p => p.category === selectedCategory);
    }
    if (searchTerm) {
      newFilteredProducts = newFilteredProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredProducts(newFilteredProducts);
  }, [selectedCategory, searchTerm, products]);


  return (
    <> {/* 4. Use a Fragment to wrap the page and the modal */}
      <Container maxW="container.xl" py={8}>
        <CategoryList onSelectCategory={setSelectedCategory} />

        <Stack spacing={6} mb={8}>
          <Heading as="h2" size="xl">
            Our Products
          </Heading>
          <InputGroup>
              <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.300" />
              </InputLeftElement>
              <Input
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  variant="filled"
              />
          </InputGroup>
        </Stack>

        <ProductList products={filteredProducts} loading={loading} />
      </Container>
      
      {/* 5. Render the modal */}
      <PromoModal isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default HomePage;