import React, { useContext, useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';
import { MyThemeContext } from '../../../Context/MyThemeContext';
import styled from 'styled-components';
import Loading from '../Loading';

const { Option } = Select;

const CompSelect = styled.span`
    .ant-select-selector{
        background : ${props => props.islight ? props.theme.color.bg : props.theme.color.bg2} !important;
        border :1px solid ${props => props.islight ? props.theme.color.bgBorder : props.theme.color.bg2Border} !important;
    }
    .ant-select-arrow{
        color : ${props => props.islight ? props.theme.color.bgBorder : props.theme.color.bg2Border} !important;
    }
    .ant-select{
        color : ${props => props.theme.color.text};        
    }
`;

const SingleSelect = (props) => {

    const { theme } = useContext(MyThemeContext);

    const onSearch = (val) => {
        if (typeof props.onSearch === 'function') {
            props.onSearch(val);
        }
    }

    return (
        <CompSelect {...props}>
            {
                <Select
                    theme={theme}
                    showSearch
                    placeholder={props.title || 'Select Data'}
                    optionFilterProp="children"
                    style={{ width: '250px', ...props.style }}
                    //labelInValue
                    onChange={(val) => props.onChange(val)}
                    onSearch={onSearch || null}
                >
                    {props.children}
                </Select>
            }
        </CompSelect >
    )
}

export default SingleSelect;