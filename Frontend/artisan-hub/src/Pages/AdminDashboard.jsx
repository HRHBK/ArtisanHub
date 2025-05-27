import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Chip,
  Tooltip,
  TextField,
  MenuItem,
  LinearProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
} from '@mui/material';
import { motion } from 'framer-motion';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DownloadIcon from '@mui/icons-material/Download';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FeedbackIcon from '@mui/icons-material/Feedback';
import SettingsIcon from '@mui/icons-material/Settings';
import { useAuth } from '../hooks/useAuth';

function AdminDashboard() {
  const { user } = useAuth() || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Welcome back, {user?.name || 'Admin'}! Monitor platform activities, manage users, track sales, address system feedback, and ensure smooth platform operations.
      </Typography>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[
          {
            icon: <PeopleIcon />, title: '1,200 Users', subtitle: 'Total Users', color: '#4285f4',
          },
          {
            icon: <ShoppingCartIcon />, title: '340 Orders', subtitle: 'Orders this month', color: '#34a853',
          },
          {
            icon: <ReportProblemIcon />, title: '3 Disputes', subtitle: 'Open Disputes', color: '#ea4335',
          },
          {
            icon: <MonetizationOnIcon />, title: '$12,500', subtitle: 'Monthly Revenue', color: '#f9ab00',
          },
          {
            icon: <TrendingUpIcon />, title: '15%', subtitle: 'Growth Rate', color: '#9c27b0',
          },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={2.4} key={index}>
            <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
              <Grid container spacing={2} alignItems="center">
                <Grid item>
                  <Avatar sx={{ bgcolor: item.color }}>{item.icon}</Avatar>
                </Grid>
                <Grid item>
                  <Typography variant="h6">{item.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.subtitle}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box mt={6}>
        <Tabs value={0} textColor="primary" indicatorColor="primary">
          <Tab label="Approvals" />
          <Tab label="Activity" />
          <Tab label="Reports" />
          <Tab label="Settings" />
        </Tabs>
      </Box>

      <Box mt={6}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Recent Feedback
        </Typography>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4 }}>
          <List>
            {["Platform is smooth and responsive.", "Escrow system works perfectly.", "Need more categories for artisans."].map((feedback, i) => (
              <ListItem key={i}>
                <ListItemAvatar>
                  <Avatar>
                    <FeedbackIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={feedback} secondary={`Feedback ID: ${1000 + i}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      <Box mt={6}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Admin Quick Actions
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6">Send Global Message</Typography>
                <TextField fullWidth label="Message" multiline rows={3} sx={{ mt: 2 }} />
                <Button sx={{ mt: 2 }} variant="contained" color="primary">
                  Send
                </Button>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 3, borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6">Update Platform Settings</Typography>
                <TextField fullWidth label="Commission Rate (%)" defaultValue={5} type="number" sx={{ mt: 2 }} />
                <TextField
                  fullWidth
                  select
                  label="Default Currency"
                  value="USD"
                  sx={{ mt: 2 }}
                >
                  {["USD", "XAF", "EUR"].map((currency) => (
                    <MenuItem key={currency} value={currency}>
                      {currency}
                    </MenuItem>
                  ))}
                </TextField>
                <Button sx={{ mt: 2 }} variant="contained" color="success">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Box mt={6}>
        <Typography variant="h6">Server Load</Typography>
        <LinearProgress variant="determinate" value={65} sx={{ height: 10, borderRadius: 5, mt: 1 }} />
      </Box>

      <Box mt={6} mb={10}>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Platform Reports
        </Typography>
        <Paper elevation={2} sx={{ p: 3, borderRadius: 4 }}>
          <Typography variant="body1" paragraph>
            Gain insights into user growth, financial metrics, system usage trends, and user engagement levels.
          </Typography>
          <Button variant="contained" startIcon={<DownloadIcon />}>Download Report (PDF)</Button>
        </Paper>
      </Box>
    </motion.div>
  );
}

export default AdminDashboard;
