import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Book } from "../store/types";
import BookItem from "./BookItem";

const BookList: React.FC = () => {
  const books = useSelector<RootState, Book[]>((state) => state.books.books);

  const isLoading = useSelector<RootState, boolean>(
    (state) => state.books.isLoading
  );

  const error = useSelector<RootState, string | null>(
    (state) => state.books.error
  );

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} book={book} />
      ))}

      {isLoading ? <div>Loading...</div> : ""}
      {error ? <div>{error}</div> : ""}
    </div>
  );
};

export default BookList;
