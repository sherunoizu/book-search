import React from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/store";
import { Book } from "../../store/types";
import { useAppDispatch } from "../../hooks";
import { changeStartIndex } from "../../store/bookSlice";

import { BookItem } from "../BookItem/BookItem.component";

import { Grid, Box } from "@mui/material";
import { Button } from "@mui/joy";

export const BookList: React.FC = () => {
  const books = useSelector<RootState, Book[]>((state) => state.books.books);

  const dispatch = useAppDispatch();

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.books.isLoading
  );

  const error = useSelector<RootState, string | null>(
    (state) => state.books.error
  );

  const startIndex = useSelector<RootState, number>(
    (state) => state.books.startIndex
  );

  const totalFindItems = useSelector<RootState, number>(
    (state) => state.books.totalFindItems
  );

  const handleLoadMore = () => {
    dispatch(changeStartIndex(startIndex + 30));
  };

  return (
    <>
      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 0 }}
        direction="row"
        justifyContent="center"
      >
        {books.map((book) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={book.id}>
            <BookItem key={book.id} book={book} />
          </Grid>
        ))}
      </Grid>
      <Box paddingTop="15px" display="flex" justifyContent="center">
        {books.length > 0 && totalFindItems > 30 ? (
          <Button
            loading={isLoading}
            variant="soft"
            color="neutral"
            type="submit"
            onClick={handleLoadMore}
          >
            Load more
          </Button>
        ) : null}
      </Box>
      <Box paddingTop="15px" display="flex" justifyContent="center">
        {error ? (
          <Button variant="soft" color="danger" disabled>
            {error}
          </Button>
        ) : (
          ""
        )}
      </Box>
    </>
  );
};
