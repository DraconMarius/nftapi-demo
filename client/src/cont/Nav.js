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
    const [id, setId] = useState('')
    const [idOp, setIdOp] = useState(false)
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

    const handleChangeWithId = (type, string, net, id) => {

        resetSearchParams()
        setSearchParams(type, string);
        setSearchParams("network", net);
        setSearchParams("tokenId", id);
    }


    useEffect(() => {
        console.log(searchParams);
    }, [searchParams]);

    // useEffect(() => {
    //     console.log(net);
    //     setSearchParams("network", net)
    // }, [net])

    useEffect(() => {
        console.log(type);
        if (type === "collectionAdd" || type === "contractAdd") {
            setNet('Eth');
            setNetOp(true);
            setIdOp(false)
            if (type === "contractAdd") {
                setIdOp(true);
            }
        } else {
            setNetOp(false);
            setIdOp(false); // Assuming you want to reset this in the else case
            setNet('');
            setId('');
        }
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

                        {idOp ? (
                            <Pane display='flex' alignItems='center' justifyContent="center">

                                <TextInput
                                    placeholder="tokeId"
                                    onChange={e => setId(e.target.value)}
                                />
                            </Pane>) : <></>}

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
                    ) : idOp ? (
                        <Link to="/search" >
                            <Button
                                onClick={() => handleChangeWithId(type, string, net, id)}
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