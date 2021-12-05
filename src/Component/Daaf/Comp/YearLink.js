import React, { useState } from 'react';
import styled from 'styled-components';

const YearLink = ({ onClick, activeyear }) => {

    const [years] = useState([
        { year: 1, display: '1Y' },
        { year: 3, display: '3Y' },
        { year: 5, display: '5Y' },
        { year: 10, display: '10Y' },
        { year: 'all', display: 'All' }
    ]);

    return (
        <YearList>
            {
                years.map((v, index) => {
                    return (
                        <span
                            className={activeyear == v.year ? 'active' : null}
                            key={index}
                            onClick={() => onClick(v.year)}
                            id={v.id}>
                            {v.display}
                        </span>
                    )
                })
            }
        </YearList>
    )
}

let YearList = styled.div`
    display : flex;    
    justify-content : center;
    align-items:center;
    text-align:center;
    font-weight :600;
    font-size:10px;
    span{        
        margin-right:10px;        
        padding:5px;        
        border : 1px solid #b3b3b3;
        color : #b3b3b3;
        width : 27px;
        height : 27px;
        border-radius:15px;                     
        display : flex;
        justify-content : center;
        align-items:center;
        cursor : pointer;
        :hover{
            border : 1px solid #000;
            color : #000;    
        }
    }
    span.active{
        border : 1px solid #000;
        color : #000;
    }
`;

export default YearLink;
