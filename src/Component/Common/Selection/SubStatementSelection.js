import React, { useEffect } from 'react';
import { Radio } from 'antd';
import styled from 'styled-components';
import { companySubStatementList } from '../../../Utils/GlobalData';
import PropTypes from 'prop-types';

const SpanDiv = styled.span`    
    .ant-radio-button-wrapper{
        background : ${props => props.theme.color.bg};
        border:1px solid ${props => props.theme.color.bgBorder};
        color : ${props => props.theme.color.text};
        font-weight:normal;
        text-transform: uppercase;
        font-size:12px;
    }    
    .ant-radio-button-wrapper:not(:first-child)::before{
        background : ${props => props.theme.color.bgBorder};
    }
    
    .ant-radio-group-solid .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled){
        background: ${props => props.theme.color.bg};
        border-color: ${props => props.theme.color.active};
        color : ${props => props.theme.color.text};
    }    
    .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled)::before{
        border-color: ${props => props.theme.color.bgBorder};
        background: ${props => props.theme.color.active};
    }
`;

const SubStatementSelection = (props) => {

    // if (props.default_value !== 'one') {
    //     throw new Error('Not a proper name');
    // }

    return (
        <SpanDiv>
            <Radio.Group defaultValue={props.default_value} buttonStyle="solid">
                {
                    companySubStatementList.map(stmt => {
                        return (
                            <Radio.Button
                                key={stmt.stmtId}
                                value={stmt.stmtId}>
                                {stmt.shortName}
                            </Radio.Button>
                        )
                    })
                }
            </Radio.Group>
        </SpanDiv>
    )
}

SubStatementSelection.propTypes = {
    default_value: PropTypes.string.isRequired
}

export default SubStatementSelection;