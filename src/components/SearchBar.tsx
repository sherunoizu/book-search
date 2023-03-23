import React, { useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/hook";
import { useSelector } from "react-redux";
import {
  fetchBooks,
  changeCategory,
  changeOrderBy,
  changeStartIndex,
} from "../store/bookSlice";
import { RootState } from "../store/store";

const SearchBar: React.FC = () => {
  const [input, setInput] = useState<string>("");

  const category = useSelector<RootState, string>(
    (state) => state.books.selectedCategory
  );
  const orderBy = useSelector<RootState, string>(
    (state) => state.books.selectedOrder
  );
  const startIndex = useSelector<RootState, number>(
    (state) => state.books.startIndex
  );
  const paginationStep = useSelector<RootState, number>(
    (state) => state.books.paginationStep
  );

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

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(changeCategory(event.target.value));
  };

  const handleOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(changeOrderBy(event.target.value));
  };

  const handleLoadMore = () => {
    dispatch(changeStartIndex(startIndex + 30));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Search</button>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="Art">Art</option>
            <option value="Biography">Biography</option>
            <option value="Computers">Computers</option>
            <option value="History">History</option>
            <option value="Medical">Medical</option>
            <option value="Poetry">Poetry</option>
          </select>
        </div>
        <div>
          <label htmlFor="orderBy">OrderBy:</label>
          <select
            id="orderBy"
            name="orderBy"
            value={orderBy}
            onChange={handleOrderByChange}
          >
            <option value="relevance">Relevance</option>
            <option value="newest">Newest</option>
          </select>
        </div>
      </form>
      <div>
        {startIndex ? (
          <button onClick={handleLoadMore}>Load more</button>
        ) : null}
      </div>
      <div>
        <p>Start index: {startIndex}</p>
      </div>
    </>
  );
};

export default SearchBar;
