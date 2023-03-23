import React from "react";
import { Book } from "../store/types";

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <div>
      <h3>{book.title}</h3>
      <p>by {book.authors}</p>
      <p>CAT: {book.categories}</p>
      <p>{book.description}</p>
      <img src={book.thumbnail} alt={book.title} />
    </div>
  );
};

export default BookItem;
