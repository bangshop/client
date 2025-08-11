// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext'; // 1. Import AuthProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <AuthProvider> {/* 2. Wrap the app */}
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
);