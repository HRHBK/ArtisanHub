import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import {
  Box,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';

const itemData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },

];

const productData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
   {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Breakfast',
    author: '@bkristastucchio',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },

];

const ImageCard = ({ img, title, author }) => (
  <Box
    sx={{
      width: 280,
      borderRadius: 2,
      boxShadow: 3,
      overflow: 'hidden',
      position: 'relative',
      backgroundColor: 'background.paper',
      cursor: 'pointer',
      '&:hover .info-overlay': {
        opacity: 1,
      },
      transition: 'transform 0.2s ease',
      '&:hover': { transform: 'scale(1.03)' },
    }}
  >
    <Box
      component="img"
      src={`${img}?w=280&fit=crop&auto=format`}
      alt={title}
      loading="lazy"
      sx={{ width: '100%', height: 180, objectFit: 'cover', display: 'block' }}
    />
    <Box
      className="info-overlay"
      sx={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        bgcolor: 'rgba(0,0,0,0.6)',
        color: 'white',
        py: 1,
        px: 2,
        opacity: 0,
        transition: 'opacity 0.3s ease',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
        <Typography variant="body2">{author}</Typography>
      </Box>
    </Box>
  </Box>
);

const Home = () => {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url(/path/to/your/hero-image.jpg)', // Replace with actual image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '50vh', md: '100vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          color: '#4E3B31',
          px: { xs: 3, md: 10 },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            zIndex: 1,
          }}
        />
        <Box sx={{ position: 'relative', maxWidth: 600, zIndex: 2 }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 'medium' }}>
            Artisan Art
          </Typography>
          <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '3rem', md: '4.5rem' } }}>
            New Collection
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, fontSize: { xs: '1rem', md: '1.25rem' } }}>
            Explore the finest handmade pieces by talented artisans. Discover unique creations that inspire and bring beauty to your life.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#4E3B31', 
              color: 'white', 
              px: 4, 
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#3e2f27',
              }
            }}
          >
            Shop Now
          </Button>
        </Box>
      </Box>

      {/* About */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
          my: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
         <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#4E3B31', fontWeight: 'bold', mb: 1 }}>
                    About ArtisanHub
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#4E3B31' }}>
                    ArtisanHub connects Artisans, Craft people, and Makers with customers who appreciate handmade goods. Features include escrow payments, AI-powered image search, and sales tracking for a seamless experience.
                  </Typography>
                </Box>

        {itemData.map((item, index) => (
          <ImageCard key={index} img={item.img} title={item.title} author={item.author} />
        ))}
      </Box>

         {/* products */}
         <Box sx={{ mx: 'auto' }}>
                   <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ color: '#4E3B31', fontWeight: 'bold', mb: 1, mx: {md:12 ,sx: 5} }}>
                    Our Products
                  </Typography>
                </Box>
        <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',
          px: 2,
          my: 4,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
          justifyContent: 'center',
        }}
      >
        {productData.map((product, index) => (
          <ImageCard key={index} img={product.img} title={product.title} author={product.author} />
        ))}
      </Box>

         </Box>
    

      <Footer />
    </div>
  );
};

export default Home;
