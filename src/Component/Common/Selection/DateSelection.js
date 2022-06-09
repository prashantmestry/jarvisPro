import React, { useState, useEffect } from 'react';
import { DatePicker, Slider } from 'antd';
import SliderYear from '../Slider/SliderYear';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../../redux/actions';
import moment from 'moment';

const { RangePicker } = DatePicker;

const StyledRangeSlider = styled(Slider)`
    .ant-slider-mark {
        top: -16px;
    }
    .ant-slider-mark-text-active {
        top: 30px;
        font-weight: 500;
        color: orange;
    }
    .ant-slider-mark-text {
        font-size: 12px;
    }
`

const DateSelection = (props) => {

    const dispatch = useDispatch();
    const companyInfo = useSelector(state => {
        return state.company.companyInfo
    });

   

    const onStartDateChange = (date, str) => {
        dispatch(actions.updateCompanyInfo({
            ...companyInfo,
            startDate: str
        }));
    }

    const onEndDateChange = (date, str) => {
        dispatch(actions.updateCompanyInfo({
            ...companyInfo,
            endDate: str
        }));
    }


    return (
        <div className='flex' style={{ flexDirection: 'column' }}>

            <DateBox className='mar-r-5'>
                <div className='flex'>
                    {
                        [{ id: 'dateRange', title: 'Date Range' }, { id: 'dateSlider', title: 'Slider' }].map(val => {
                            return (
                                <span key={val.id} className={`${val.id === companyInfo.selectDateType ? 'active' : ''} dividerSpan`}
                                    onClick={() => {
                                        dispatch(actions.updateCompanyInfo({
                                            ...companyInfo,
                                            selectDateType: val.id
                                        }));
                                    }}>{val.title}</span>
                            )
                        })
                    }
                </div>
                {
                    companyInfo.selectDateType === 'dateRange' &&
                    <div className='flex'>
                        <div className='mar-b-8'>
                            <div className='txt-500'>From</div>
                            <DatePicker
                                style={{ width: '180px', marginRight: '5px' }}
                                picker={companyInfo.picker || null}
                                onChange={onStartDateChange} />
                        </div>
                        <div className='mar-b-8'>
                            <div className='txt-500'>To</div>
                            <DatePicker
                                style={{ width: '180px' }}
                                picker={companyInfo.picker || null}
                                onChange={onEndDateChange} />
                        </div>
                    </div>
                }
                

            </DateBox>
        </div>
    )
}


const DateBox = styled.div`

    .dividerSpan{        
        cursor:pointer;
        margin-bottom:5px;
        margin-right:10px;
        font-weight:500;
        &:first-child{
            border-right:1px solid #fff;
            padding-right:10px;
        }
    }
    .active{
        color : orange;
    }
`;


export default DateSelection;