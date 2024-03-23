import * as React from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, mt: 4, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          &copy; {new Date().getFullYear()} AGENT BOOK. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
