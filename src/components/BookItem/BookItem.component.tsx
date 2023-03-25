import React from 'react';
import { Link } from 'react-router-dom';

import { Paper, Typography, Box } from '@mui/material';

import { BookItemProps } from './BookItem.types';

export const BookItem: React.FC<BookItemProps> = ({ book }) => (
  <Paper
    elevation={3}
    sx={{
      minHeight: { md: '250px', xs: '250px' },
      minWidth: { lg: '150px', md: '200px', sm: '220px' },
      maxHeight: { md: '250px', xs: '250px' },
      maxWidth: { lg: '150px', md: '200px', sm: '220px' },
      marginTop: '12px',
      padding: { md: '10px 20px', xs: '5px' },
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-around',
      gap: 2,
      bgcolor: '#7e9a88'
    }}
  >
    <Link to={`/book/${book.id}`}>
      <Box component='img' height='150px' width='100px' src={book.thumbnail} alt={book.title} />
    </Link>
    <Box>
      <Typography variant='body1' fontWeight='bold' fontSize={11}>
        {book.title?.length > 40 ? `${book.title.slice(0, 40)}...` : book.title}
      </Typography>
      <Typography variant='body1' fontSize={11}>
        Авторы: {book.authors?.join(', ')}
      </Typography>
      <Typography variant='body1' fontSize={11}>
        Категория: {book.categories}
      </Typography>
    </Box>
  </Paper>
);
