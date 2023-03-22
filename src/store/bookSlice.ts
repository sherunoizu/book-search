import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Book, BooksState, BookAPIResponse, BookAPIItem } from "./types";

const initialState: BooksState = {
  books: [],
  isLoading: false,
  error: null,
};

const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchBooks = createAsyncThunk<
  Book[],
  string,
  { rejectValue: string }
>("books/fetchBooks", async (query, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as BookAPIResponse;
    console.log(data);
    if (data.totalItems) {
      return data.items.map((item: any) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors,
        description: item.volumeInfo.description,
        thumbnail: item.volumeInfo.imageLinks?.thumbnail,
      }));
    } else {
      throw new Error(`Can't find "${query}" book`);
    }
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Something went wrong.";
      });
  },
});

export default booksSlice.reducer;
