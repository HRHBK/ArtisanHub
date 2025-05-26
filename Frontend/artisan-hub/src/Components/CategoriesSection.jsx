import React from 'react'
import { motion } from 'framer-motion';
import {
    Button, Container, Typography, Grid, Box, Card, CardMedia, CardContent, CardActions,
    IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import COLORS from '../Theme/Color';

const CategoriesSection = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Typography variant="h5" color={COLORS.text} gutterBottom>Shop by categories</Typography>
            <Grid container spacing={4}>
                {['Dining Chair', 'Sofas', 'Table'].map((cat, i) => (
                    <Grid item xs={12} sm={4} key={i}>
                        <Card>
                            <Box sx={{ height: 150, backgroundColor: '#ddd' }}>
                                {/* Insert category image */}
                            </Box>
                            <CardContent>
                                <Typography align="center" color={COLORS.text}>{cat}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}

export default CategoriesSection