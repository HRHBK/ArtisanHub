import React, { useState } from 'react';
import {Box, Card, CardContent, TextField, Button, Typography, Checkbox,FormControlLabel, Link,Tab,
    Tabs, Alert, InputAdornment, IconButton, Divider, Grid} from '@mui/material';
import {Visibility, VisibilityOff, Email, Lock, Person, Store, Palette } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AuthPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  // Theme colors
  const theme = {
    background: '#ffffff',
    primary: '#8B4513', // Chocolate brown
    secondary: '#F5F5DC', // Soft beige
    hover: '#654321', // Darker brown
    error: '#d32f2f',
    success: '#2e7d32'
  };

  // Login validation schema
  const loginValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
  });

  // Sign up validation schema
  const signupValidationSchema = Yup.object({
    firstName: Yup.string()
      .required('First name is required'),
    lastName: Yup.string()
      .required('Last name is required'),
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    businessName: Yup.string()
      .required('Business name is required'),
    craftType: Yup.string()
      .required('Craft type is required')
  });

  // Password reset validation schema
  const resetValidationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email format')
      .required('Email is required')
  });

  // Login form
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false
    },
    validationSchema: loginValidationSchema,
    onSubmit: (values) => {
      console.log('Login submitted:', values);
      // Handle login logic here
      alert('Login functionality would be implemented here');
    }
  });

  // Sign up form
  const signupFormik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      businessName: '',
      craftType: ''
    },
    validationSchema: signupValidationSchema,
    onSubmit: (values) => {
      console.log('Signup submitted:', values);
      // Handle signup logic here
      alert('Sign up functionality would be implemented here');
    }
  });

  // Password reset form
  const resetFormik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: resetValidationSchema,
    onSubmit: (values) => {
      console.log('Password reset requested for:', values.email);
      setResetEmailSent(true);
      setTimeout(() => setResetEmailSent(false), 5000);
    }
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    // Reset forms when switching tabs
    loginFormik.resetForm();
    signupFormik.resetForm();
    resetFormik.resetForm();
    setResetEmailSent(false);
  };

  const CustomButton = ({ children, variant = 'contained', ...props }) => (
    <Button
      {...props}
      variant={variant}
      sx={{
        backgroundColor: variant === 'contained' ? theme.secondary : 'transparent',
        color: variant === 'contained' ? theme.primary : theme.primary,
        border: variant === 'outlined' ? `1px solid ${theme.primary}` : 'none',
        '&:hover': {
          backgroundColor: variant === 'contained' ? theme.hover : `${theme.secondary}30`,
          color: variant === 'contained' ? 'white' : theme.hover,
        },
        fontWeight: 600,
        textTransform: 'none',
        borderRadius: 2,
        py: 1.5,
        ...props.sx
      }}
    >
      {children}
    </Button>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Card
        elevation={8}
        sx={{
          maxWidth: 500,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(139, 69, 19, 0.1)'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box textAlign="center" mb={3}>
            <Box display="flex" alignItems="center" justifyContent="center" mb={2}>
              <Palette sx={{ fontSize: 40, color: theme.primary, mr: 1 }} />
              <Typography
                variant="h4"
                sx={{
                  color: theme.primary,
                  fontWeight: 'bold',
                  fontFamily: 'serif'
                }}
              >
                ArtisanHub
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{ color: theme.primary, opacity: 0.8 }}
            >
              Connect with artisans and discover handmade treasures
            </Typography>
          </Box>

          {/* Tabs */}
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            centered
            sx={{
              mb: 3,
              '& .MuiTab-root': {
                color: theme.primary,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '1rem'
              },
              '& .Mui-selected': {
                color: `${theme.hover} !important`
              },
              '& .MuiTabs-indicator': {
                backgroundColor: theme.hover
              }
            }}
          >
            <Tab label="Login" />
            <Tab label="Sign Up" />
            <Tab label="Reset Password" />
          </Tabs>

          {/* Login Form */}
          {tabValue === 0 && (
            <Box component="form" onSubmit={loginFormik.handleSubmit}>
              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={loginFormik.values.email}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                error={loginFormik.touched.email && Boolean(loginFormik.errors.email)}
                helperText={loginFormik.touched.email && loginFormik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={loginFormik.values.password}
                onChange={loginFormik.handleChange}
                onBlur={loginFormik.handleBlur}
                error={loginFormik.touched.password && Boolean(loginFormik.errors.password)}
                helperText={loginFormik.touched.password && loginFormik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={loginFormik.values.rememberMe}
                    onChange={loginFormik.handleChange}
                    sx={{
                      color: theme.primary,
                      '&.Mui-checked': {
                        color: theme.primary,
                      },
                    }}
                  />
                }
                label="Remember Me"
                sx={{ mb: 2, color: theme.primary }}
              />

              <CustomButton
                type="submit"
                fullWidth
                size="large"
                sx={{ mb: 2 }}
              >
                Sign In
              </CustomButton>

              <Box textAlign="center">
                <Link
                  component="button"
                  type="button"
                  onClick={() => setTabValue(2)}
                  sx={{
                    color: theme.primary,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                      color: theme.hover
                    }
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>
            </Box>
          )}

          {/* Sign Up Form */}
          {tabValue === 1 && (
            <Box component="form" onSubmit={signupFormik.handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="firstName"
                    label="First Name"
                    value={signupFormik.values.firstName}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    error={signupFormik.touched.firstName && Boolean(signupFormik.errors.firstName)}
                    helperText={signupFormik.touched.firstName && signupFormik.errors.firstName}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person sx={{ color: theme.primary }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    value={signupFormik.values.lastName}
                    onChange={signupFormik.handleChange}
                    onBlur={signupFormik.handleBlur}
                    error={signupFormik.touched.lastName && Boolean(signupFormik.errors.lastName)}
                    helperText={signupFormik.touched.lastName && signupFormik.errors.lastName}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                name="email"
                label="Email"
                type="email"
                value={signupFormik.values.email}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.email && Boolean(signupFormik.errors.email)}
                helperText={signupFormik.touched.email && signupFormik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mt: 2, mb: 2 }}
              />

              <TextField
                fullWidth
                name="businessName"
                label="Business Name"
                value={signupFormik.values.businessName}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.businessName && Boolean(signupFormik.errors.businessName)}
                helperText={signupFormik.touched.businessName && signupFormik.errors.businessName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Store sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="craftType"
                label="Craft Type (e.g., Pottery, Jewelry, Woodworking)"
                value={signupFormik.values.craftType}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.craftType && Boolean(signupFormik.errors.craftType)}
                helperText={signupFormik.touched.craftType && signupFormik.errors.craftType}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Palette sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={signupFormik.values.password}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.password && Boolean(signupFormik.errors.password)}
                helperText={signupFormik.touched.password && signupFormik.errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                value={signupFormik.values.confirmPassword}
                onChange={signupFormik.handleChange}
                onBlur={signupFormik.handleBlur}
                error={signupFormik.touched.confirmPassword && Boolean(signupFormik.errors.confirmPassword)}
                helperText={signupFormik.touched.confirmPassword && signupFormik.errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: theme.primary }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <CustomButton
                type="submit"
                fullWidth
                size="large"
              >
                Create Artisan Account
              </CustomButton>
            </Box>
          )}

          {/* Password Reset Form */}
          {tabValue === 2 && (
            <Box>
              <Typography
                variant="body1"
                sx={{ color: theme.primary, mb: 3, textAlign: 'center' }}
              >
                Enter your email address and we'll send you a link to reset your password.
              </Typography>

              {resetEmailSent && (
                <Alert
                  severity="success"
                  sx={{ mb: 2 }}
                >
                  Password reset link has been sent to your email!
                </Alert>
              )}

              <Box component="form" onSubmit={resetFormik.handleSubmit}>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  type="email"
                  value={resetFormik.values.email}
                  onChange={resetFormik.handleChange}
                  onBlur={resetFormik.handleBlur}
                  error={resetFormik.touched.email && Boolean(resetFormik.errors.email)}
                  helperText={resetFormik.touched.email && resetFormik.errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Email sx={{ color: theme.primary }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ mb: 3 }}
                />

                <CustomButton
                  type="submit"
                  fullWidth
                  size="large"
                  sx={{ mb: 2 }}
                >
                  Send Reset Link
                </CustomButton>

                <Box textAlign="center">
                  <Link
                    component="button"
                    type="button"
                    onClick={() => setTabValue(0)}
                    sx={{
                      color: theme.primary,
                      textDecoration: 'none',
                      '&:hover': {
                        textDecoration: 'underline',
                        color: theme.hover
                      }
                    }}
                  >
                    Back to Login
                  </Link>
                </Box>
              </Box>
            </Box>
          )}

          {/* Footer */}
          <Divider sx={{ my: 3 }} />
          <Typography
            variant="body2"
            textAlign="center"
            sx={{ color: theme.primary, opacity: 0.7 }}
          >
            By joining ArtisanHub, you agree to support handmade craftsmanship and connect with talented makers worldwide.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AuthPage;