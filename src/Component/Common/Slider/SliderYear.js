import React, { useState, useEffect, useContext } from 'react';
import { Slider } from 'antd';
import styled from 'styled-components';
import { MyThemeContext } from '../../../Context/MyThemeContext';


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
    .ant-slider-rail , .ant-slider-dot{
        background: ${props => props.theme.color.text};
    }
    .ant-slider-track{
        background: ${props => props.theme.color.green};
    }

`

const SliderYear = (props) => {

    const [limitRange, setLimitRange] = useState([(new Date()).getFullYear() - 10, (new Date()).getFullYear() + 10]);
    const [selectedRange, setSelectedRange] = useState([2022, 2025]);
    const { theme } = useContext(MyThemeContext);

    const rangeMarks = {
        [limitRange[0]]: {
            label: <span>FY{limitRange[0]}</span>, style: { color: theme.color.text }
        },
        [selectedRange[0]]: {
            label: <span>FY{selectedRange[0]}</span>, style: { color: theme.color.green }
        },
        [selectedRange[1]]: {
            label: <span>FY{selectedRange[1]}</span>, style: { color: theme.color.green }
        },
        [limitRange[1]]: {
            label: <span>FY{limitRange[1]}</span>, style: { color: theme.color.text }
        },
    }

    function onRangeChange(val) {
        setSelectedRange(val);
    }

    function onAfterRangeChange(val) {
        props.afterDateChange(val);
    }

    useEffect(() => {

        let obj1 = {
            name: 'prashant',
            info: {
                age: 10,
                school: {
                    name: 'shree samarth',
                    limit: 10
                }
            }
        }

        //        let obj2 = Object.assign({}, obj1);

        let obj2 = JSON.parse(JSON.stringify(obj1));

        // console.log('obj1', obj1);

        // obj2.info.school.limit = 545;

        // console.log('obj2', obj2);



    }, []);

    return (
        <div className="flex pad-r-15 pad-t-5 pad-l-15">
            <StyledRangeSlider
                marks={rangeMarks}
                range
                onChange={onRangeChange}
                onAfterChange={onAfterRangeChange}
                defaultValue={selectedRange}
                min={limitRange[0]}
                max={limitRange[1]}
                style={{ width: '100%' }}
            />
        </div>
    )
}

export default SliderYear;