import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    TextField,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import ConfirmationDialog from '../Components/Common/COnfirmationDialog';
import OrderStatusStepper from '../Components/Escrow/OrderStatusStepper';
import DisputeForm from '../Components/Escrow/DisputeForm';
import { useAuth } from '../hooks/useAuth';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function OrderDetailsPage() {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth() || {};

    // Fake order data for UI demo
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showDisputeForm, setShowDisputeForm] = useState(true);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [dialogAction, setDialogAction] = useState(null);
    const [trackingNumber, setTrackingNumber] = useState('');
    const [carrier, setCarrier] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {
        // Fake load simulation
        setTimeout(() => {
            setOrder({
                id: orderId,
                product_name: 'Handmade Leather Bag',
                amount: 75.0,
                status: 'shipped',
                buyer_name: 'Jane Doe',
                seller_name: 'Artisan Joe',
                created_at: new Date().toISOString(),
                shipping_tracking_number: '1234567890',
                shipping_carrier: 'DHL',
                buyer_id: 'user1',
                seller_id: 'user2',
            });
            setLoading(false);
        }, 1000);
    }, [orderId]);

    const handleConfirmAction = (action) => {
        setDialogAction(action);
        setShowConfirmDialog(true);
    };

    const handlePerformAction = () => {
        setShowConfirmDialog(false);
        setSnackbarMessage(
            dialogAction === 'confirm_receipt'
                ? 'Receipt confirmed!'
                : 'Order marked as shipped!'
        );
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
    };

    const handleSnackbarClose = () => setSnackbarOpen(false);

    if (loading || !order) {
        return <LoadingSpinner message="Loading order..." />;
    }

    const isBuyer = user?.role === 'buyer' && user?.id === order.buyer_id;
    const isSeller = user?.role === 'seller' && user?.id === order.seller_id;

    const showConfirmReceiptButton = isBuyer && order.status === 'shipped';
    const showMarkShippedButton = isSeller && order.status === 'payment_held';
    const showReportIssueButton = isBuyer && order.status === 'shipped';
    const showTrackingInfo = ['shipped', 'buyer_approved', 'funds_released', 'completed'].includes(order.status);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Typography variant="h4" gutterBottom>
                Order #{order.id?.slice(0, 8)}
            </Typography>

            <Grid container spacing={4}>
                {/* Left Panel */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={4} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Order Summary
                        </Typography>
                        <Typography><strong>Product:</strong> {order.product_name}</Typography>
                        <Typography><strong>Amount:</strong> ${order.amount.toFixed(2)}</Typography>
                        <Typography><strong>Status:</strong> {order.status.replace(/_/g, ' ').toUpperCase()}</Typography>
                        <Typography><strong>Buyer:</strong> {order.buyer_name}</Typography>
                        <Typography><strong>Artisan:</strong> {order.seller_name}</Typography>
                        <Typography>
                            <strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}
                        </Typography>

                        {showTrackingInfo && (
                            <Box sx={{ mt: 2 }}>
                                <Typography><strong>Tracking Number:</strong> {order.shipping_tracking_number}</Typography>
                                <Typography><strong>Carrier:</strong> {order.shipping_carrier}</Typography>
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 1 }}
                                    href={`https://www.google.com/search?q=${order.shipping_carrier}+${order.shipping_tracking_number}`}
                                    target="_blank"
                                >
                                    Track Package
                                </Button>
                            </Box>
                        )}

                        {showMarkShippedButton && (
                            <>
                                <TextField
                                    label="Tracking Number"
                                    fullWidth
                                    value={trackingNumber}
                                    onChange={(e) => setTrackingNumber(e.target.value)}
                                    sx={{ mt: 3 }}
                                />
                                <TextField
                                    label="Carrier"
                                    fullWidth
                                    value={carrier}
                                    onChange={(e) => setCarrier(e.target.value)}
                                    sx={{ mt: 2 }}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 2 }}
                                    onClick={() => handleConfirmAction('mark_shipped')}
                                    disabled={!trackingNumber || !carrier}
                                >
                                    Mark as Shipped
                                </Button>
                            </>
                        )}

                        {showConfirmReceiptButton && (
                            <Button
                                fullWidth
                                variant="contained"
                                color="success"
                                sx={{ mt: 3 }}
                                onClick={() => handleConfirmAction('confirm_receipt')}
                            >
                                Confirm Receipt & Release Funds
                            </Button>
                        )}

                        {showReportIssueButton && (
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                sx={{ mt: 2 }}
                                onClick={() => setShowDisputeForm(true)}
                            >
                                Report Issue / Open Dispute
                            </Button>
                        )}
                    </Paper>
                </Grid>

                {/* Right Panel */}
                <Grid item xs={12} md={6}>
                    <Paper elevation={4} sx={{ p: 3, mb: 3 }}>
                        <OrderStatusStepper status={order.status} userRole={user.role} />
                    </Paper>

                    {showDisputeForm && (
                        <DisputeForm
                            orderId={order.id}
                            onCancel={() => setShowDisputeForm(false)}
                            onDisputeSubmitted={(id) => {
                                navigate(`/dispute/${id}`);
                            }}
                        />
                    )}
                </Grid>
            </Grid>

            <ConfirmationDialog
                open={showConfirmDialog}
                onClose={() => setShowConfirmDialog(false)}
                onConfirm={handlePerformAction}
                title={
                    dialogAction === 'confirm_receipt'
                        ? 'Confirm Receipt?'
                        : 'Mark Order as Shipped?'
                }
                message={
                    dialogAction === 'confirm_receipt'
                        ? 'Are you sure you want to confirm receipt?'
                        : 'Are you sure you want to mark this order as shipped?'
                }
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </motion.div>
    );
}

export default OrderDetailsPage;
