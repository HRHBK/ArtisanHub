import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Divider,
  Snackbar,
  Grid,
  Avatar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { motion } from 'framer-motion';
import EscrowPaymentForm from '../Components/Escrow/EscrowPaymentForm';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Static product data
const mockProduct = {
  id: '12345',
  name: 'Handcrafted Wooden Chair',
  description: 'Beautifully crafted chair from local artisans.',
  price: 129.99,
  artisanName: 'Jane Doe',
  image: '', // Leave empty to test fallback
};

function EscrowCheckoutPage() {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handlePaymentSuccess = (orderId) => {
    setSnackbarMessage('Payment successful! Funds in escrow.');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    setTimeout(() => navigate(`/order/${orderId}`), 2000);
  };

  const handlePaymentError = (message) => {
    setSnackbarMessage(`Payment failed: ${message}`);
    setSnackbarSeverity('error');
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') return;
    setSnackbarOpen(false);
  };

  const product = mockProduct;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ px: 2, py: 4 }}>
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Secure Escrow Checkout
        </Typography>
        <Typography align="center" variant="body1" color="text.secondary" mb={4}>
          Complete your purchase safely. Payment will only be released once you confirm receipt.
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {/* Product Summary */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Product Overview</Typography>
              <Divider sx={{ mb: 2 }} />

              {product.image ? (
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxWidth: '100%', borderRadius: 8 }}
                  />
                </Box>
              ) : (
                <Box
                  sx={{
                    width: '100%',
                    height: 200,
                    bgcolor: 'grey.300',
                    borderRadius: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'grey.600',
                    fontStyle: 'italic',
                    mb: 2,
                  }}
                >
                  No Image Available
                </Box>
              )}

              <Typography variant="body1" fontWeight="bold">
                {product.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {product.description}
              </Typography>

              <Box mt={2}>
                <Typography variant="subtitle1">Sold by:</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32 }}>
                    {product.artisanName?.[0] || '?'}
                  </Avatar>
                  <Typography>{product.artisanName || 'Unknown Artisan'}</Typography>
                </Box>
              </Box>

              <Box mt={3}>
                <Typography variant="subtitle1">Total Price</Typography>
                <Typography variant="h6" color="primary">
                  ${product.price?.toFixed(2)}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Payment Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>Payment</Typography>
              <Divider sx={{ mb: 2 }} />

              <EscrowPaymentForm
                productId={product.id}
                orderAmount={product.price}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default EscrowCheckoutPage;
