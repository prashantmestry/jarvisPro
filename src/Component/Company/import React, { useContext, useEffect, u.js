import React, { useContext, useEffect, useState } from 'react';
import { MyThemeContext } from '../../contexts/MyThemeContext';
import LineChartGraph from './component/graph/LineChartGraph';
import AssetInfo from './component/AssetInfo';
import EquityDetail from './component/EquityDetail';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';
import ErrorFaceBox from '../Common/errors/ErrorFace';
import styled from 'styled-components';
import LineGraphContainer from './component/LineGraphContainer';

import excel_download_icon from '../../images/excel_download_icon.png';
import { API5001 } from '../../config/config';
import { jarvisBackend } from '../../config/apiConfig';
import { LoadingOutlined } from '@ant-design/icons';
import moment from 'moment';
import FullSection from '../../components/Common/UI/Section/FullSection';
import { notifyUser } from '../../utils/commonFunctions';

const equity_title = 'Average Annual Equity Allocation';

const LoadingGraph = () => {
    return (
        <div style={{
            display: 'grid',
            position: 'absolute',
            zIndex: '10',
            background: 'rgba(2, 15, 21, 0.49)',
            textAlign: 'center', alignItems: 'center',
            width: '100%', height: '100%'
        }}>
            <LoadingOutlined style={{ fontSize: '20px' }} />
        </div>
    )
}

const DynamicAssetFund = (props) => {

    const [loading, setLoading] = useState(false);
    const { theme } = useContext(MyThemeContext);

    const [frequency, setFrequency] = useState('weekly');

    const [assetFrequency, setAssetFrequency] = useState('weekly');
    const [percentileFrequency, setPercentileFrequency] = useState('weekly');
    const [momentumFrequency, setMomentumFrequency] = useState('weekly');

    useEffect(() => {
        props.daafDataFetch();

        // props.fetchAssetGraphData(assetFrequency);
        // props.fetchPercentileGraphData(percentileFrequency);
        // props.fetchMomentumGraphData(momentumFrequency);

    }, []);

    useEffect(() => {
        props.fetchAssetGraphData(assetFrequency);
    }, [assetFrequency]);

    useEffect(() => {
        props.fetchPercentileGraphData(percentileFrequency);
    }, [percentileFrequency]);

    useEffect(() => {
        props.fetchMomentumGraphData(momentumFrequency);
    }, [momentumFrequency]);

    let downloadExcel = () => {
        setLoading(true);
        const url = `${API5001}/downloadFile/v2`;
        const headers = {
            'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        };
        const body = JSON.stringify({
            "filename": "daaf_allocation.xlsx"
        });

        jarvisBackend.post(url, body, { headers: headers, responseType: 'arraybuffer', })
            .then(response => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'daaf_template.xlsx');
                document.body.appendChild(link);
                link.click();
                setLoading(false);

            })
            .catch(err => {
                notifyUser('error', {message: "Some Internal error occurred while downloading excel"});
                setLoading(false);
            });
    }

    let getNewDate = (dt) => {
        return moment(dt, 'YYYY-MM-DD').format('Do MMM YYYY');
    }

    const downloadGraphImage = (title) => {
        var url_base64jp = document.getElementById(title).toDataURL("image/jpg");
        var a = document.getElementById('download_' + title);
        a.href = url_base64jp;
    }

    return (

        <FullSection className='page_wrapper daaf_inner_box'>
            {
                <>
                    {
                        props.allocation_data &&
                        <div className='couple_area'>
                            <div>
                                <h3>Allocation as on <HighlightAllocation>
                                    {
                                        props.allocation_data.assets &&
                                        getNewDate(props.allocation_data.assets[0].ndt)
                                    }</HighlightAllocation>
                                </h3>
                            </div>

                            <div style={{ textAlign: 'right', fontWeight: '500' }}>
                                {loading && <LoadingOutlined />} Download
                                        <span style={{ cursor: 'pointer', margin: '0 10px' }} onClick={downloadExcel}>
                                    <img title={"Excel"} width='20' src={excel_download_icon} alt='download_excel' />
                                </span>
                            </div>
                        </div>
                    }

                    {
                        <TopInfo>
                            {
                                props.allocation_data_loading &&
                                <LoadingGraph />
                            }
                            {
                                props.allocation_data &&
                                <div className='asset_info'>
                                    <AssetInfo
                                        display_format={props.allocation_data.fmt}
                                        asset_attribute={props.allocation_data && props.allocation_data.assets || null} />
                                </div>
                            }
                        </TopInfo>
                    }
                </>
            }


            <div className='asset_table_box'>
                {
                    <div style={{ position: 'relative' }}>
                        {
                            props.allocation_data_loading &&
                            <LoadingGraph />
                        }
                        {
                            props.allocation_data &&
                            <EquityDetail
                                title={equity_title}
                                display_format={props.allocation_data.fmt}
                                equity_average={props.allocation_data && props.allocation_data.eqtyavg || null} />
                        }
                    </div>
                }

                <div style={{ position: 'relative', minHeight: '100px' }}>
                    {
                        props.asset_data_error ?
                            <ErrorFaceBox error={props.asset_data_error} />
                            :
                            <>
                                {
                                    props.asset_data_loading &&
                                    <LoadingGraph />
                                }
                                {
                                    (props.asset_data && props.asset_data.data) &&
                                    <LineGraphContainer
                                        title='Asset allocation'
                                        display_format={props.asset_data.fmt}
                                        data={props.asset_data}
                                        frequency={assetFrequency}
                                        changeFrequency={(val) => {
                                            setAssetFrequency(val);
                                        }}
                                    />
                                }
                            </>
                    }
                </div>
            </div>

            <div className='graph_area'>
                {
                    props.percentile_data_error ?
                        <ErrorFaceBox error={props.percentile_data_error} />
                        :
                        <>
                            {
                                props.percentile_data_loading &&
                                <LoadingGraph />
                            }
                            {
                                props.percentile_data &&
                                <LineGraphContainer
                                    data={props.percentile_data}
                                    display_format={props.percentile_data.fmt || ''}
                                    title='Percentile Ranks'
                                    frequency={percentileFrequency}
                                    changeFrequency={(val) => {
                                        setPercentileFrequency(val);
                                    }}

                                />
                            }
                        </>
                }
            </div>

            {
                (props.allocation_data && props.momentum_data) &&
                <div className='couple_area_mix'>
                    <LeftBoxSection>
                        {
                            (props.allocation_data && props.allocation_data.eqtyavg) &&
                            <LineChartGraph
                                display_format={props.allocation_data.fmt || ''}
                                downloadGraphImage={downloadGraphImage}
                                title={equity_title}
                                equity_average={props.allocation_data.eqtyavg} />
                        }
                    </LeftBoxSection>
                    <div style={{ position: 'relative' }}>
                        {
                            props.momentum_data_error ?
                                <ErrorFaceBox error={props.momentum_data_error} />
                                :
                                <>
                                    {
                                        props.momentum_data_loading &&
                                        <LoadingGraph />
                                    }
                                    {
                                        props.momentum_data &&
                                        <LineGraphContainer
                                            data={props.momentum_data}
                                            display_format={props.momentum_data.fmt || ''}
                                            title='Moving average Vs. Nifty 50'
                                            frequency={momentumFrequency}
                                            changeFrequency={(val) => {
                                                setMomentumFrequency(val);
                                            }}
                                        />
                                    }
                                </>
                        }
                    </div>
                </div>
            }
        </FullSection >

    )
}



