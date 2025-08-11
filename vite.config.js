import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    // This 'dedupe' option is the key to fixing the error.
    // It forces Vite to use a single instance of these libraries.
    dedupe: [
      'react', 
      'react-dom', 
      '@chakra-ui/react',
      '@emotion/react',
      '@emotion/styled',
      'framer-motion'
    ]
  }
});