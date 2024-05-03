import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//components import
import Nav from './cont/Nav';
import Search from './cont/Search'
import Footer from './cont/Footer'
//evergreen import
import { Pane } from 'evergreen-ui';

import { SearchProvider } from './cont/searchContex'

import { TourProvider } from '@reactour/tour'

function App() {



  const steps = [
    {
      selector: '.first-step',
      content: "To use this NFT API Demo is easy! If you have a wallet extension installed, you can click the `+` icon to connect your personal wallet! If you do not see a `+` icon, don't fret! Hit -> :)",
    },
    {
      selector: '.sec-step',
      content: 'Otherwise please select the type of address you wish to query'
    },
    {
      selector: '.third-step',
      content: 'then provide any additional required information and hit the search button to your right!',
    },
    {
      selector: '.fourth-step',
      content: 'Afterward, you can then toggle different view or and select individual NFT for a more detailed view...',
    }
  ]
  return (
    <TourProvider steps={steps} >
      <Pane>
        <SearchProvider>
          <Router>
            <Nav></Nav>
            {/* react router to handle change of page */}
            <Pane className="fourth-step">
              <Routes>
                <Route exact path="/" element={<Navigate replace to="/search" />} />
                <Route exact path="/search" element={<Search />} />
                {/* <Route exact path="/readme" element={<ReadMe />} /> */}
              </Routes>
            </Pane>

          </Router>
        </SearchProvider>
        <Footer />
      </Pane >
    </TourProvider>
  );
}

export default App;
