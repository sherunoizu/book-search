import React, { useState } from "react";
import { useAppDispatch } from "../hooks/hook";
import { fetchBooks } from "../store/bookSlice";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query.trim()) {
      dispatch(fetchBooks(query));
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={query} onChange={handleInputChange} />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
