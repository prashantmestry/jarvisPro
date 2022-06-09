import React, { useContext } from 'react';
import styled from 'styled-components';
import { MyThemeContext } from '../../Context/MyThemeContext';

const Section = styled.section`
    ${props => !props.noborder ? `border: 1px solid ${props.theme.color.bg2}` : ``}; 
    background:  ${props => !props.nobg ? `${props.theme.color.bg2}` : `none`}; 
    padding:10px;
    ${props => `${props.style}`}
`

const PageSection = (props) => {

    const { theme } = useContext(MyThemeContext);
    return (
        <Section theme={theme} {...props}>
            {props.children}
        </Section>
    )
}

export default PageSection;