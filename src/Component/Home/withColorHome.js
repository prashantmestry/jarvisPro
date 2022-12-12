import React, { useState } from 'react';

const withColorHome = (WrapComp) => {

    const NewComponent = (props) => {

        const color = 'red';
        const [visible, setVisible] = useState(false);


        const listData = (
            <div onClick={() => setVisible(!visible)}>
                <span>{visible ? 'yes' : 'No'}</span>
            </div>
        )

        return (
            <WrapComp
                {...props}
                color={color}
                list={listData}
            />
        )
    }

    return NewComponent;
}

export default withColorHome;