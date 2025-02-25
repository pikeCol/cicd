import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  //server configuration for setting proxy
  server: {
    //defines a list of proxy rules
    proxy: {
      "/api": {//will trigger when the url prefix of an API request is '/api'
        target: "http://localhost:3000",//requests starting with '/api' are proxied to the local port 3000
        changeOrigin: true,//modify the host value in the request headers to match the target url's host
        rewrite: (path) => path.replace(/^\/api/, ""),/*this is the rewrite rule,
        removes '/api' from the path, for example '/api/user' would be forwarded as 'http://localhost:3000/user'*/
      },
    },
  },
})

