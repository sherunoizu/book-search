import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { SelectChangeEvent, TextField } from '@mui/material';
import { Button, Box } from '@mui/joy';

import { useAppDispatch } from '../../hooks';
import { fetchBooks, changeCategory, changeOrderBy, changeStartIndex } from '../../store/bookSlice';
import { RootState } from '../../store/store';

import { CustomSelect } from '../CustomSelect/CustomSelect.component';

export const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>('');

  const isLoading = useSelector<RootState, boolean>((state) => state.books.isLoading);
  const category = useSelector<RootState, string>((state) => state.books.selectedCategory);
  const orderBy = useSelector<RootState, string>((state) => state.books.selectedOrder);
  const startIndex = useSelector<RootState, number>((state) => state.books.startIndex);
  const paginationStep = useSelector<RootState, number>((state) => state.books.paginationStep);
  const totalFindItems = useSelector<RootState, number>((state) => state.books.totalFindItems);

  const dispatch = useAppDispatch();

  const query = `${input}${
    category ? `+subject:${category}` : ``
  }&orderBy=${orderBy}&startIndex=${startIndex}&maxResults=${paginationStep}`;

  useEffect(() => {
    dispatch(changeStartIndex(0));
  }, [orderBy, category, input]);

  useEffect(() => {
    if (input.trim()) {
      dispatch(fetchBooks(query));
    }
  }, [startIndex]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim()) {
      dispatch(fetchBooks(query));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    dispatch(changeCategory(event.target.value));
  };

  const handleOrderByChange = (event: SelectChangeEvent) => {
    dispatch(changeOrderBy(event.target.value));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display='flex' flexDirection='column' width='100%'>
          <Box display='flex' paddingBottom='20px'>
            <TextField
              type='text'
              value={input}
              onChange={handleInputChange}
              name='search'
              label='Find Book'
              sx={{
                width: '100%'
              }}
            />
            <Button
              loading={isLoading}
              variant='soft'
              color='success'
              type='submit'
              sx={{
                marginLeft: '15px'
              }}
            >
              Search
            </Button>
          </Box>

          <Box display='flex' justifyContent='center'>
            <CustomSelect
              value={category}
              onChange={handleCategoryChange}
              optionValues={['', 'Art', 'Biography', 'Computers', 'History', 'Medical', 'Poetry']}
              labelName='Category'
            />
            <CustomSelect
              value={orderBy}
              onChange={handleOrderByChange}
              optionValues={['Relevance', 'Newest']}
              labelName='OrderBy'
            />
          </Box>
        </Box>
      </form>

      <Box display='flex' justifyContent='center'>
        <p>Found {totalFindItems} results</p>
      </Box>
    </>
  );
};
