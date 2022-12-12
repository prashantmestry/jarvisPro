import React from 'react';
import { DatePicker } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../../redux/actions';
import styled from 'styled-components';

const SpecificDateSelect = (props) => {

    const dateFormat = 'DD-MM-YYYY';

    const companyInfo = useSelector(state => {
        return state.company.companyInfo
    });

    const dispatch = useDispatch();

    const onChange = (date, dateString) => {
        if (dateString) {
            if ((companyInfo.specificDate || []).find(val => val === dateString)) {
                alert(`Date ${dateString} is already selected`);
            } else {
                dispatch(actions.updateCompanyInfo({
                    ...companyInfo,
                    specificDate: companyInfo.specificDate ? [...companyInfo.specificDate, dateString] : [dateString]
                }));
            }
        }
    }

    const removeDate = (dt) => {
        dispatch(actions.updateCompanyInfo({
            ...companyInfo,
            specificDate: companyInfo.specificDate.filter(dtVal => dtVal !== dt)
        }));
    }

    return (
        <SingleBox>
            <DatePicker
                style={{ width: '180px' }}
                onChange={onChange} format={dateFormat} />
            {
                (companyInfo.specificDate && companyInfo.specificDate.length > 0) &&
                <div className='flexa dateList'>
                    {
                        companyInfo.specificDate.map(val => {
                            return (
                                <div className='singleDate'>
                                    <span>{val} </span>
                                    <span className='cross' onClick={() => removeDate(val)}>X</span> </div>
                            )
                        })
                    }
                </div>
            }
        </SingleBox>
    )
}

const SingleBox = styled.div`        
    .dateList{
        border : 1px solid #214683;        
        margin-top:8px;        
        display:grid;
        grid-auto-columns: max-content;
        grid-auto-flow: column;
        grid-gap:2px;        
    }
    .singleDate{
        background : #02204e;
        padding:2px 10px;
        margin:5px;        
        width: 130px;
        max-width: 130px;
        display:flex;
        justify-content:space-between;
        .cross{
            cursor:pointer;
        }
    }
`

export default SpecificDateSelect;