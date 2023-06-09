import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { store } from '../store/store';

import { MainPage, BookPage, RootLayout } from '../pages';

export const App: React.FC = () => (
  <Provider store={store}>
    <Routes>
      <Route path='/' element={<RootLayout />}>
        <Route index element={<MainPage />} />
        <Route path='/book/:id' element={<BookPage />} />
      </Route>
    </Routes>
  </Provider>
);
