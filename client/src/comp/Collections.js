import React from 'react';

import Tabs from './Tabs'


function Collections({ apiRes, type }) {



    return (
        <>
            <Tabs apiRes={apiRes} type={type} />
        </>
    )
}

export default Collections;