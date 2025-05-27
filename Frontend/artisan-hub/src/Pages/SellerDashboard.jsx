import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Grid,
  Avatar,
  Button,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  LinearProgress,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import StorefrontIcon from '@mui/icons-material/Storefront';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InventoryIcon from '@mui/icons-material/Inventory';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarRateIcon from '@mui/icons-material/StarRate';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const mockProducts = [
  { id: 1, name: 'Beaded Necklace', category: 'Jewelry', status: 'Published', date: '2025-05-20' },
  { id: 2, name: 'Wooden Sculpture', category: 'Decor', status: 'Draft', date: '2025-05-19' },
];

function SellerDashboard() {
  const { user } = useAuth() || {};

  // Example static data for advanced insights
  const topProduct = { name: 'Beaded Necklace', sales: 120 };
  const avgDeliveryDays = 3;
  const customerRating = 4.7;
  const pendingOrders = 4;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* === Original Dashboard Content === */}
      <Box mb={6}>
        <Grid container alignItems="center" spacing={3}>
          <Grid item>
            <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
              {user?.name?.charAt(0) || 'S'}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="h4" fontWeight={700}>
              Welcome back, {user?.name || 'Seller'}!
            </Typography>
            <Typography color="text.secondary" variant="subtitle1">
              Here's a summary of your artisan store activities.
            </Typography>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={4} mb={4}>
        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <StorefrontIcon color="primary" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                {mockProducts.length}
              </Typography>
              <Typography color="text.secondary">Products Listed</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <InventoryIcon color="success" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                20
              </Typography>
              <Typography color="text.secondary">Items Sold</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <BarChartIcon color="info" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                15%
              </Typography>
              <Typography color="text.secondary">Growth Rate</Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={3}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
            }}
          >
            <AddCircleIcon color="secondary" fontSize="large" />
            <Box>
              <Typography variant="h6" fontWeight={700}>
                3
              </Typography>
              <Typography color="text.secondary">New Products</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Products Table */}
      <Box mb={6}>
        <Typography variant="h5" fontWeight={600} mb={2}>
          Your Products
        </Typography>
        <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 4 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date Added</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.status}</TableCell>
                  <TableCell>{product.date}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Product">
                      <Button size="small" color="primary" startIcon={<VisibilityIcon />}>
                        View
                      </Button>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Divider />

      {/* === Enhanced Content Sections Below === */}

      {/* Performance Summary */}
      <Box mt={8}>
        <Typography variant="h5" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
          Performance Summary
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={3}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 4, textAlign: 'center' }}>
              <TrendingUpIcon color="primary" fontSize="large" />
              <Typography variant="h6" fontWeight={700} mt={1}>
                XAF 120,000
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Earnings
              </Typography>
              <Typography variant="caption" color="text.secondary">
                (Last 30 days)
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 4, textAlign: 'center' }}>
              <ShoppingCartIcon color="success" fontSize="large" />
              <Typography variant="h6" fontWeight={700} mt={1}>
                58
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Orders
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Completed successfully
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 4, textAlign: 'center' }}>
              <AccessTimeIcon color="info" fontSize="large" />
              <Typography variant="h6" fontWeight={700} mt={1}>
                {avgDeliveryDays} Days
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Average Delivery Time
              </Typography>
              <Typography variant="caption" color="text.secondary">
                From order to delivery
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper elevation={4} sx={{ p: 3, borderRadius: 4, textAlign: 'center' }}>
              <StarRateIcon color="warning" fontSize="large" />
              <Typography variant="h6" fontWeight={700} mt={1}>
                {customerRating} / 5.0
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Customer Satisfaction
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Based on recent reviews
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Top Selling Product */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Top Selling Product
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Box
            sx={{
              width: 100,
              height: 100,
              borderRadius: 3,
              bgcolor: '#f5f5f5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: '#888',
              fontWeight: 'bold',
            }}
          >
            Img
          </Box>
          <Box flexGrow={1}>
            <Typography variant="h6" fontWeight={700}>
              {topProduct.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Best seller with {topProduct.sales} sales this month.
            </Typography>
            <Tooltip title="Percentage of total sales made by this product">
              <LinearProgress variant="determinate" value={80} sx={{ height: 10, borderRadius: 5 }} />
            </Tooltip>
          </Box>
          <Button variant="contained" color="primary">
            View Product Details
          </Button>
        </Paper>
      </Box>

      {/* Pending Orders & Reminders */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Pending Orders & Reminders
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Pending Orders
              </Typography>
              <Typography variant="body1">
                You currently have {pendingOrders} orders awaiting shipment.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                View Orders
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
              <Typography variant="h6" fontWeight={700} mb={1}>
                Reminders
              </Typography>
              <Typography variant="body1">
                Update your product listings and check your messages regularly to keep customers engaged.
              </Typography>
              <Button variant="outlined" sx={{ mt: 2 }}>
                Go to Dashboard
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Messages & Notifications */}
      <Box mt={6}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Messages & Notifications
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 4,
            maxHeight: 200,
            overflowY: 'auto',
          }}
        >
          <Box
            sx={{
              mb: 2,
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              boxShadow: 1,
            }}
          >
            <Typography variant="subtitle2" fontWeight={700}>
              New message from customer
            </Typography>
            <Typography variant="body2" color="text.secondary">
              "Hi, I’m interested in your beaded necklace. Could you provide more details on the materials used?"
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              2 hours ago
            </Typography>
          </Box>
          {/* Add more messages similarly */}
        </Paper>
      </Box>

      {/* Seller Tips & Resources */}
      <Box mt={6} mb={12}>
        <Typography variant="h5" gutterBottom fontWeight={600}>
          Seller Tips & Resources
        </Typography>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="body1" paragraph>
            • Maintain clear and honest communication with your customers to build trust.
          </Typography>
          <Typography variant="body1" paragraph>
            • Regularly update your product photos and descriptions to attract more buyers.
          </Typography>
          <Typography variant="body1" paragraph>
            • Ensure timely shipping to boost your seller rating and customer satisfaction.
          </Typography>
          <Typography variant="body1" paragraph>
            • Utilize social media channels to showcase your craft and reach a wider audience.
          </Typography>
          <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
            Learn More Tips
          </Button>
        </Paper>
      </Box>
    </motion.div>
  );
}

export default SellerDashboard;
