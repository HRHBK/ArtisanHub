import React, { useState } from 'react';
import { Button, Box, Typography, TextField } from '@mui/material';
import { motion } from 'framer-motion';

function EscrowPaymentForm({ productId, orderAmount, onPaymentSuccess, onPaymentError }) {
  const [email, setEmail] = useState('');
  const [cardDetails, setCardDetails] = useState(''); // placeholder for card details input
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just a stub — call onPaymentSuccess/onPaymentError with dummy data
    if (!email) {
      onPaymentError('Email is required');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPaymentSuccess('dummy_order_id_123');
    }, 1000);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit}
      style={{ width: '100%' }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Confirm Your Payment
      </Typography>

      <TextField
        label="Email"
        type="email"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
        sx={{ mb: 2 }}
      />

      {/* Dummy card input */}
      <Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: 1,
          p: 2,
          mb: 3,
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Card details input placeholder
        </Typography>
      </Box>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? 'Processing...' : `Pay $${orderAmount.toFixed(2)} & Secure Funds`}
      </Button>
    </motion.form>
  );
}

export default EscrowPaymentForm;
