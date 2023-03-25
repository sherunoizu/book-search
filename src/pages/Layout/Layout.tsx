import React from 'react';
import { Outlet } from 'react-router-dom';

import { Container } from '@mui/material';

import { Header } from '../../components';

export const RootLayout: React.FC = () => (
  <Container
    sx={{
      maxWidth: '100vw',
      borderRadius: '10px',
      m: '10px auto',
      p: '25px',
      bgcolor: '#4d706c',
      minHeight: '95vh'
    }}
  >
    <Header />
    <Outlet />
  </Container>
);
