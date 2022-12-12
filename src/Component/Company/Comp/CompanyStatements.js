import React, { memo } from 'react';

const CompanyStatements = (props) => {

    return (
        <div>{props.company}

            <button onClick={props.callMe}>Call Me</button>
        </div>
    )
}

export default memo(CompanyStatements);