import React, { useState, useEffect, useContext } from 'react';
import { Slider, message } from 'antd';
import styled from 'styled-components';

const SliderYear = (props) => {
    const [min, setMin] = useState(props.min);
    const [max, setMax] = useState(props.max);
    const [marks, setMarks] = useState();
    const [defaultSet, setDefaultSet] = useState([props.min, props.max]);
    const [minDisplay, setMinDisplay] = useState(props.min);

    useEffect(() => {
        setMin(props.min);
        setMax(props.max);

        setMarks({
            [props.min]: {
                style: { color: '#096dd9' },
                label: <strong>{props.min}</strong>
            },
            [props.max]: {
                style: { color: '#096dd9' },
                label: <strong>{props.max}</strong>
            },
        });

    }, [props.min, props.max]);

    //
    let onChangeHandler = (value) => {

        if (value[0] >= min && value[1] <= max) {
            setMarks({
                [min]: {
                    style: { color: '#096dd9' },
                    label: <strong>{min}</strong>
                },
                [value[0]]: {
                    style: { color: '#181d1f' },
                    label: value[0]
                },
                [value[1]]: {
                    style: { color: '#181d1f' },
                    label: value[1]
                },
                [max]: {
                    style: { color: '#096dd9' },
                    label: <strong>{max}</strong>
                }
            });
        }
        props.onYearSliderChange(value[0], value[1]);
    };

    return (
        <>
            <RangeSlider
                min={min}
                max={max}
                range
                onAfterChange={onChangeHandler}
                marks={marks}
                defaultValue={defaultSet}
            />
        </>
    );
};

export default SliderYear;


const RangeSlider = styled(Slider)`
   & .ant-slider-rail {        
        background-color: #f5f5f5;    
        height:2px;
    }
    .ant-slider-track {        
        background-color: red;
        height:2px;
    }
    & .ant-slider:hover .ant-slider-track {
        background-color: green;
        height:2px;
    }    
    .ant-slider-handle {
        width: 15px;
        height: 20px;
        margin-top: -8px;
        background-color: beige;
        border: 0;
        border-radius: 0;
        border-radius : 2px;        
        box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
        font-size: 10px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 8px;
        color: #000;
        padding-left: 1px;        
        : before{
            content: "||";
            color : #000;
        }
    }
    .ant-slider-mark {
        position: absolute;
        top: -22px;
        left: 0;
        width: 100%;
        font-size: 12px;
        .ant-slider-mark-text{
            :first-child
            {
                margin-top:40px;
                left : 1% !important
            }
            :last-child{
                margin-top:40px;
                left : 99% !important
            }
        }
    }
    .ant-slider-mark-text-active {
        color: rgba(0, 0, 0, 0.65);
        color: #000;
    }    
`
