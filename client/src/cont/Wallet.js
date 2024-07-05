import React from 'react';

import Tabs from '../comp/Tabs'


function Wallet({ apiRes, type}) {



    return (

            <Tabs apiRes={apiRes} type={type} />

    )
}

export default Wallet;