import React, { useState, useEffect } from 'react';
import { DatePicker, Slider } from 'antd';

import moment from 'moment';

const { RangePicker } = DatePicker;

const DatePickersRange = (props) => {

    const dateFormat = 'DD-MM-YYYY';

    const onYearChange = (date, str) => {
        console.log('year change', date, str);
    }

    return (
        <div className='flex'>
            <div className='mar-r-5' style={{ border: '1px solid #001528', padding: '5px' }}>
                <DatePicker format={dateFormat} picker="week" onChange={onYearChange} style={{ marginRight: '5px' }} />
                <DatePicker format={dateFormat} picker="week" onChange={onYearChange} />
            </div>
        </div>
    )
}


export default DatePickersRange;