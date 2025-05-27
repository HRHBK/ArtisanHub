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
    <>
    <HomePage />
    </>
  )
}

export default App