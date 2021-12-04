import React from 'react';
import * as  actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import excel_download_icon from '../../images/excel_download_icon.png';
import Loading from '../Common/Loading';
import AssetInfo from './AssetInfo';
import EquityDetail from './EquityDetail';
import LineGraphBox from './Graph/LineGraphBox';
import ErrorBox from '../Common/ErrorBox';

class ViewDaafChart extends React.Component {

    state = {
        loading: false,
        assetFrequency: 'weekly'
    }

    componentDidMount() {
        this.props.fetchDaafData();
        this.props.fetchAssetGraphData();
    }

    componentDidUpdate(preProps) {
    }

    getNewDate = (dt) => {
        return moment(dt, 'YYYY-MM-DD').format('Do MMM YYYY');
    }

    downloadExcel = () => {
        return;
        // this.setState({
        //     loading: true
        // })
        // const url = `${API5001}/downloadFile/v2`;
        // const headers = {
        //     'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        // };
        // const body = JSON.stringify({
        //     "filename": "daaf_allocation.xlsx"
        // });

        // jarvisBackend.post(url, body, { headers: headers, responseType: 'arraybuffer', })
        //     .then(response => {
        //         const url = window.URL.createObjectURL(new Blob([response.data]));
        //         const link = document.createElement('a');
        //         link.href = url;
        //         link.setAttribute('download', 'daaf_template.xlsx');
        //         document.body.appendChild(link);
        //         link.click();
        //         setLoading(false);

        //     })
        //     .catch(err => {
        //         notifyUser('error', { message: "Some Internal error occurred while downloading excel" });
        //         setLoading(false);
        //     });
    }

    render() {

        return (
            <div>
                {
                    this.props.allocation_data_loading &&
                    <div style={{ textAlign: 'center' }}>
                        <Loading />
                    </div>
                }
                {
                    (!this.props.allocation_data_loading && this.props.allocation_data) &&
                    <>
                        <div style={{ fontSize: '20px' }}>
                            Allocation as on
                            <span style={{ fontWeight: '200', marginLeft: '10px' }}>
                                {
                                    this.props.allocation_data.assets && this.getNewDate(this.props.allocation_data.assets[0].ndt)
                                }
                            </span>
                        </div>
                        <TopInfo>
                            {
                                this.props.allocation_data?.fmt &&
                                <div className='asset_info'>
                                    <AssetInfo
                                        display_format={this.props.allocation_data.fmt}
                                        asset_attribute={this.props.allocation_data && this.props.allocation_data.assets || null} />
                                </div>
                            }
                        </TopInfo>

                        <MidBox>
                            {
                                this.props.allocation_data &&
                                <EquityDetail
                                    title='Equity Allocation'
                                    display_format={this.props.allocation_data.fmt}
                                    equity_average={this.props.allocation_data && this.props.allocation_data.eqtyavg || null} />
                            }

                            <div style={{ position: 'relative', minHeight: '100px', width: '100%', marginLeft: '10px' }}>
                                {
                                    this.props.asset_data_loading ? <Loading />
                                        :
                                        <>
                                            {
                                                this.props.asset_data?.data &&
                                                <LineGraphBox
                                                    title='Asset allocation'
                                                    display_format={this.props.asset_data.fmt}
                                                    data={this.props.asset_data}
                                                    frequency={this.state.assetFrequency}
                                                    changeFrequency={(val) => {
                                                        this.setState({
                                                            assetFrequency: val
                                                        });
                                                    }}
                                                />
                                            }
                                        </>
                                }
                            </div>
                        </MidBox>



                    </>
                }
            </div>
        )

    }
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

let MidBox = styled.div`
    padding:10px 0;
    display:flex;
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

const mapStateToProps = state => {
    return {
        allocation_data: state.daaf.allocation_data,
        allocation_data_loading: state.daaf.allocation_data_loading,
        allocation_data_error: state.daaf.allocation_data_error,
        asset_data: state.daaf.asset_data,
        asset_data_loading: state.daaf.asset_data_loading,
        asset_data_error: state.daaf.asset_data_error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDaafData: () => dispatch(actions.fetchDaafData()),
        fetchAssetGraphData: () => dispatch(actions.fetchAssetGraphData())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ViewDaafChart);