import React, { createContext, useState } from 'react';

const key = 'Parent_key';
export const ParentContext = createContext();
export const UsuarioProvider = (props) => {
    const parentStorage = JSON.parse(localStorage.getItem(key));
    const [parent, setParent] = useState(parentStorage);

    return(
        <ParentContext.Provider value={{parent, setParent}}>
            {props.children}
        </ParentContext.Provider>
    )
}