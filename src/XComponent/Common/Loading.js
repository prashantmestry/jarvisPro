import React from 'react';
import { LoadingOutlined } from '@ant-design/icons'

const Loading = ({ text }) => {

    return (
        <span>
            <LoadingOutlined /> {text || ''}
        </span>
    )

}

export default Loading;