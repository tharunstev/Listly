import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  "compilerOptions": {
      "paths": {
          "@mui/styled-engine": ["./node_modules/@mui/styled-engine-sc"]
        }
       },
})
