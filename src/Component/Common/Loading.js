import React from 'react';
import { LoadingOutlined } from '@ant-design/icons'

const Loading = ({ text }) => {

    return (
        <div>
            <LoadingOutlined /> {text || 'Loading...'}
        </div>
    )

}

export default Loading;