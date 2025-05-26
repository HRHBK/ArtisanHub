import React from 'react'
import { motion } from 'framer-motion';
import {
    Button, Container, Typography, Grid, Box, Card, CardMedia, CardContent, CardActions,
    IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import COLORS from '../Theme/Color';

const Herosection = () => {
    return (
        <Box sx={{ backgroundColor: COLORS.background, py: 8 }}>
            <Container>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <Typography variant="h4" color={COLORS.text} gutterBottom>New Collection</Typography>
                        <Typography variant="subtitle1" color={COLORS.text}>Davis furniture 2020</Typography>
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                variant="contained"
                                sx={{ mt: 2, backgroundColor: COLORS.accent, color: COLORS.text, '&:hover': { backgroundColor: COLORS.hover, color: COLORS.hoverText } }}
                            >
                                Shop now
                            </Button>
                        </motion.div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {/* Hero image placeholder */}
                        <Box sx={{ height: 300, backgroundColor: '#eee' }}>
                            {/* Insert Hero Image */}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default Herosection