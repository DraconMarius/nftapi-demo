import './App.css';
import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//db get
import { getAPIKey, initdb, resetDB } from './util/idb';
//components import
import Nav from './cont/Nav';
//evergreen import
import { Pane, Button } from 'evergreen-ui';



function App() {

  const [key, setKey] = useState();

  useEffect(() => {
    (async function dbSetup() {
      // await resetDB()
      const db = await getAPIKey()
      let apiKey = db[0]


      console.log("apiKey", apiKey["key"]);
      console.log("db", db);
      setKey(apiKey["key"])
      console.log("current key state", key)
    })();
  }, [key]);

  // console.log("key", key)

  return (
    <Pane>
      <Nav apikey={key}></Nav>
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
