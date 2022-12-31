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
            background : none;
            color : ${props => props.theme.color.text};
            border-bottom : 1px solid ${props => props.theme.color.bg2Border};
            &:hover{
                background : ${props => props.theme.color.bg2};
            }
        }    
        .ag-row-odd {
            background : none;            
        }    
        .ag-header-icon , .ag-header-row{
            color : ${props => props.theme.color.text};
        }           
        .ag-root-wrapper{
            border : 1px solid ${props => props.theme.color.bg2Border};
        }
    }     
    .ag-center-cols-clipper{
        background : ${props => props.theme.color.bg};
    }       
    .ag-center-cols-container{        
        border : 1px solid ${props => props.theme.color.bg2Border};        
        border-top:none;
        border-left:none;
    }
    .ag-theme-alpine .ag-header{
        border:none;
        border-bottom : 1px solid ${props => props.theme.color.bg2Border};        
    }
    .ag-cell{
        line-height : 30px;
        border-right : 1px solid ${props => props.theme.color.bg2Border} !important;            
    }
    .ag-row{
        background : ${props => props.theme.color.bg};
    }
    .ag-header-cell-resize{
        display:none;
    }
    .ag-header-cell{
        border-right : 1px solid ${props => props.theme.color.bg2Border} !important;
    }
`;

const GridTableContainer = (props) => {

    //console.log('all props', props);
    let { theme, totalRow, isCustomHeight, rowHeight, tableHeight } = props;

    let height = rowHeight ? totalRow : (tableHeight || '400');



    return (
        <ContainerDiv>
            <div
                className={`ag-theme-alpine ${theme}`}
                style={{
                    height: height + 'px',
                    width: '100%',
                    Xmargin: '0 auto'
                }}
            >
                {props.children}
            </div>
        </ContainerDiv>
    )
}

export default GridTableContainer;