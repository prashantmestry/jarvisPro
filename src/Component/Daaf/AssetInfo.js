import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import InfoList from './InfoList';

const AssetInfo = (props) => {

    const [attribute, setAttribute] = useState(null);

    useEffect(() => {
        setAttribute(props.asset_attribute);
    }, [props.asset_attribute]);

    return (
        <>
            <Info>
                <ul className='item_1'>
                    {
                        attribute && attribute.map((v, index) => {
                            return (
                                <InfoList key={index}
                                    data={{
                                        ...v,
                                        fmt: props.display_format
                                    }}
                                />
                            )
                        })
                    }
                </ul>
                <ul className='item_2' >
                    <MomentDiv>
                        <h3>Current Momentum</h3>
                        <div style={{ fontWeight: '500', fontSize: '30px' }}>Positive</div>
                    </MomentDiv>

                </ul>
            </Info>          
        </>
    )
}


let Info = styled.div`
    display:grid;
    grid-template-column : auto 200px;
    border-radius:10px;
    grid-gap:10px;
    background : #dbdbdb;
    padding:10px;
    ul{
        list-style :none;
        padding:0;
        margin:0;
    }

    .item_1{
        grid-column-start : 1;
        grid-column-end : 3;
        overflow : auto;
        display :flex;        
    }
    .item_2{
        grid-column-start : 3;
        grid-column-end : 4;
        display: flex;
        place-items :  center;
        text-align: center;
    }
`;

let MomentDiv = styled.div`
    padding : 33px;        
    border : 1px solid #000;
    border-radius:10px;    
    font-size : 18px;
    h3{
        font-size: 14px;
        text-transform : uppercase;
        color : #000;
    }
`;

export default AssetInfo;