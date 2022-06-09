import React, { useContext, useEffect } from 'react';
import withColorHome from './withColorHome';

const ColorHome = (props) => {

    console.log('props ', props);

    return (
        <div>
            <div> {props.data.company} name is :</div>
            <button style={{ padding: '5px', background: props.color }}>{props.data.buyOrSell}</button>
            {props.list}
        </div>
    )
}

export default withColorHome(ColorHome);