import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//db get
import { getAPIKey } from './util/idb';
//components import
import Nav from './cont/Nav';
//evergreen import
import { Pane, Button } from 'evergreen-ui';



function App() {

  const db = getAPIKey()

  return (
    <Pane>
      <Nav db={db}></Nav>
      <Pane>

        <Router>
          {/* <PageContainer> */}
          {/* <Nav /> */}
          {/* react router to handle change of page */}
          <Routes>
            {/* <Route exact path="/" element={<HomeContainer />} /> */}
            {/* <Route exact path="/Search" element={<SarchContainer />} /> */}
            {/* <Route exact path="/readme" element={<ReadMe />} /> */}
          </Routes>

        </Router>
      </Pane>
      {/* <Footer /> */}
    </Pane >
  );
}

export default App;
