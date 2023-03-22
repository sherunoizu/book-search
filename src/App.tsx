import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";

import BookList from "./components/BookList";
import SearchBar from "./components/SearchBar";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <SearchBar />
      <BookList />
    </Provider>
  );
};

export default App;
