import { Drawer } from 'antd';
import React from 'react';
import styled from 'styled-components';


const CustomDrawer = (props) => {

    const { children, ...otherProps } = props;
    return (
        <StyledDrawer  {...otherProps}
        >
            {children}
        </StyledDrawer>
    )
}

const StyledDrawer = styled(Drawer)`    
    &.ant-drawer-content{
        background : ${props => props.theme.color.bg};
    }
    .ant-drawer-title{
        color : ${props => props.theme.color.text}; 
    }
    .ant-drawer-header{
        background : ${props => props.theme.color.bg2};
        border-bottom:1px solid ${props => props.theme.color.bg2Border};
    }
    .ant-drawer-body{
        padding : 0px 10px 10px 10px !important;
        overflow:hidden;
    }
`;

export default CustomDrawer;