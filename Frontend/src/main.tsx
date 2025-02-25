import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  //strict mode activates additional checks and warnings for syntax errors or missing import modules
  // the app component is like the root and responsible for the UI/everything
  <StrictMode>
    <App /> 
  </StrictMode>
)
