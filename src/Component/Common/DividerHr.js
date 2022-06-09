import React, { useContext } from 'react';
import styled from 'styled-components'
import { MyThemeContext } from '../../Context/MyThemeContext';

const DividerHr = (props) => {

    const { theme } = useContext(MyThemeContext);

    return (
        <Divider theme={theme}></Divider>
    )
}


const Divider = styled.hr`
    border-top :1px solid ${props => props.theme.color.bg2Border};    
    margin-top:15px;
    margin-bottom:5px;
`;

export default DividerHr;