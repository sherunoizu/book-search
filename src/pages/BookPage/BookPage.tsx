import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Grid, Typography, Box } from '@mui/material';
import { Button } from '@mui/joy';

import { RootState } from '../../store/store';
import { Book } from '../../store/types';
import { useAppDispatch } from '../../hooks';
import { fetchSingleBook } from '../../store/bookSlice';

export const BookPage: React.FC = () => {
  const { id } = useParams();

  const singleBook = useSelector<RootState, Book>((state) => state.books.singleBook);

  const isLoading = useSelector<RootState, boolean>((state) => state.books.isLoading);

  const error = useSelector<RootState, string | null>((state) => state.books.error);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBook(id));
    }
  }, []);

  return (
    <>
      {isLoading ? 'loading' : ''}
      {error ? (
        <Button variant='soft' color='danger' disabled>
          {error}
        </Button>
      ) : (
        <Grid container>
          <Grid item lg={2}>
            {isLoading ? (
              <Button loading={isLoading} variant='soft' />
            ) : (
              <Box component='img' src={singleBook.thumbnail} alt={singleBook.title} />
            )}
          </Grid>

          <Grid item lg={10}>
            <Typography variant='body1' fontWeight='bold' fontSize={16}>
              {singleBook.title}
            </Typography>
            <Typography variant='body1' fontSize={12}>
              Авторы: {singleBook.authors?.join(', ')}
            </Typography>
            <Typography variant='body1' fontSize={12}>
              Категория: {singleBook.categories}
            </Typography>
            <Typography variant='body1' fontSize={12}>
              Описание: {singleBook.description}
            </Typography>
          </Grid>
        </Grid>
      )}
    </>
  );
};
