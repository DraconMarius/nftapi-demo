import React from 'react';

import Tabs from '../comp/Tabs'


function Page({ apiRes, type }) {



    return (
        <>
            <Tabs apiRes={apiRes} type={type} />
        </>
    )
}

export default Page;