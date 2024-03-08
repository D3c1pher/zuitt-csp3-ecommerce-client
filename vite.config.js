import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Load environment variables
const { REACT_APP_API_URL } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.REACT_APP_API_URL': JSON.stringify(REACT_APP_API_URL || 'http://localhost:4003')
  }
});