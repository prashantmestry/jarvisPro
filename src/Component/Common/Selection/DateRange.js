import React, { useState, useEffect } from 'react';
import { DatePicker, Slider } from 'antd';
import { checkPropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import * as actions from '../../../redux/actions';

const DateRange = (props) => {

    // const [localIonRange, setLocalIonRange] = useState({ start: 0, end: 0 });

    // const handleSliderChange = (val) => {
    //     console.log('slider change', val);
    // }
    // const handleAfterChange = (e) => {
    //     console.log('after change', e);
    // }

    const dateFormat = 'DD-MM-YYYY';
    const dispatch = useDispatch();

    const companyInfo = useSelector(state => state.company.companyInfo);

    const onStartDateChange = (date, dateString) => {
        dispatch(actions.updateCompanyInfo({
            ...companyInfo,
            dateRange:[ date , companyInfo.dateRange[1]]            
        }));
    }

    const onEndDateChange = (date, dateString) => {
        dispatch(actions.updateCompanyInfo({
            ...companyInfo,
            endDate: date
        }));
    }

    return (
        // <Slider
        //     tipFormatter={(val) => props.priceData && props.priceData[val] ? props.priceData[val].date : val}
        //     onChange={handleSliderChange}
        //     min={2000}
        //     max={1000}
        //     onAfterChange={handleAfterChange}
        //     range
        //     value={[2000, 2000 + 5]}
        //     defaultValue={[2000, 2000 + 5]}
        //     disabled={false}
        // />
        <div className='flex'>
            <div className='mar-r-5'>
                <DatePicker onChange={onStartDateChange} format={dateFormat} value={moment(companyInfo.startDate)} />
            </div>
            <div>
                <DatePicker onChange={onEndDateChange} format={dateFormat} value={moment(companyInfo.endDate)} />
            </div>
        </div>
    )
}


export default DateRange;