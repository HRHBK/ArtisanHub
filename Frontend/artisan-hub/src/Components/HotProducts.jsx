import React from 'react'
import { motion } from 'framer-motion';
import {
    Button, Container, Typography, Grid, Box, Card, CardMedia, CardContent, CardActions,
    IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import COLORS from '../Theme/Color';
import ProductCard from './ProductCard';

const HotProducts = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h5" color={COLORS.text} gutterBottom>Hot Products</Typography>
            <Grid container spacing={4}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <Grid item xs={12} sm={6} md={3} key={i}>
                        <ProductCard title={`Product ${i + 1}`} price={(i + 1) * 25} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default HotProducts