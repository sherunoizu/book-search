import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Book, BooksState, BookAPIResponse } from './types';

const initialState: BooksState = {
  books: [],
  totalFindItems: 0,
  isLoading: false,
  error: null,
  selectedCategory: '',
  selectedOrder: 'relevance',
  paginationStep: 30,
  startIndex: 0,
  singleBook: {
    id: '',
    title: '',
    authors: [],
    description: '',
    thumbnail: '',
    categories: ''
  }
};

const API_KEY = process.env.REACT_APP_API_KEY;

let totalFindItems = 0;

export const fetchBooks = createAsyncThunk<Book[], string, { rejectValue: string }>(
  'books/fetchBooks',
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = (await response.json()) as BookAPIResponse;

      if (data.totalItems && data.items.length) {
        totalFindItems = data.totalItems;

        return data.items?.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          description: item.volumeInfo.description,
          thumbnail: item.volumeInfo.imageLinks?.thumbnail,
          categories: item.volumeInfo.categories
        }));
      }

      throw new Error(`Can't find this book`);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSingleBook = createAsyncThunk<Book, string, { rejectValue: string }>(
  'books/fetchSingleBook',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      return {
        id: data.id,
        title: data.volumeInfo?.title,
        authors: data.volumeInfo?.authors,
        description: data.volumeInfo?.description,
        thumbnail: data.volumeInfo?.imageLinks?.thumbnail,
        categories: data.volumeInfo?.categories
      };
    } catch (error: any) {
      return rejectWithValue(error.message as string);
    }
  }
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    changeOrderBy: (state, action) => {
      state.selectedOrder = action.payload;
    },
    changeStartIndex: (state, action) => {
      state.startIndex = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.totalFindItems = totalFindItems;
        if (state.startIndex > 0) {
          state.books = [...state.books, ...action.payload];
        } else {
          state.books = action.payload;
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Something went wrong.';
      })
      .addCase(fetchSingleBook.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSingleBook.fulfilled, (state, action) => {
        state.isLoading = false;
        state.singleBook = action.payload;
      })
      .addCase(fetchSingleBook.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Something went wrong.';
      });
  }
});

export default booksSlice.reducer;
export const { changeCategory, changeOrderBy, changeStartIndex } = booksSlice.actions;
