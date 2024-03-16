import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useState } from 'react';

import logo from '../assets/alchemylogo.png';

import { Pane, Button } from 'evergreen-ui';


function Nav(db) {


    return (
        <>
            <Pane className="App" display='flex' padding={16} background='tint2' borderRadius={3}>
                <Pane flex={1} alignItems="center" display="flex">
                    <a
                        className="App-link"
                        href="https://www.alchemy.com"
                    >
                        <img src={logo} className="App-logo" alt="logo" />

                    </a>
                </Pane>
                <Pane display='flex' alignItems='center'>
                    <Button marginRight={16}>Search</Button>
                    {db[0] ? (
                        <Button appearance='primary'>Setting</Button>
                    ) : (
                        <Button appearance='primary'>API Key Set Up</Button>
                    )
                    }
                </Pane>
            </Pane>
        </>
    );
}

export default Nav;