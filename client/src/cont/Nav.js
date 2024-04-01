import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/alchemylogo.png';

import { useSearch } from './searchContex'

import {
    Pane,
    Select,
    SearchInput,
    TextInput,
    SearchIcon,
    Button,
    Overlay,
    Spinner,
    Position,
    Paragraph,
    Group,
    IconButton
} from 'evergreen-ui';

import { updateAPIKey, deleteKey } from '../util/idb';



function Nav() {
    //dialog state
    // console.log(apikey)
    const [type, setType] = useState('walletAdd')
    const [string, setString] = useState('')
    const [net, setNet] = useState('Eth')
    const [NetOp, setNetOp] = useState(false)
    const { searchParams, setSearchParams, resetSearchParams } = useSearch();


    const handleChange = (type, string) => {
        // Update based on type and input
        setNet('')
        resetSearchParams()
        setSearchParams(type, string);
    }

    const handleChangeWithNet = (type, string, net) => {
        resetSearchParams()
        setSearchParams(type, string);
        setSearchParams("network", net);
    }


    useEffect(() => {
        console.log(searchParams);
    }, [searchParams]);


    useEffect(() => {
        console.log(type);
        (type === "collectionAdd" || type === "contractAdd") ?
            setNetOp(true) : setNetOp(false)

    }, [type]);


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
                <Pane display='flex' alignItems='center' justifyContent="center" >
                    <>
                        <Select value={type} onChange={e => setType(e.target.value)}>
                            <option value="walletAdd">Wallet</option>
                            <option value="contractAdd">NFTContract</option>
                            <option value="collectionAdd">Collection</option>
                        </Select>

                        {NetOp ? (<Select value={net} onChange={e => setNet(e.target.value)}>
                            <option value="Eth">Ethereum</option>
                            <option value="Polygon">Polygon</option>
                            <option value="Arbitrum">Arbitrum</option>
                            <option value="Optimism">Optimism</option>
                        </Select>) : <></>}

                        <Pane display='flex' alignItems='center' justifyContent="center">

                            <TextInput
                                placeholder="Search..."
                                onChange={e => setString(e.target.value)}
                            />
                        </Pane>
                    </>
                    {!NetOp ? (
                        <Link to="/search" >
                            <Button
                                onClick={() => handleChange(type, string)}
                                color="inherit">
                                <SearchIcon />
                            </Button>
                        </Link>
                    ) : <Link to="/search" >
                        <Button
                            onClick={() => handleChangeWithNet(type, string, net)}
                            color="inherit">
                            <SearchIcon />
                        </Button>
                    </Link>}
                </Pane >
            </Pane >

        </>
    );
}

export default Nav;