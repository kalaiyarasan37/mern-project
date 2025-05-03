// // import { defineConfig } from 'vite'
// // import react from '@vitejs/plugin-react'

// // // https://vite.dev/config/
// // export default defineConfig({
// //   plugins: [react()],
// // })


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', // Backend server URL
//         changeOrigin: true,
//         secure: false,
//       },
//     },
//   },
// });
// export default {
//   server: {
//     hmr: false,
//   },
// };

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Backend server URL
        changeOrigin: true,
        secure: false,
      },
    },
    hmr: false, // Disable HMR temporarily
  },
});