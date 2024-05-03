import React, { useState, useEffect } from 'react';

import { useSearch } from '../cont/searchContex';

import {
    Pane,
    Card,
    Button,
    Icon,
    SideSheet,
    Spinner,
    Alert,
    Heading,
    Paragraph,
    SymbolCrossIcon,
    Position,
} from 'evergreen-ui';

// import { web3 } from 'web3'
// we are now using EIP-6963 to detect multiple wallet
//https://eips.ethereum.org/EIPS/eip-6963#announce-and-request-events

function Connect() {
    const { updateSearchParams } = useSearch()
    const [address, setAddress] = useState();
    const [selectedProv, setSelectedProv] = useState([])
    const [walletDisp, setWalletDisp] = useState(false);
    const [btnDisp, setBtnDisp] = useState(false)
    const [providers, setProviders] = useState([]);

    //connection to get EIP-6963 Provider
    useEffect(() => {

        const handleProviderAnnouncement = (event) => {
            const providerDetails = event.detail;
            setProviders(prevProviders => [...prevProviders, providerDetails]);
            // console.log(providerDetails)
        };

        // Listen for wallet providerAnnouncement from above,
        window.addEventListener('eip6963:announceProvider', handleProviderAnnouncement);

        // get provider info
        window.dispatchEvent(new Event('eip6963:requestProvider'));

        // no need to continuously listen
        return () => {
            window.removeEventListener('eip6963:announceProvider', handleProviderAnnouncement);
        };
    }, []); // <-- run only when mounted

    const handleConnect = async (providerDetail) => {

        try {
            const accounts = await providerDetail.provider.request({
                method: 'eth_requestAccounts'
            });
            setSelectedProv(providerDetail)
            setAddress(accounts);
        } catch (err) {
            console.error("error connecting to wallet provider", err)
        }
        setWalletDisp(false)
    }
    useEffect(() => {
        // console.log(address)
        updateSearchParams({
            collectionAdd: '',
            contractAdd: '',
            walletAdd: address,
            network: "Eth",
            spam: true,
            tokenId: '',
            pageKey: '',
            prevKeys: [],
            currentKey: ''
        })
    }, [address])

    useEffect(() => {
        // console.log(providers)
        // console.log(providers.length)
        if (!providers[0]) {
            setBtnDisp(false)
        } else {
            setBtnDisp(true)
        }

    }, [providers])




    return (
        <Pane>
            {btnDisp ?
                <SymbolCrossIcon cursor="pointer" position={Position.BOTTOM_RIGHT} onClick={() => setWalletDisp(true)} />
                : <></>}

            <SideSheet isShown={walletDisp}
                onCloseComplete={() => { setWalletDisp(false) }}
                containerProps={{
                    display: 'flex',
                    flex: '1',
                    flexShrink: '1',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center",
                    backgroundColor: 'rgba(249, 250, 252, 0.4)',
                }}>
                <Pane zIndex={1} flexShrink={0} elevation={0} padding={8} >
                    <Heading size={600} padding={8}>
                        Detected Wallet(s)
                    </Heading>
                    {
                        providers.map((wallet, wIndex) => (
                            <Card key={wIndex} display="flex" justifyContent='center' alignItems="center">

                                <Button appearance='minimal' onClick={() => { handleConnect(wallet) }}>
                                    <Pane display="flex" justifyContent="space-between" alignItmes="center">

                                        <img src={wallet.info.icon} width="32px" />
                                        {wallet.info.name}
                                    </Pane>
                                </Button>

                            </Card>
                        ))
                    }
                </Pane>
            </SideSheet>

        </Pane>

    );

}

export default Connect;
