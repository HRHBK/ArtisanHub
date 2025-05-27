import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Divider,
  Chip,
  IconButton,
  Tooltip,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  LinearProgress,
} from '@mui/material';
import {
  Edit,
  Favorite,
  Receipt,
  Notifications,
  Timer,
  CheckCircle,
  Search,
  Lock,
  Security,
  SupportAgent,
  CreditCard,
  Star,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';

function BuyerDashboard() {
  const { user } = useAuth() || {};

  // Mock data (replace with real API calls later)
  const orders = [
    { id: 'ORD-001', product: 'Leather Wallet', status: 'Shipped', amount: 45, date: '2025-05-22', carrier: 'DHL' },
    { id: 'ORD-002', product: 'Batik Pillow', status: 'Delivered', amount: 25.99, date: '2025-05-15', carrier: 'UPS' },
  ];
  const invoices = [
    { id: 'INV-010', product: 'Wooden Bowl Set', amount: 39.99, date: '2025-04-30' },
    { id: 'INV-009', product: 'Coconut Shell Cup', amount: 19.5, date: '2025-04-20' },
  ];
  const favorites = ['Ebony Carved Tray', 'Ankara Table Runner', 'Raffia Wall Art'];
  const supportRep = { name: 'Nancy E.', email: 'nancy@artisanhub.com', avatar: '🧑‍💼' };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
      <Box sx={{ px: { xs: 2, md: 4 }, py: 4 }}>
        {/* Buyer Info */}
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, mb: 4 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                {user?.firstName?.[0] || 'B'}
              </Avatar>
            </Grid>
            <Grid item xs>
              <Typography variant="h5" fontWeight="bold">Hello, {user?.firstName || 'Valued Buyer'}!</Typography>
              <Typography variant="body2">Email: {user?.email || 'you@example.com'}</Typography>
              <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                <Star fontSize="small" sx={{ mr: 0.5, color: 'gold' }} /> Gold Member • 1285 Points
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Edit Profile">
                <IconButton><Edit /></IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Paper>

        {/* Dashboard Grid */}
        <Grid container spacing={3}>
          {/* Order Tracker */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>🛍️ Your Orders</Typography>
              {orders.map((order) => (
                <Box key={order.id} mb={2}>
                  <Typography fontWeight="bold">{order.product}</Typography>
                  <Typography variant="body2">
                    {order.status} via {order.carrier} • Order ID: {order.id}
                  </Typography>
                  <LinearProgress variant="determinate" value={order.status === 'Delivered' ? 100 : 60} sx={{ mt: 1, mb: 1 }} />
                  <Chip label={order.status} icon={order.status === 'Delivered' ? <CheckCircle /> : <Timer />} />
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Loyalty + Invoices */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>🎁 Loyalty & Invoices</Typography>
              <Typography variant="body2" mb={2}>Redeem points for discounts and gifts.</Typography>
              <List dense>
                {invoices.map((inv) => (
                  <ListItem key={inv.id} secondaryAction={
                    <IconButton><Receipt /></IconButton>
                  }>
                    <ListItemText primary={inv.product} secondary={`#${inv.id} • $${inv.amount} • ${inv.date}`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Favorite Products */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">❤️ Favorites</Typography>
              {favorites.map((item, idx) => (
                <Chip key={idx} label={item} icon={<Favorite />} sx={{ m: 0.5 }} />
              ))}
            </Paper>
          </Grid>

          {/* Account Manager */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6">👩‍💼 Account Manager</Typography>
              <Box display="flex" alignItems="center">
                <Avatar sx={{ mr: 2 }}>{supportRep.avatar}</Avatar>
                <Box>
                  <Typography>{supportRep.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{supportRep.email}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Security Center */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>🔐 Security Center</Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                <Lock fontSize="small" sx={{ mr: 1 }} />
                Last login: May 26, 2025 - 3:24 PM from IP: 196.204.32.11
              </Typography>
              <Typography variant="body2">
                <Security fontSize="small" sx={{ mr: 1 }} />
                2FA Enabled • No suspicious logins
              </Typography>
            </Paper>
          </Grid>

          {/* Search Orders */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
              <Typography variant="h6" gutterBottom>🔎 Search Orders</Typography>
              <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                <TextField fullWidth size="small" label="Search by product or order ID" />
                <Button startIcon={<Search />} variant="contained">Search</Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* --- New Content Sections Below --- */}

        {/* Recent Notifications */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>🔔 Recent Notifications</Typography>
          <List dense>
            <ListItem>
              <ListItemText primary="Your order ORD-001 has been shipped via DHL." secondary="May 25, 2025" />
              <Notifications color="primary" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="New discount available for Gold Members!" secondary="May 24, 2025" />
              <Receipt color="secondary" />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Your loyalty points are expiring soon." secondary="May 20, 2025" />
              <Star sx={{ color: 'gold' }} />
            </ListItem>
          </List>
        </Paper>

        {/* Shipping Tracker */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>🚚 Shipping Tracker</Typography>
          {orders.map(order => (
            <Box key={order.id} mb={2}>
              <Typography fontWeight="bold">{order.product} (Order: {order.id})</Typography>
              <Typography variant="body2">Carrier: {order.carrier}</Typography>
              <LinearProgress
                variant="determinate"
                value={
                  order.status === 'Delivered'
                    ? 100
                    : order.status === 'Shipped'
                    ? 70
                    : 30
                }
                sx={{ mt: 1, mb: 1 }}
              />
              <Chip
                label={order.status}
                icon={order.status === 'Delivered' ? <CheckCircle /> : <Timer />}
                color={order.status === 'Delivered' ? 'success' : 'warning'}
              />
            </Box>
          ))}
        </Paper>

        {/* Payment Methods */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>💳 Payment Methods</Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Chip icon={<CreditCard />} label="Visa **** 1234" variant="outlined" />
            <Chip icon={<CreditCard />} label="Mastercard **** 5678" variant="outlined" />
            <Chip icon={<CreditCard />} label="PayPal: user@example.com" variant="outlined" />
            <Button size="small" variant="contained" startIcon={<Edit />}>Manage</Button>
          </Box>
        </Paper>

        {/* Support Chat */}
        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mt: 4 }}>
          <Typography variant="h6" gutterBottom>💬 Live Support Chat</Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Chat with Nancy E., your account manager, for assistance.
          </Typography>
          <Button variant="outlined" startIcon={<SupportAgent />}>Start Chat</Button>
        </Paper>

      </Box>
    </motion.div>
  );
}

export default BuyerDashboard;
