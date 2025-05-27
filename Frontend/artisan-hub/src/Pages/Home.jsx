// src/pages/HomePage.jsx
import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

function Home() {
  const navigate = useNavigate();
  const { user } = useAuth() || {}; // Access user info

  const handleStartShopping = () => {
    // Navigate to a placeholder product or category page
    navigate('/products/example-product-id'); // Example product ID
  };

  const handleGoToDashboard = () => {
    if (user?.role === 'buyer') navigate('/buyer-dashboard');
    else if (user?.role === 'seller') navigate('/seller-dashboard');
    else if (user?.role === 'admin') navigate('/admin-dashboard');
    else navigate('/'); // Fallback
  };

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 8 }}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 700 }}>
          ArtisanHub: Where Craft Meets Trust
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
      >
        <Typography variant="h6" color="text.secondary" paragraph>
          Discover unique handcrafted goods from talented artisans, with secure transactions powered by our robust escrow system.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Your peace of mind is our priority. Funds are held securely until you confirm satisfaction.
        </Typography>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
      >
        {!user ? (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleStartShopping}
            sx={{ mr: 2 }}
          >
            Explore Artisans
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleGoToDashboard}
            sx={{ mr: 2 }}
          >
            Go to Your Dashboard
          </Button>
        )}
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => alert('Learn more about our Escrow system!')} // Placeholder
        >
          How Escrow Works
        </Button>
      </motion.div>
    </Container>
  );
}

export default Home;