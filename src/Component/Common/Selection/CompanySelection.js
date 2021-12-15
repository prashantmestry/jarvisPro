import React, { useContext, useEffect } from 'react';
import { Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';
import { MyThemeContext } from '../../../Context/MyThemeContext';
import styled from 'styled-components';
import Loading from '../Loading';
import PropTypes from 'prop-types';

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

const CompanySelection = (props) => {

    const { theme } = useContext(MyThemeContext);
    const companyList = useSelector(state => {
        return state.company.companyList;
    });
    const companyListLoading = useSelector(state => {
        return state.company.companyListLoading;
    });

    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getCompanyList());
    }, []);

    const onChange = (val) => {
        props.onChange({
            compId: val.key,
            compName: val.label
        });
    }

    const onSearch = (val) => {
        // if (typeof props.onSearch === 'function') {
        //     props.onSearch(val);
        // }
    }

    return (
        <CompSelect {...props}>
            {
                companyListLoading &&
                <span><Loading /></span>
            }
            {
                <Select
                    theme={theme}
                    showSearch
                    disabled={companyListLoading}
                    placeholder={props.title || 'Select Data'}
                    optionFilterProp="children"
                    style={{ width: '250px', ...props.style }}
                    labelInValue
                    onChange={onChange}
                    onSearch={onSearch}
                >
                    {
                        (companyList && companyList.length > 0) && companyList.map(company => {
                            return (
                                <Option
                                    key={company.companyName}
                                    value={company.companyId}
                                >
                                    {company.companyName}
                                </Option>
                            )
                        })
                    }
                </Select>
            }
        </CompSelect >
    )
}

CompanySelection.propTypes = {    
    islight: PropTypes.bool,
    style: PropTypes.object,
    onChange: PropTypes.func.isRequired
}

export default CompanySelection;