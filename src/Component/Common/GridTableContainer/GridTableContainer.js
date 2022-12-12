import React from 'react';
import styled from 'styled-components';

const ContainerDiv = styled.div`
    width:100%;
    height:400px;

    .ag-theme-alpine {
        .ag-header{
            background : ${props => props.theme.color.bg2}
        }
        .ag-row{
            background : ${props => props.theme.color.bg2};
            color : ${props => props.theme.color.text};
            border-bottom : 1px solid ${props => props.theme.color.bg2Border};
        }    
        .ag-row-odd {
            background : ${props => props.theme.color.bg};
        }    
        .ag-header-icon , .ag-header-row{
            color : ${props => props.theme.color.text};
        }   
        .ag-theme-alpine .ag-ltr .ag-cell{
            Xborder-right : 1px solid ${props => props.theme.color.bg2Border};
            border-right : 1px solid red !important;
        }    
        .ag-root-wrapper{
            border : 1px solid ${props => props.theme.color.bg2Border};
        }
    }            
`;

const GridTableContainer = (props) => {
    return (
        <ContainerDiv>
            <div
                className="ag-theme-alpine"
                style={{
                    height: '400px',
                    width: '100%',
                    margin: '0 auto'
                }}
            >
                {props.children}
            </div>
        </ContainerDiv>
    )
}

export default GridTableContainer;