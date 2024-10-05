import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './styles/styles.css'
import "react-toastify/dist/ReactToastify.css";
import { NextUIProvider } from '@nextui-org/system'
import { ToastContainer } from "react-toastify";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NextUIProvider>
      <App />
      <ToastContainer />
    </NextUIProvider>
  </StrictMode>,
)