import React, { useContext } from 'react';
import { ParentContext } from '../context/ParentContext';
import NavBarMenu from './NavBarMenu';

export const NavGeneral = () => {
    const { parent } = useContext(ParentContext);

    return (
        <div>
          {parent && <NavBarMenu />}  
        </div>
    )
}
