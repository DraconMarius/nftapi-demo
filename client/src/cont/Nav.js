import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/alchemylogo.png';

import { useSearch } from './searchContex'
import Connect from '../comp/Connect';

import {
    Pane,
    Select,
    TextInput,
    SearchIcon,
    Button,
    InfoSignIcon,
    Position,
    IconButton,
    MenuIcon,
    SideSheet,
    Paragraph
} from 'evergreen-ui';

import { useTour } from '@reactour/tour'




function Nav() {
    //dialog state
    // console.log(apikey)
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [type, setType] = useState('walletAdd')
    const [string, setString] = useState('')
    const [net, setNet] = useState('Eth')
    const [NetOp, setNetOp] = useState(false)
    const [id, setId] = useState('')
    const [idOp, setIdOp] = useState(false)
    const { searchParams, updateSearchParams } = useSearch();
    const { setIsOpen } = useTour()

    const blankState = {
        network: '',
        walletAdd: '',
        collectionAdd: '',
        contractAdd: '',
        tokenId: '',
        pageKey: '',
        prevKeys: [],
        currentKey: '',
        back: {}
    }
    const handleChange = (type, string) => {
        // Update based on type and input
        setNet('')
        const search = {
            ...blankState,
            [type]: string,
            spam: true,
            isNew: true
        }

        updateSearchParams(search);
    }

    const handleChangeWithNet = (type, string, net) => {
        const search = {
            ...blankState,
            [type]: string,
            "network": net,
            isNew: true
        }
        updateSearchParams(search);
    }

    const handleChangeWithId = (type, string, net, id) => {
        const search = {
            ...blankState,
            [type]: string,
            "network": net,
            "tokenId": id,
            isNew: true
        }
        updateSearchParams(search);
    }

    const handleSearch = () => {
        if (!NetOp) {
            handleChange(type, string);
        } else if (idOp) {
            handleChangeWithId(type, string, net, id);
        } else {
            handleChangeWithNet(type, string, net);
        }

        setIsMenuOpen(false)
    };


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
        <Pane className="App" display='flex' padding={16} background='tint2' borderRadius={3}>
            <Pane flex={1} alignItems="center" display="flex">
                <a className="App-link" href="https://www.alchemy.com">
                    <img src={logo} className="App-logo" alt="logo" />
                </a>
            </Pane>
            <Pane alignItems='center' justifyContent="center" className="desktop-only" >
                <Select className="sec-step" value={type} onChange={e => setType(e.target.value)}>
                    <option value="walletAdd">Wallet</option>
                    <option value="contractAdd">NFTContract</option>
                    <option value="collectionAdd">Collection</option>
                </Select>
                {NetOp && (
                    <Select value={net} onChange={e => setNet(e.target.value)}>
                        <option value="Eth">Ethereum</option>
                        <option value="Polygon">Polygon</option>
                        <option value="Arbitrum">Arbitrum</option>
                        <option value="Optimism">Optimism</option>
                        <option value="Base">Base</option>
                    </Select>
                )}
                {idOp && (
                    <TextInput
                        placeholder="tokenId"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                )}
                <TextInput
                    className="third-step"
                    placeholder={searchParams.walletAdd || "Search..."}
                    value={string}
                    onChange={e => setString(e.target.value)}
                />
                <Button onClick={() => handleSearch()} marginLeft={8}>
                    <SearchIcon />
                </Button>
            </Pane>
            <Pane className="mobile-menu-icon">
                <IconButton icon={MenuIcon} onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </Pane>
            <Pane className="first-step" paddingLeft={8}>
                <InfoSignIcon cursor="pointer" color="blue" onClick={() => setIsOpen(true)} />
                <Connect />
            </Pane>
            <SideSheet containerProps={{ backgroundColor: 'rgba(249, 250, 252, 0.4)' }} isShown={isMenuOpen} position={Position.BOTTOM} onCloseComplete={() => setIsMenuOpen(false)}  >
                <Pane padding={32} display="flex" flexDirection="column" justifyConten="center" alignItem="center"   >
                    <Select
                        paddingTop={8}
                        paddingBottom={8}
                        value={type} onChange={e => setType(e.target.value)}>
                        <option value="walletAdd">Wallet</option>
                        <option value="contractAdd">NFTContract</option>
                        <option value="collectionAdd">Collection</option>
                    </Select>
                    {NetOp && (
                        <Select
                            paddingBottom={8}
                            value={net} onChange={e => setNet(e.target.value)}>
                            <option value="Eth">Ethereum</option>
                            <option value="Polygon">Polygon</option>
                            <option value="Arbitrum">Arbitrum</option>
                            <option value="Optimism">Optimism</option>
                            <option value="Base">Base</option>
                        </Select>
                    )}
                    {idOp && (
                        <TextInput
                            width="100%"
                            placeholder="Token Id"
                            value={id}
                            onChange={e => setId(e.target.value)}
                        />
                    )}
                    <TextInput
                        width="100%"
                        placeholder={searchParams.walletAdd || "Search..."}
                        value={string}
                        onChange={e => setString(e.target.value)}
                    />
                    <Button onClick={() => handleSearch()} marginTop={16}>
                        <SearchIcon />
                    </Button>
                </Pane>
            </SideSheet>
        </Pane >


    );
}

export default Nav;