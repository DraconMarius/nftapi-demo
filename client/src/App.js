import './App.css';
import React from 'react';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//components import
import Nav from './cont/Nav';
import Search from './cont/Search'
//evergreen import
import { Pane } from 'evergreen-ui';

import { SearchProvider } from './cont/searchContex'

import { TourProvider } from '@reactour/tour'

function App() {



  const steps = [
    {
      selector: '.first-step',
      content: 'To use this NFT API Demo is easy! First please select the type of address you wish to query',
      stepInteraction: true
    },
    {
      selector: '.sec-step',
      content: 'Then provide any additional required information and hit the search button to your right!',
    },
    {
      selector: '.third-step',
      content: 'After you can You can then click thru and select individual NFT for a more detailed view...',
    }
  ]
  return (
    <TourProvider steps={steps} >
      <Pane>
        <SearchProvider>
          <Router>
            <Nav></Nav>
            {/* react router to handle change of page */}
            <Pane className="third-step">
              <Routes>
                <Route exact path="/" element={<Navigate replace to="/search" />} />
                <Route exact path="/search" element={<Search />} />
                {/* <Route exact path="/readme" element={<ReadMe />} /> */}
              </Routes>
            </Pane>

          </Router>
        </SearchProvider>
        {/* <Footer /> */}
      </Pane >
    </TourProvider>
  );
}

export default App;
