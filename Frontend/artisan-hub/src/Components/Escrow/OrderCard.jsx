import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

function OrderCard({ order }) {
  // Status color mapping
  const statusColors = {
    pending: 'warning',
    processing: 'info',
    completed: 'success',
    cancelled: 'error',
    disputed: 'secondary',
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      style={{ marginBottom: 16 }}
    >
      <Card variant="outlined" sx={{ cursor: 'pointer' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Order #{order.id.substring(0, 8)}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Customer: {order.customerName}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            Product: {order.productName}
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
            Amount: ${order.amount.toFixed(2)}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Chip
              label={order.status}
              color={statusColors[order.status.toLowerCase()] || 'default'}
              size="small"
              aria-label={`Order status: ${order.status}`}
            />
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default OrderCard;