let TopInfo = styled.div`
    display : grid;
    grid-template-columns : 260px auto;    
    grid-gap :5px;    
    position: relative; 
    min-height: 100px;
    
    .asset_info{
        grid-column-start : 1;
        grid-column-end : 3;
        margin-top:10px;        
    }

    .item{
        background: #010f15;        
        border-radius : 10px;
        max-height : 500px;              
    }

    .asset_detail{
        grid-column-start : 1;
        grid-column-end : 2;
        border : 1px solid #fff;
    }
    .asset_graph{        
        grid-column-start : 2;
        grid-column-end : 3;
        padding:25px;
    }

`;


let DownloadLink = styled.div`    
    span{
        margin: 0 5px 0 5px;
    }
`;

const HighlightAllocation = styled.span`
    color: ${props=>props.theme.color.primary.highlight};
`;

const LeftBoxSection = styled.div`
    background: ${props=> props.theme.currentTheme === 'dark' ? props.theme.color.primary.contrastText : props.theme.color.primary.main}; 
    border-radius: 10px; 
    border: 1px solid ${props=> props.theme.currentTheme === 'dark' ? '#010f15' : props.theme.color.primary.border};
    padding: 10px;
`;

let GraphHolder = styled.div`
    display: flex;
    border-radius: 5px;

    .single_box{
        width: 50%;
        background: #010f15;
        margin-bottom: 10px;
        border-radius: 10px;

        :nth-child(2){
                    margin - left:10px;
        }
    }
`;

let mapStateToProps = (state) => {
    let {
        allocation_data_loading, allocation_data_error, allocation_data,
        asset_data_loading, asset_data_error, asset_data,
        percentile_data_loading, percentile_data_error, percentile_data,
        momentum_data_loading, momentum_data_error, momentum_data,
        graph_data_loading, graph_data_error, graph_data
    } = state.dynamicAsset;

    return {
        allocation_data_loading, allocation_data_error, allocation_data,
        asset_data_loading, asset_data_error, asset_data,
        percentile_data_loading, percentile_data_error, percentile_data,
        momentum_data_loading, momentum_data_error, momentum_data,
        graph_data_loading, graph_data_error, graph_data,
    }

}

let mapDispatchToProps = (dispatch) => {
    return {
        daafDataFetch: (data) => dispatch(actions.daafDataFetch(data)),
        fetchAssetGraphData: (data) => dispatch(actions.fetchAssetGraphData(data)),
        fetchPercentileGraphData: (data) => dispatch(actions.fetchPercentileGraphData(data)),
        fetchMomentumGraphData: (data) => dispatch(actions.fetchMomentumGraphData(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicAssetFund);