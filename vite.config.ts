import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/mindbox-test-app/',
  optimizeDeps: {
    include: ['material-ui-icons'],
  },
});
