import React from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Box,
  Typography,
  Paper,
} from '@mui/material';
import { motion } from 'framer-motion';

// Sample order status for testing/demo
const mockOrder = {
  id: 'order_001',
  status: 'In Transit', // Options: 'Pending Payment', 'Payment in Escrow', 'In Transit', 'Delivered'
  buyer: 'John Buyer',
  seller: 'Jane Seller',
};

const steps = [
  'Pending Payment',
  'Payment in Escrow',
  'In Transit',
  'Delivered',
];

function getStepIndex(status) {
  return steps.findIndex((step) => step === status);
}

function OrderStatusStepper() {
  const order = mockOrder;
  const activeStep = getStepIndex(order.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ px: 2, py: 4 }}>
        <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
          Order Status
        </Typography>
        <Typography align="center" variant="subtitle1" color="text.secondary" mb={4}>
          Track the progress of your order.
        </Typography>

        <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
          <Typography variant="body1" mb={2}>
            <strong>Order ID:</strong> {order.id}
          </Typography>
          <Typography variant="body1" mb={2}>
            <strong>Buyer:</strong> {order.buyer}
          </Typography>
          <Typography variant="body1" mb={4}>
            <strong>Seller:</strong> {order.seller}
          </Typography>

          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
      </Box>
    </motion.div>
  );
}

export default OrderStatusStepper;
