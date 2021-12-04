import React, { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { multiplyPercent } from '../../Utils/globalFunctions';

const EquityDetail = (props) => {

    const [data, setData] = useState([]);

    useEffect(() => {
        if (props.equity_average) {
            setData(props.equity_average.reverse());
        } else {
            setData([]);
        }

    }, [props]);

    return (
        <List>
            <h3>{props.title}</h3>
            <ul>
                {
                    data && data.map((v, index) => {
                        return (
                            <li key={index}>
                                <div>{v.yr}</div>
                                <div>
                                    {
                                        props.display_format == '%' ? multiplyPercent(v.eqty) : v.eqty
                                    }
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </List>
    )
}

let List = styled.div`    
    border : 1px solid #dbdbdb;
    border-radius : 10px;
    padding:5px;
    overflow-y:hidden;
    height:100%;
    background: #fff;
    min-width:200px;
    h3{
        text-align:left;        
        padding:10px;
        border-bottom : 1px solid #000;
        font-size:16px;
        font-weight:600;
    }
    ul{                
        max-height : 330px;        
        overflow-y : auto;  
        list-style : none;
        padding:0;  
        li{
            display : flex;
            justify-content : space-between;
            border-bottom : 1px solid #dbdbdb;
            padding: 10px; 
            font-weight : 500;            
            :last-child{
                border-bottom:none;
            }           
        }
    }    
`;

export default memo(EquityDetail);