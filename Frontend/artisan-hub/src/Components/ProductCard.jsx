import React from 'react'
import { motion } from 'framer-motion';
import {
    Button, Container, Typography, Grid, Box, Card, CardMedia, CardContent, CardActions,
    IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import COLORS from '../Theme/Color';

const ProductCard = ({ title, price }) => {
    return (
        <Card>
            <CardMedia sx={{ height: 140, backgroundColor: '#eee' }}>
                {/* Insert product image */}
            </CardMedia>
            <CardContent>
                <Typography color={COLORS.text}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">${price}</Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    sx={{ color: COLORS.text, '&:hover': { color: COLORS.hover } }}
                    onClick={() => console.log(`Added ${title} to cart`)}
                >
                    Add to Cart
                </Button>
                <IconButton
                    sx={{ color: COLORS.text, '&:hover': { color: COLORS.hover } }}
                    onClick={() => console.log(`Liked ${title}`)}
                >
                    <FavoriteBorderIcon />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default ProductCard