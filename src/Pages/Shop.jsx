import React from 'react';
import { Box, Typography, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar, Collapse } from '@mui/material';
import { red } from '@mui/material/colors';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const productData = [
  {
    img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
    title: 'Handmade Pottery',
    author: '@potteryguru',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Handwoven Basket',
    author: '@basketweaver',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Wooden Crafts',
    author: '@woodworker',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154360-1c1c1c1c1c1c',
    title: 'Handmade Jewelry',
    author: '@jewelrymaker',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154360-1c1c1c1c1c1c',
    title: 'Knitted Scarf',
    author: '@knitter',
  },
  {
    img: 'https://images.unsplash.com/photo-1600585154360-1c1c1c1c1c1c',
    title: 'Handmade Candles',
    author: '@candlemaker',
  },
];

const ExpandMore = ({ expand, onClick }) => (
  <IconButton
    onClick={onClick}
    aria-expanded={expand}
    aria-label="show more"
    sx={{
      marginLeft: 'auto',
      transition: 'transform 0.2s ease',
      transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
  >
    <ExpandMoreIcon />
  </IconButton>
);

const Shop = () => {
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          position: 'relative',
          backgroundImage: 'url(/path/to/your/hero-image.jpg)', // Replace with actual image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: { xs: '50vh', md: '70vh' },
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          color: '#4E3B31',
          px: { xs: 3, md: 10 },
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '3rem', md: '4.5rem' } }}>
          Artisan Art
        </Typography>
      </Box>

      {/* Products display */}
      <Box sx={{ mx: 'auto', my: 4, maxWidth: '1200px', px: 2 }}>
        <Typography variant="h6" sx={{ color: '#4E3B31', fontWeight: 'bold', mb: 2 }}>
          Our Products
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          {productData.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </Box>
      </Box>

      <Footer />
    </div>
  );
};

const ProductCard = ({ product }) => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {product.author.charAt(1)} {/* Display first letter of author */}
          </Avatar>
        }
        title={product.title}
        subheader={product.author}
      />
      <CardMedia
        component="img"
        height="194"
        image={product.img}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This is a brief description of the product. It can include details about the craftsmanship and materials used.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to cart">
            <AddShoppingCartIcon />
        </IconButton>
        <IconButton aria-label="purchase">
            <ShoppingCartCheckoutIcon />
        </IconButton>
        <ExpandMore expand={expanded} onClick={handleExpandClick}>
            <ExpandMoreIcon />
        </ExpandMore>
        </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Here you can add more details about the product, such as how it was made or its unique features.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Shop;
