import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ width: '100%', backgroundColor: '#f8f8f8', py: 4 }}>
      {/* Inner container centers content and caps max width */}
      <Box
        sx={{
          maxWidth: '1200px',
          mx: 'auto',  // margin left and right auto for centering
          px: 2,       // horizontal padding
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 4,
        }}
      >
        {/* Left: About */}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" sx={{ color: '#4E3B31', fontWeight: 'bold', mb: 1 }}>
            About ArtisanHub
          </Typography>
          <Typography variant="body2" sx={{ color: '#4E3B31' }}>
            ArtisanHub connects Artisans, Craft people, and Makers with customers who appreciate handmade goods. Features include escrow payments, AI-powered image search, and sales tracking for a seamless experience.
          </Typography>
        </Box>

        {/* Right: Links and Social */}
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            gap: 3,
            mt: { xs: 3, md: 0 },
          }}
        >
          {/* Quick Links */}
          <Box>
            <Typography variant="h6" sx={{ color: '#4E3B31', fontWeight: 'bold', mb: 1 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Home', 'About', 'Shop', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase()}`}
                  underline="hover"
                  sx={{ color: '#4E3B31', cursor: 'pointer' }}
                >
                  {item}
                </Link>
              ))}
            </Box>
          </Box>

          {/* Social Media */}
          <Box>
            <Typography variant="h6" sx={{ color: '#4E3B31', fontWeight: 'bold', mb: 1 }}>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="https://www.facebook.com" target="_blank" rel="noopener" sx={{ color: '#4E3B31' }}>
                <FacebookIcon />
              </Link>
              <Link href="https://www.twitter.com" target="_blank" rel="noopener" sx={{ color: '#4E3B31' }}>
                <TwitterIcon />
              </Link>
              <Link href="https://www.instagram.com" target="_blank" rel="noopener" sx={{ color: '#4E3B31' }}>
                <InstagramIcon />
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
