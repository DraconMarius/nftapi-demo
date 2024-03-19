import React, { useState, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

import logo from '../assets/alchemylogo.png';

import { Pane, Button, Dialog, Autocomplete, TextInputField } from 'evergreen-ui';

import { updateAPIKey, deleteKey } from '../util/idb';


function Nav({ apikey }) {
    //dialog state
    // console.log(apikey)
    const [isShown, setIsShown] = useState(false)
    //API Key State, from db

    const [newKey, setnewKey] = useState(``);

    // console.log(keyRef.current)

    const handleChange = async (newKey) => {
        await updateAPIKey(newKey);
        console.log("currentkey", apikey)
        console.log("newKey", newKey)
    }

    // updateAPIKey("testing")


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
                    {/* if api key exists, show setting, if not show setup */}
                    {apikey ? (
                        <>
                            <Button marginRight={16}>Search</Button>
                            <Button appearance='primary' onClick={() => setIsShown(true)}>Setting</Button>
                        </>
                    ) : (
                        <Button appearance='primary' onClick={() => setIsShown(true)}>API Key Setup</Button>
                    )}
                    {/* Setting pop up */}
                    <Pane>
                        <Dialog
                            isShown={isShown}
                            title="API Key Setting"
                            onCloseComplete={() => {
                                // newKey ? handleChange(newKey) : alert("no new key")

                                setIsShown(false)
                            }}
                            confirmLabel="Update API Key"
                            hasFooter={false}

                        >
                            {({ close }) => (

                                <Pane>
                                    <TextInputField
                                        label="Please input your API Key here"
                                        alignItems='center'
                                        required
                                        description="you can get a free key @ Alchemy.com"
                                        placeholder={apikey}
                                        onChange={e => {
                                            setnewKey(e.target.value)
                                            // (console.log(e.target.value))
                                        }
                                        }
                                    />
                                    <Pane display="flex" justifyContent="flex-end" marginTop="8px">
                                        <Button
                                            marginBottom='8px'
                                            // alignItems='center'
                                            position='BOTTOM_RIGHT'
                                            appearance="primary"
                                            onClick={() => {
                                                if (newKey) {
                                                    handleChange(newKey);
                                                    setnewKey('');
                                                } else {
                                                    alert("no new key");
                                                }
                                                close()
                                            }}>

                                            Update Key
                                        </Button>
                                    </Pane>
                                </Pane>
                            )}
                        </Dialog>
                    </Pane>
                </Pane >
            </Pane >

        </>
    );
}

export default Nav;