import React, { useContext, useState, useEffect, memo } from 'react';
import moment from 'moment';
import YearLink from '../Comp/YearLink';
import GraphPeriod from '../Comp/GraphPeriod';
import styled from 'styled-components';
import SliderYear from '../Comp/SliderYear';
import { roundNumber } from '../../../Utils/globalFunctions';
import { Drawer, Tooltip } from 'antd';
import { TableOutlined, CameraOutlined } from '@ant-design/icons';
import JustTable from '../JustTable';
import withLineGraph from '../Hoc/withLineGraph';
import { Line } from 'react-chartjs-2';
import faker from 'faker';

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
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState((new Date()).getFullYear());
    const [minDate, setMinDate] = useState(null);
    const [data, setData] = useState(null);
    const [filterGraphData, setFilterGraphData] = useState(props.info);
    const [showDrawer, setShowDrawer] = useState(false);

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

    useEffect(() => {
        if (props.info && props.info.length > 0) {
            onYearClick(yearEnd);
            setStartDate(props.info[0].dt.substr(0, 4));
            setEndDate(props.info[props.info.length - 1].dt.substr(0, 4));
        }
    }, [props]);


    const onYearClick = (value) => {
        setyearEnd(value);
        if (value != 'all') {
            let sDate = props.info[props.info.length - 1].dt.substr(0, 4) - value;
            let eDate = props.info[props.info.length - 1].dt.substr(0, 4);
            setMinDate(sDate);
            let temp_data = dateCalculationData(sDate, eDate);
            makeGraphData(temp_data);
        }
        else {
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
        else {
            return props.info;
        }
    }

    const onYearSliderChange = (sDate, eDate) => {
        let data = dateCalculationData(sDate, eDate);
        makeGraphData(data);
    }

    const getGraphImage = (title) => {
        //let title = tit+"_2";
        // console.log('graph title', title);
        var url_base64jp = document.getElementById(title).toDataURL("image/jpg");
        var a = document.getElementById('download_' + title);
        a.href = url_base64jp;
    }

    useEffect(() => {
        console.log('data', data);
    }, [data]);

    let labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

    return (
        <LineGraphSection style={{ overflow: 'hidden', position: 'relative' }}>
            <TableDrawer
                title=""
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
                        <div className='controller'>

                            <div style={{ textAlign: 'center' }}>
                                <GraphPeriod
                                    onClick={props.changeFrequency}
                                    activePeriod={props.frequency}
                                />
                            </div>

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

                            <div>
                                <YearLink
                                    onClick={onYearClick}
                                    activeyear={yearEnd}
                                />
                            </div>
                        </div>

                        <GraphTitle>
                            <h3>{props.title}</h3>
                        </GraphTitle>

                    </div>

                    <div style={{
                        margin: '10px 0 20px 0', float: 'left', width: '100%',
                        position: 'relative',
                        height: '300px', minHeight: '300px'
                    }}>
                        {
                            <Line data={{
                                labels,
                                options: {
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'top',
                                        },
                                        title: {
                                            display: true,
                                            text: 'Chart.js Line Chart',
                                        },
                                    },
                                },
                                datasets: [
                                    {
                                        label: 'Dataset 1',
                                        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                                        borderColor: 'rgb(255, 99, 132)',
                                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                                    },
                                    {
                                        label: 'Dataset 2',
                                        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
                                        borderColor: 'rgb(53, 162, 235)',
                                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                                    }
                                ]
                            }} />
                        }
                    </div>

                    {/* <div style={{ opacity: '0', height: '300px', position: 'relative', zIndex: '-1' }}>
                        {
                            data &&
                            <Line
                                options={dwn_img_option}
                                data={data}
                                id={props.title + '_2'}
                            />
                        }
                    </div> */}

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
    background-color: green;
    border-radius: 10px;
    border: 1px solid red;
`;

let GraphTitle = styled.div`
    h3{
        text-transform: capitalize;
        font-size: 16px; 
        text-align: center;
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
        background-color : yellow;
        border-radius : 10px 10px  0  0;
    }
    .ant-drawer-close{
        color : red;
    }
`
export default memo(withLineGraph(LineGraphBox));
