import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { DatePicker, Slider } from 'antd';

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
const dateFormat = 'DD/MM/YYYY';

const YearDateRange = (props) => {

    const [sliderDateRange, setSliderDateRange] = useState(5);

    const dateFormatBackend = 'YYYY-MM-DD hh:mm:ss';

    function onDateRangeChange(val) {
        if (val[0] && val[1]) {
            props.setDateRange([val[0].format(dateFormatBackend), val[1].format(dateFormatBackend)]);
        }
    }

    function onSliderRangeChange(val) {
        setSliderDateRange(val);
    }

    const futureYear = (new Date()).getFullYear() + 5;

    const [rangeMarks, setRangeMarks] = useState({
        2000: { label: <span>FY2000</span> },
        [sliderDateRange[0]]: sliderDateRange[0],
        [sliderDateRange[1]]: sliderDateRange[1],
        [futureYear]: { label: <span>FY{futureYear}</span> }
    });

    return (
        <div>
            <div className="flex align-center" style={{ padding: "10px 10px 0px 10px" }}>
                <StyledRangeSlider
                    marks={rangeMarks}
                    range
                    onChange={onSliderRangeChange}
                    onAfterChange={(val) => onDateRangeChange(val)}
                    //value={sliderDateRange}    
                    value={[(new Date()).getFullYear(), ((new Date()).getFullYear())]}
                    min={2000}
                    max={(new Date()).getFullYear() + 5} />
            </div>
        </div>
    )
}

export default YearDateRange;