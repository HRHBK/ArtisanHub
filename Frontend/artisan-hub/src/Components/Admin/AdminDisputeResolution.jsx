
import React, { useState } from 'react';
import {
  Button,
  Typography,
  Box,
  CircularProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  TextField,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { motion } from 'framer-motion';
// import { resolveDispute } from '../../api/escrowApi'; // Import your API

// Simple Alert component for Snackbar
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function AdminDisputeResolution({ disputeId, currentStatus, onDisputeResolved }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resolutionType, setResolutionType] = useState(''); // 'refund_buyer', 'release_seller', 'partial_refund'
  const [amountToRefund, setAmountToRefund] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleSubmitResolution = async () => {
    setLoading(true);
    setError(null);

    if (!resolutionType) {
      setError('Please select a resolution type.');
      setLoading(false);
      return;
    }

    if (resolutionType === 'partial_refund' && (!amountToRefund || isNaN(amountToRefund) || parseFloat(amountToRefund) <= 0)) {
        setError('Please enter a valid amount for partial refund.');
        setLoading(false);
        return;
    }

    try {
      const parsedAmount = resolutionType === 'partial_refund' ? parseFloat(amountToRefund) : null;
      await resolveDispute(disputeId, resolutionType, parsedAmount);
      setSnackbarMessage('Dispute resolved successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
      onDisputeResolved(); // Notify parent to refresh
    } catch (apiError) {
      console.error('Error resolving dispute:', apiError);
      const msg = apiError.response?.data?.message || 'Failed to resolve dispute. Please try again.';
      setError(msg);
      setSnackbarMessage(msg);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  if (currentStatus !== 'open' && currentStatus !== 'under_review') {
      return (
          <Typography variant="body1" color="text.secondary" sx={{ mt: 3, p: 2, border: '1px solid #ccc', borderRadius: 1 }}>
              This dispute is already **{currentStatus.replace(/_/g, ' ')}**.
          </Typography>
      );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box sx={{ mt: 3, p: 3, border: '1px solid #eee', borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Resolve Dispute #{disputeId.substring(0,8)}
        </Typography>

        <FormControl component="fieldset" margin="normal">
          <FormLabel component="legend">Resolution Type</FormLabel>
          <RadioGroup
            name="resolutionType"
            value={resolutionType}
            onChange={(e) => {
                setResolutionType(e.target.value);
                if (e.target.value !== 'partial_refund') {
                    setAmountToRefund('');
                }
            }}
          >
            <FormControlLabel
              value="refund_buyer"
              control={<Radio color="error" />}
              label="Refund Buyer Fully"
            />
            <FormControlLabel
              value="release_seller"
              control={<Radio color="success" />}
              label="Release Funds to Seller"
            />
            <FormControlLabel
              value="partial_refund"
              control={<Radio color="warning" />}
              label="Partial Refund to Buyer"
            />
          </RadioGroup>
        </FormControl>

        {resolutionType === 'partial_refund' && (
          <TextField
            label="Amount to Refund (e.g., 25.00)"
            type="number"
            fullWidth
            required
            value={amountToRefund}
            onChange={(e) => setAmountToRefund(e.target.value)}
            margin="normal"
            inputProps={{ step: "0.01", min: "0.01" }}
            sx={{ mb: 2 }}
          />
        )}

        {error && (
          <Typography color="error" sx={{ my: 2 }}>
            {error}
          </Typography>
        )}

        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitResolution}
          disabled={loading || !resolutionType}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
          sx={{ mt: 2 }}
        >
          {loading ? 'Processing...' : 'Confirm Resolution'}
        </Button>
      </Box>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </motion.div>
  );
}

export default AdminDisputeResolution;