// src/App.jsx
import React from 'react';
import { Routes, Route, Outlet, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './hooks/useAuth'; // Assuming you have this
import BuyerDashboard from './Pages/BuyerDashboard';
import SellerDashboard from './Pages/SellerDashboard';
import OrderDetailsPage from './Pages/OrderDetailsPage';
import AdminDashboard from './Pages/AdminDashboard';
import EscrowCheckoutPage from './Pages/EscrowCheckoutPage';
import DisputePage from './Pages/DisputePage';
import HomePage from './Pages/Home'; // Example home page
import DisputeForm from './Components/Escrow/DisputeForm';
import OrderCard from './Components/Escrow/OrderCard';
import OrderStatusStepper from './Components/Escrow/OrderStatusStepper';



const App = () => {
  return (
<<<<<<< HEAD
    <Box
      sx={{
        width: '100vw', // Occupy full viewport width
        minHeight: '100vh',
        margin: 0,
        padding: 4,
        textAlign: 'center',
        bgcolor: '#000',
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        '@media (prefers-color-scheme: dark)': {
          bgcolor: 'background.primary',
          color: 'text.secondary',
        },
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'fade-in 1s ease-in-out',
        },
        '@keyframes fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      }}
    >
      <Stack direction="row" spacing={4} justifyContent="center" mb={2}>
        <Link href="https://vite.dev" target="_blank" rel="noopener">
          <Box
            component="img"
            src={viteLogo}
            alt="Vite logo"
            sx={{
              height: 96,
              p: 3,
              transition: 'filter 300ms',
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #646cffaa)',
              },
            }}
          />
        </Link>
        <Link href="https://react.dev" target="_blank" rel="noopener">
          <Box
            component={motion.img}
            src={reactLogo}
            alt="React logo"
            sx={{
              height: 96,
              p: 3,
              transition: 'filter 300ms',
              '&:hover': {
                filter: 'drop-shadow(0 0 2em #61dafbaa)',
              },
            }}
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          />
        </Link>
      </Stack>
      <Typography variant="h2" component="h1" sx={{ fontSize: '3.2em', lineHeight: 1.1 }}>
        Vite + React
      </Typography>
      <Card sx={{ p: 4, mt: 2, mb: 2 }}>
        <Button
          variant="outlined"
          onClick={() => setCount((count) => count + 1)}
          sx={{
            borderRadius: 2,
            fontWeight: 500,
            fontSize: '1em',
            fontFamily: 'inherit',
            mb: 2,
          }}
        >
          count is {count}
        </Button>
        <Typography>
          Edit <code>src/App.jsx</code> and save to test HMR
        </Typography>
      </Card>
      <Typography color="text.secondary" sx={{ color: '#888' }}>
        Click on the Vite and React logos to learn moreVite and React logos to learn more
      </Typography>
      <style>
        {`
          @keyframes logo-spin {s logo-spin {
            from { transform: rotate(0deg); }rom { transform: rotate(0deg); }
            to { transform: rotate(360deg); }  to { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
=======
    <>
    <HomePage />
    </>
>>>>>>> 2206e5b5324fa5b3368e42674a160c53de2ebe30
  )
}

export default App