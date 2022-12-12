import React, { createContext } from 'react';

export const MyHomeContext = createContext();

const MyHomeContextProvider = (props) => {

    console.log('props' , props);

    return (<MyHomeContext.Provider
        value={{
            userName: 'prashant'
        }}
    >
        {
            props.children
        }
    </MyHomeContext.Provider>
    )
}

export default MyHomeContextProvider;