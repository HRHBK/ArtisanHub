import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Chip,
    List,
    ListItem,
    ListItemText,
    Divider,
    Button,
    TextField,
} from '@mui/material';
import { motion } from 'framer-motion';
import LoadingSpinner from '../Components/Common/LoadingSpinner';
import AdminDisputeResolution from '../Components/Admin/AdminDisputeResolution';
//import { getDisputeById } from '../api/escrowApi';
import { useAuth } from '../hooks/useAuth';

function DisputePage() {
    const { disputeId } = useParams();
    const { user } = useAuth() || {};
    const [dispute, setDispute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDispute = async () => {
        try {
            setLoading(true);
            const data = await getDisputeById(disputeId);
            setDispute(data);
        } catch (err) {
            console.error('Failed to fetch dispute details:', err);
            setError('Failed to load dispute details. Please check the ID.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (disputeId && user) {
            fetchDispute();
        }
    }, [disputeId, user]);

    const getDisputeStatusColor = (status) => {
        switch (status) {
            case 'open':
                return 'error';
            case 'under_review':
                return 'warning';
            case 'resolved_to_buyer':
                return 'success';
            case 'resolved_to_seller':
                return 'info';
            default:
                return 'default';
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading dispute details..." />;
    }

    if (error) {
        return <Typography color="error">{error}</Typography>;
    }

    if (!dispute) {
        return <Typography>Dispute not found or you don't have access.</Typography>;
    }

    const isAdmin = user?.role === 'admin';
    const isParticipant = (user?.id === dispute.initiated_by_user_id || user?.id === dispute.seller_id); // Assuming seller_id is stored on dispute or derived from order

    if (!isAdmin && !isParticipant) {
        return <Typography color="error">You are not authorized to view this dispute.</Typography>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Typography variant="h4" gutterBottom>
                Dispute Details #{dispute.id.substring(0, 8)}
            </Typography>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h5" component="div">
                                Dispute Summary
                            </Typography>
                            <Chip
                                label={dispute.status.replace(/_/g, ' ')}
                                color={getDisputeStatusColor(dispute.status)}
                                sx={{ textTransform: 'capitalize' }}
                            />
                        </Box>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            **Order ID:**{' '}
                            <Button
                                variant="text"
                                sx={{ p: 0, minWidth: 'unset' }}
                                onClick={() => alert('Navigate to order details: ' + dispute.order_id)} // TODO: Replace with navigate(`/order/${dispute.order_id}`)
                            >
                                {dispute.order_id ? dispute.order_id.substring(0, 8) : 'N/A'}
                            </Button>
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            **Reason:** {dispute.reason}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" paragraph>
                            **Description:** {dispute.description}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            **Initiated By:** {dispute.initiated_by_user_name || 'N/A'}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            **Date Opened:**{' '}
                            {new Date(dispute.created_at).toLocaleDateString()}
                        </Typography>

                        {dispute.resolved_at && (
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                **Resolved On:** {new Date(dispute.resolved_at).toLocaleDateString()}
                            </Typography>
                        )}

                        {dispute.evidence_urls && dispute.evidence_urls.length > 0 && (
                            <Box sx={{ mt: 3 }}>
                                <Typography variant="h6" gutterBottom>
                                    Evidence Provided
                                </Typography>
                                <List dense>
                                    {dispute.evidence_urls.map((url, index) => (
                                        <ListItem key={index}>
                                            <ListItemText>
                                                <a href={url} target="_blank" rel="noopener noreferrer">
                                                    Evidence File {index + 1}
                                                </a>
                                            </ListItemText>
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom>
                            Dispute Communication
                        </Typography>
                        {/* TODO: Implement a real-time messaging component here
                This would involve fetching `dispute_messages` from your backend
                and potentially using WebSockets for live updates.
            */}
                        <Box sx={{ maxHeight: 300, overflowY: 'auto', p: 1, border: '1px solid #f0f0f0', borderRadius: 1 }}>
                            {dispute.messages && dispute.messages.length > 0 ? (
                                dispute.messages.map((msg, index) => (
                                    <Box key={index} sx={{ mb: 1, p: 1, borderRadius: 1, backgroundColor: user?.id === msg.sender_id ? 'primary.light' : 'secondary.light', textAlign: user?.id === msg.sender_id ? 'right' : 'left' }}>
                                        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                            {msg.sender_name || 'System'} - {new Date(msg.timestamp).toLocaleString()}
                                        </Typography>
                                        <Typography variant="body2">{msg.message_text}</Typography>
                                    </Box>
                                ))
                            ) : (
                                <Typography variant="body2" color="text.secondary">No messages yet.</Typography>
                            )}
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            {/* Message input field and send button would go here */}
                            <TextField fullWidth multiline rows={2} label="Type your message..." />
                            <Button variant="contained" sx={{ mt: 1 }} disabled>Send Message</Button> {/* Placeholder */}
                        </Box>
                    </Paper>

                    {isAdmin && dispute.status !== 'resolved_to_buyer' && dispute.status !== 'resolved_to_seller' && (
                        <AdminDisputeResolution
                            disputeId={dispute.id}
                            currentStatus={dispute.status}
                            onDisputeResolved={fetchDispute} // Re-fetch dispute after resolution
                        />
                    )}
                </Grid>
            </Grid>
        </motion.div>
    );
}

export default DisputePage;