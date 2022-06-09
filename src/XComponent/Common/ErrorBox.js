import React from 'react';
import { FrownOutlined } from '@ant-design/icons';

const ErrorBox = ({ text }) => {
    return (
        <div>
            <FrownOutlined /> {text || 'Loading...'}
        </div>
    )
}

export default ErrorBox;