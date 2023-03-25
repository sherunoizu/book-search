import React from 'react';

import { Box } from '@mui/material';

import { Link } from 'react-router-dom';

import { HomeIcon } from '../HomeIcon/HomeIcon.component';

export const Header: React.FC = () => (
  <Box marginBottom='25px'>
    <Link to='/'>
      <HomeIcon />
    </Link>
  </Box>
);
