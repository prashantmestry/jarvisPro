import React, { useState, useEffect } from 'react';
import { Slider } from 'antd';
import styled from 'styled-components';
import moment from 'moment';

const RangeSlider = styled(Slider)`
   & .ant-slider-rail {
        // height: 6px;
        background-color: ${props => props.theme.currentTheme === 'dark' ? props.theme.color.text : props.theme.color.border};
        // border-radius: 2px;
    }
    .ant-slider-track {
        // height: 6px;
        background-color: ${props => props.theme.color.bg};
        // border-radius: 4px;
    }
    & .ant-slider:hover .ant-slider-track {
        background-color: ${props => props.theme.color.bg};
    }
    .ant-slider-step {
        // height: 6px;
    }
    .ant-slider-dot {
        // top: -3px;
        // width: 12px;
        // height: 12px;
    }
    .ant-slider-handle {
        width: 15px;
        height: 20px;
        margin-top: -7px;
        background-color: beige;
        border: 0;
        border-radius: 0;
        border-radius 2px;
        Xborder-top-right-radius: 2px;
        //box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        box-shadow: 0px 2px 10px #000;
        font-size: 10px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 8px;
        color: ${props => props.theme.color.bg};
        Xpadding-top: 4px;
        Xpadding-left: 1px;
        : after{
            content: "";
            border-top: 8px solid beige;
            border-left: 8px solid transparent;
            border-right: 8px solid transparent;
            width: 18px;
            bottom: -8px;
            position: absolute;
            display:none;
        }
        : before{
            content: "|||";
        }
    }
    .ant-slider-mark {
        position: absolute;
        top: 24px;
        left: 0;
        width: 100%;
        font-size: 14px;
    }
    .ant-slider-mark-text {
        color: ${props => props.theme.color.text} !important;
        font-size:10px;
    }
    .ant-slider-mark-text-active {
        color: rgba(0, 0, 0, 0.65);
        color: ${props => props.theme.color.text};
    }
    
    .lhsDateTip{        
        width:max-content;
        position: relative;
        left: 20px;
    }

    .rhsDateTip{        
        width:max-content;
        position: relative;
        right: 20px;
    }
`
const SliderYearNew = (props) => {

    const minDate = 2000;
    const maxDate = (new Date()).getFullYear() + 5;

    const [yearMarks, setYearMarks] = useState({
        [minDate]: {
            label: <div className='lhsDateTip'><strong>{minDate}</strong></div>
        },
        [maxDate]: {
            style: {
                color: '#ffa23c',
            },
            label: <div className='rhsDateTip'><strong>{maxDate}</strong>
            </div>
        }
    });

    const onAfterChangeHandler = (val) => {
        props.onAfterChange(val);
    }
    
    useEffect(() => {
        console.log('all my props', props);
    }, [])

    return (
        <div className='margin-r-16 margin-l-16'>
            <RangeSlider
                //tipFormatter={(val) => props.allData && props.allData[val] ? props.allData[val].date : val}
                range
                step={1}
                marks={yearMarks}
                min={minDate}
                max={maxDate}
                defaultValue={[minDate, maxDate]}
                onAfterChange={onAfterChangeHandler}
                onChange={props.onChange || null}
            />
        </div>
    )
}

export default SliderYearNew;