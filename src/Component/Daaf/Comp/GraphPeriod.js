import React, { useState, useContext } from 'react';
import styled from 'styled-components';

const GraphPeriod = ({ onClick, activePeriod }) => {

    const [years] = useState([
        { period: 'daily', display: 'Daily' },
        { period: 'weekly', display: 'Weekly' },
        { period: 'monthly', display: 'Monthly' },
        { period: 'yearly', display: 'Yearly' }
    ]);

    return (
        <GraphPeriodBox>
            {
                years.map((v, index) => {
                    return (
                        <span
                            className={activePeriod == v.period ? 'active' : null}
                            key={index}
                            onClick={() => onClick(v.period)}
                        >
                            {v.display}
                        </span>
                    )
                })
            }
        </GraphPeriodBox>
    )
}

let GraphPeriodBox = styled.div`
    display :flex;
    align-items : center;
    span{            
        border-right : 1px solid #b3b3b3;
        color : #b3b3b3;
        padding : 0 8px;
        text-align : center;
        :hover{
            color : #000;
            cursor : pointer;
        }
        :last-child{
            border-right : none;
        }
    }
    span.active{
        color : #000;
    }
`;

export default GraphPeriod;
