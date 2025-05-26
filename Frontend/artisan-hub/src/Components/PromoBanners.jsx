import React from 'react'
import { motion } from 'framer-motion';
import {
    Button, Container, Typography, Grid, Box, Card, CardMedia, CardContent, CardActions,
    IconButton
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import COLORS from '../Theme/Color';



const PromoBanners = () => {
    return (
        <Container sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {['Living Room', 'Dining Room'].map((room, i) => (
                    <Grid item xs={12} md={6} key={i}>
                        <motion.div whileHover={{ scale: 1.02 }}>
                            <Box sx={{ position: 'relative', height: 200, backgroundColor: '#ccc' }}>
                                {/* Insert banner image */}
                                <Box sx={{ position: 'absolute', top: 20, left: 20 }}>
                                    <Typography variant="h6" color={COLORS.text}>{room}</Typography>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 1, backgroundColor: COLORS.accent, color: COLORS.text, '&:hover': { backgroundColor: COLORS.hover, color: COLORS.hoverText } }}
                                    >
                                        Shop now
                                    </Button>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Container>

    )
}

export default PromoBanners