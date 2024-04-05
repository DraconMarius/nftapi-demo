import './App.css';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
//db get
import { getAPIKey, initdb, resetDB } from './util/idb';
//components import
import Nav from './cont/Nav';
import Search from './cont/Search'
//evergreen import
import { Pane, Button } from 'evergreen-ui';

import { SearchProvider } from './cont/searchContex'


function App() {


  return (
    <Pane>
      <SearchProvider>
        <Router>
          <Nav></Nav>
          {/* react router to handle change of page */}
          <Routes>
            <Route exact path="/" element={<Navigate replace to="/search" />} />
            <Route exact path="/search" element={<Search />} />
            {/* <Route exact path="/readme" element={<ReadMe />} /> */}
          </Routes>

        </Router>
      </SearchProvider>
      {/* <Footer /> */}
    </Pane >
  );
}

export default App;
