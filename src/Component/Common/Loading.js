import React from 'react';
import { LoadingOutlined } from '@ant-design/icons'
import styled from 'styled-components';

let CustomeLoader = styled.div`
    width : 50px;
    height :50px;
    border-radius:100%;
    border: 5px solid ${props => props.theme.color.text};    
    border-top-color: transparent;
    animation : spin 1s infinite;
    margin-left: 10px;    
`

const Loading = ({ text }) => {

    return (
        <span>
            <LoadingOutlined /> {text || ''}
            {/* <CustomeLoader /> */}
        </span>
    )
}

export default Loading;