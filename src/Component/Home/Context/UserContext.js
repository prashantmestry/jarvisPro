import React, { createContext, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {

    const [name, setName] = useState('prashant');

    return (<UserContext.Provider
        value={{
            name: 'prashant'
        }}
    >
        {props.childrens}
    </UserContext.Provider>
    )

}
export default UserContextProvider;