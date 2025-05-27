
import React from 'react';
import { Card, CardContent, Typography, Button, Box, Chip, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AdminDisputeCard({ dispute }) {
  const navigate = useNavigate();
  const theme = useTheme();

  const getDisputeStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'error'; // Red for open disputes
      case 'under_review':
        return 'warning'; // Amber for under review
      case 'resolved_to_buyer':
        return 'success'; // Green for resolved to buyer
      case 'resolved_to_seller':
        return 'info'; // Blue for resolved to seller
      default:
        return 'default';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      style={{ height: '100%' }}
    >
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="h6" component="div">
              Dispute #{dispute.id.substring(0, 8)}
            </Typography>
            <Chip
              label={dispute.status.replace(/_/g, ' ')}
              color={getDisputeStatusColor(dispute.status)}
              size="small"
              sx={{ textTransform: 'capitalize' }}
            />
          </Box>
          <Typography variant="body1" color="text.primary" sx={{ mb: 1 }}>
            Order ID: {dispute.order_id ? dispute.order_id.substring(0, 8) : 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reason: {dispute.reason || 'N/A'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Initiated by: {dispute.initiated_by_user_name || 'N/A'}
          </Typography>
        </CardContent>
        <Box sx={{ p: 2, pt: 0 }}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => navigate(`/dispute/${dispute.id}`)}
          >
            Review Dispute
          </Button>
        </Box>
      </Card>
    </motion.div>
  );
}

export default AdminDisputeCard;