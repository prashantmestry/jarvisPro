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
    span{        
        margin-right:10px;        
        padding:5px;
        background : gray;
        border : 1px solid #000;
        width : 27px;
        height : 27px;
        border-radius:15px;
        font-weight :500;
        font-size:8px;     
        display : flex;
        justify-content : center;
        align-items:center;
        cursor : pointer;
    }
    span.active{
        border : 1px solid #000;
    }
`;

export default YearLink;
