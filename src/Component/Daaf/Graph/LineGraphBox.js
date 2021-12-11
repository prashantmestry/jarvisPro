import React, { useContext, useState, useEffect, memo } from 'react';
import moment from 'moment';
import YearLink from '../Comp/YearLink';
import GraphPeriod from '../Comp/GraphPeriod';
import styled from 'styled-components';
import SliderYear from '../Comp/SliderYear';
import { roundNumber } from '../../../Utils/globalFunctions';
import { Drawer, Tooltip } from 'antd';
import { TableOutlined, CameraOutlined } from '@ant-design/icons';
import JustTable from '../Comp/JustTable';
import withLineGraph from '../Hoc/withLineGraph';
import faker from 'faker';

import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Legend);

function getColor(index) {
    let colors = [
        { color: 'rgba(51,204,102)', bgColor: 'rgba(51,204,102,0.1)' },
        { color: 'rgba(255,99,132,1)', bgColor: 'rgba(255,99,132,0.1)' },
        { color: 'rgb(255, 162, 60)', bgColor: 'rgba(255, 162, 60, 0.1)' },
    ]
    return colors[index];
}

const LineGraphBox = (props) => {

    const [yearEnd, setyearEnd] = useState(5);
    const [frequency, setFrequency] = useState('weekly');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState((new Date()).getFullYear());
    const [minDate, setMinDate] = useState(null);
    const [data, setData] = useState(null);
    const [filterGraphData, setFilterGraphData] = useState(props.info);
    const [showDrawer, setShowDrawer] = useState(false);


    const LineOptions = {
        tooltips: {
            mode: 'index',
            position: 'average',
            intersect: false,
            callbacks: {
                title: function (tooltipItem, data) {
                    return moment(tooltipItem[0].xLabel, 'YYYY-MM-DD').format('DD-MM-YYYY')
                },
                label: function (tooltipItem, data) {
                    return data.datasets[tooltipItem.datasetIndex].label + " : " + tooltipItem.yLabel + props.display_format;
                }
            }
        },
        elements: {
            point: {
                pointStyle: 'circle',
                backgroundColor: 'rgba(200, 200, 100, 0.1)',
                borderColor: '#fff'
            }
        },
        animation: {
            duration: 800,
            //easing : 'easeInQuint'
            // onProgress: function (animation) {
            //     progress.value = animation.animationObject.currentStep / animation.animationObject.numSteps;
            // }
        },
        layout: {
            Xpadding: { left: 10, right: 15, top: 0, bottom: 10 }
        },
        title: {
            display: false,
            text: props.title,
        },
        legend: { display: true, position: 'top' },
        maintainAspectRatio: false,
        responsive: true,
        hover: { mode: 'index', intersect: false },
        scales: {
            xAxes: [
                {
                    scaleLabel: {
                        display: false,
                        fontSize: 13,
                        labelString: "Time series data in Year"
                    },
                    gridLines: {
                        display: false,
                        color: '#041821',
                        borderDash: [20, 0]
                    },
                    type: 'time',
                    time: { parser: 'YYYY-MM-DD' },
                }
            ],
            yAxes: [
                {
                    scaleLabel: {
                        display: false,
                        fontSize: 13,
                        labelString: "Percentage"
                    },
                    gridLines: {
                        display: true,
                        color: '#f4f4f4'
                    },
                    ticks: {
                        callback: function (value, index, values) {
                            return value + '%';
                        }
                    }
                }
            ]
        },
        plugins: {
            datalabels: {
                listeners: {
                    click: function (context) {
                        // console.log('click ', context);
                    }
                },
                display: function (context) {
                    //return context.dataset.data[context.dataIndex].flag ? true : false;
                    return true;
                },
                clamp: true,
                anchor: "center",
                color: "#27fdf5",
                align: "end",
                offset: 15,
                borderRadius: 10,
                cursor: 'pointer',
                font: { weight: "bold" },
                borderWidth: 2,
                borderColor: '#27fdf5',
                backgroundColor: 'red',
                formatter: function (value, context) {
                    return value && value.flag ? 'R' : null
                }
            }
        }
    }

    function makeGraphData(graph_data) {
        let attribute = Object.keys(graph_data[0]).filter(v => v != 'dt');
        let data_list = [];
        attribute.forEach((v, index) => {
            data_list[v] = {
                label: props.replaceTitle[v] || v,
                borderColor: getColor(index).color,
                backgroundColor: getColor(index).bgColor,
                borderWidth: 1,
                lineTension: 0.5,
                pointRadius: 0,
                data: [],
                fill: true
            }
        });
        graph_data.forEach((v) => {
            let dd = moment(v.dt, "YYYY-MM-DD").format("YYYY-MM-DD");
            attribute.forEach(v1 => {
                data_list[v1].data.push(
                    {
                        x: dd,
                        y: props.display_format == '%' ? (v[v1] * 100).toString().substr(0, 5) : roundNumber(v[v1])
                    })
            })
        });
        let temp_datasets = [];
        attribute.forEach(v => {
            temp_datasets.push(data_list[v]);
        });
        let all = { datasets: temp_datasets };
        setData(all);
    }


    const onYearClick = (value) => {
        setyearEnd(value);
        if (value != 'all') {
            let sDate = props.info[props.info.length - 1].dt.substr(0, 4) - value;
            let eDate = props.info[props.info.length - 1].dt.substr(0, 4);
            setMinDate(sDate);
            let temp_data = dateCalculationData(sDate, eDate);
            makeGraphData(temp_data);
        } else {
            let temp_data = dateCalculationData('', '');
            setMinDate(parseInt(props.info[0].dt.substr(0, 4)));
            makeGraphData(temp_data);
        }
    }

    function dateCalculationData(sDate, eDate) {
        if (sDate && eDate) {
            let data = props.info.filter(v => v.dt.substr(0, 4) >= sDate && v.dt.substr(0, 4) <= eDate);
            return data;
        }
        return props.info;
    }

    const onYearSliderChange = (sDate, eDate) => {
        let data = dateCalculationData(sDate, eDate);
        makeGraphData(data);
    }

    const getGraphImage = (title) => {
        var url_base64jp = document.getElementById(title).toDataURL("image/jpg");
        var a = document.getElementById('download_' + title);
        a.href = url_base64jp;
    }

    useEffect(() => {
        if (props.info && props.info.length > 0) {
            onYearClick(yearEnd);
            setStartDate(props.info[0].dt.substr(0, 4));
            setEndDate(props.info[props.info.length - 1].dt.substr(0, 4));
        }
    }, [props]);

    return (
        <LineGraphSection style={{ overflow: 'hidden', position: 'relative' }}>
            <TableDrawer                
                placement="top"
                onClose={() => setShowDrawer(false)}
                closable={true}
                visible={showDrawer}
                getContainer={false}
                style={{ position: 'absolute' }}
            >
                <JustTable
                    title={props.title}
                    replaceTitle={props.replaceTitle}
                    headerData={props.header_data}
                    bodyData={props.body_data}
                />

            </TableDrawer>

            {
                filterGraphData &&
                <>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ textAlign: 'center', margin: '10px', display: 'flex', justifyContent: 'space-between' }}>
                            <GraphPeriod
                                onClick={(val) => setFrequency(val)}
                                activePeriod={frequency}
                            />
                            <div>
                                <Tooltip placement="top" title={<span>Table View</span>}>
                                    <GraphIcon onClick={() => setShowDrawer(true)}>
                                        <TableOutlined className="icons" />
                                    </GraphIcon>
                                </Tooltip>
                                <Tooltip placement="top" title={<span>Save this graph as an image</span>}>
                                    <GraphIcon>
                                        <a
                                            id={'download_' + props.title + "_2"}
                                            download={props.title + "_image.jpg"}
                                            href=""
                                            onClick={() => getGraphImage(props.title + "_2")}
                                        >
                                            <CameraOutlined className='icons' />
                                        </a>
                                    </GraphIcon>
                                </Tooltip>
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <GraphTitle>
                                <h3>{props.title} {frequency}</h3>
                            </GraphTitle>
                            <YearLink
                                onClick={onYearClick}
                                activeyear={yearEnd}
                            />
                        </div>

                    </div>

                    {
                        data &&
                        <div style={{ height: '300px' }}>
                            <Line
                                options={LineOptions}
                                data={data}
                            />
                        </div>
                    }

                    <div style={{ margin: '20px 20px' }}>
                        {
                            startDate == minDate &&
                            <SliderYear
                                min={parseInt(startDate) || 1990}
                                max={parseInt(endDate) || (new Date()).getFullYear()}
                                minDisplay={minDate}
                                onYearSliderChange={onYearSliderChange}
                            />
                        }
                    </div>

                </>
            }
        </LineGraphSection>
    )
}

const LineGraphSection = styled.div`
    background-color: #fff;
    border-radius: 10px;
    border: 1px solid #dbdbdb;
    margin-bottom:10px;
`;

let GraphTitle = styled.div`
    h3{
        text-transform: capitalize;
        font-size: 16px; 
        text-align: center;
        margin-left:15px;
        color : #096dd9;
    }
`;

let GraphIcon = styled.span`
    font-size: 13px; 
    margin: 0 5px 0 10px;
    .icons{
        cursor: pointer;
        font-size: 15px;
        color : #000;
        :hover {
            color : red;
        }
    }
`;

let TableDrawer = styled(Drawer)`    
    .ant-drawer-content{
        background-color : #fff;
        border-radius : 10px 10px  0  0;
    }
    .ant-drawer-close{
        color : #000;
    }
`
export default memo(withLineGraph(LineGraphBox));
