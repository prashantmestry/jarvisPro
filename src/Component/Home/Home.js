import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import CompanySelection from '../Common/Selection/CompanySelection';
import SubStatement from '../Common/Selection/SubStatement';
import PageSection from '../Common/PageSection';
import ErrorBoundary from '../ErrorComp/ErrorBoundary';
import styled from 'styled-components';
import Statements from '../Common/Selection/Statements';
import DividerHr from '../Common/DividerHr';
import StmtTableGrid from './Comp/StmtTableGrid';
import GridTableContainer from '../Common/GridTableContainer/GridTableContainer';
import DateSelection from '../Common/Selection/DateSelection';

import { Select } from 'antd';
import SliderYear from '../Common/Slider/SliderYear';
import SingleSelect from '../Common/Selection/SingleSelect';
import { frequencyList } from '../../Utils/GlobalData';
//import MyLi from './MyLi';
import moment from 'moment';
import ColorHome from './ColorHome';
import NotificationDrawer from '../Common/NotificationDrawer';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            frequency: 'specific_date',
            picker: null,
            text: 'old',
            openDrawer: false
        }
        this.showText = this.showText.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentDidMount() {

        if ([]) { console.log('arr') }

        // console.log(" == ", ['a'] + ['b']);

        // console.log(" == ", [] + []);

        // console.log(" == ", ![]);

        // console.log(" == ", ![] + []);

        //console.log('pp ', (1 && 2) || (0 || 3));

        //        console.log('pp ', null && undefined);

        //console.log('pp ', 0 || 1 && 2 || 3);

        console.log(null || 2);


        this.setState({
            picker: 'month'
        })
    }

    static getDerivedStateFromProps() {
        //console.log('getRerivedStateFromProps call');
        return null;
    }

    // getSnapshotBeforeUpdate() {
    //     //console.log('getSnapshotBeforeUpdate call');
    //     return;
    // }

    shouldComponentUpdate() {
        //console.log('shouldComponentUpdate call');
        return true;
    }

    componentDidUpdate() {

        //console.log('componentDidUpdate call');

        this.props.updateCompanyStmtData({
            2: {
                loading: true,
                error: 'problem in fetcing data',
                data: []
            }
        })
    }

    onCompanyChange = (val) => {
        this.props.updateCompanyInfo({
            ...this.props.companyInfo,
            id: val.compId,
            name: val.compName,
        });
    }

    handleFrequencyChange = (val) => {
        this.props.updateCompanyInfo({
            ...this.props.companyInfo,
            frequency: val,
            picker: frequencyList.find(freq => freq.id === val).picker
        });
    }

    afterDateChange = (val) => {
        this.props.updateCompanyInfo({
            ...this.props.companyInfo,
            dateRange: val
        })
    }

    showText = (value) => {
        console.log('click');
        this.setState({
            text: 'here is new data' + value
        })
    }

    myDebounce(cb, second) {
        let timerId;
        return (args) => {
            if (timerId) {
                clearInterval(timerId);
            }
            timerId = setTimeout(() => {
                cb(args);
            }, second);
        }
    }

    myThrottle(cb, delay) {
        let last = 0;
        return (...args) => {
            let now = new Date().getTime();
            if (now - last < delay) {
                return;
            }
            last = now;
            return cb(args);
        }
    }

    homeData = [
        {
            "company": "732281",
            "date": "15-06-2017",
            "amount": 42220,
            "quantity": 100,
            "id": 92902,
            "buyOrSell": "buy",
            "from": "manual"
        },
        {
            "company": "423228",
            "date": "18-10-2017",
            "amount": 46185,
            "quantity": 100,
            "id": 77832,
            "buyOrSell": "sell",
            "from": "manual"
        },
        {
            "company": "132281",
            "date": "11-08-2018",
            "amount": 48300,
            "quantity": 100,
            "id": 7510,
            "buyOrSell": "buy",
            "from": "manual"
        },
        {
            "company": "132281",
            "date": "12-02-2021",
            "amount": 96040,
            "quantity": 100,
            "id": 93190,
            "buyOrSell": "buy",
            "from": "manual"
        },
        {
            "company": "132282",
            "date": "11-05-2021",
            "amount": 90730,
            "quantity": 100,
            "id": 30185,
            "buyOrSell": "sell",
            "from": "manual"
        },
        {
            "company": "132281",
            "date": "16-07-2021",
            "amount": 100500,
            "quantity": 100,
            "id": 41919,
            "buyOrSell": "sell",
            "from": "manual"
        }
    ];


    onClose() {
        console.log('here we go');
        this.setState({
            openDrawer: false
        })
    }

    render() {

        return (
            <div>

                <NotificationDrawer
                    visible={this.state.openDrawer}
                    onClose={this.onClose}
                />

                <div className='mar-b-10'>
                    <button onClick={() => {
                        this.setState({
                            openDrawer: true
                        })
                    }}>Notification Click</button>
                    Author : {process.env.REACT_APP_AUTHOR}
                </div>

                <PageSection className='pad-10'>

                    <CompanyInfo className='mar-b-10'>{this.props.companyInfo.name}</CompanyInfo>

                    <div className='flex flex-wrap'>
                        <div className='mar-r-15 mar-b-10'>
                            <div className='mar-b-5 txt-500'>Select Company</div>
                            <div>
                                <CompanySelection
                                    islight
                                    onChange={this.onCompanyChange}
                                />
                            </div>
                        </div>

                        <div className='mar-r-15  mar-b-10'>
                            <div className='mar-b-5 txt-500'>Sub Statement:</div>
                            <div>
                                <ErrorBoundary>
                                    <SubStatement />
                                </ErrorBoundary>
                            </div>
                        </div>

                        <div>
                            <div className='mar-b-5 mar-b-15 txt-500'>
                                <div className='mar-b-5 txt-500'>Frequency</div>
                                <SingleSelect
                                    islight
                                    style={{ width: '200px' }}
                                    placeholder="Select Frequency"
                                    onChange={this.handleFrequencyChange}
                                    value={this.props.companyInfo.frequency || undefined}
                                >
                                    {
                                        frequencyList.map(freq => {
                                            return (
                                                <Select.Option key={freq.id} value={freq.id}>{freq.title.toUpperCase()}</Select.Option>
                                            )
                                        })
                                    }
                                </SingleSelect>
                            </div>
                        </div>

                        <div>
                            <div className='mar-b-5 mar-b-10 txt-500'>
                                <div className='mar-b-5 txt-500 mar-l-10'>Year Range</div>
                                <div className='mar-r-15 mar-l-15' style={{ width: '400px' }}>
                                    <SliderYear
                                        frequency={this.state.frequency}
                                        afterDateChange={this.afterDateChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className='mar-b-5 mar-t-10 txt-500'>Statement</div>
                        <Statements
                        />
                    </div>

                </PageSection>

                <PageSection className="mar-t-10">
                    <GridTableContainer>
                        <StmtTableGrid />
                    </GridTableContainer>
                </PageSection>

            </div>
        )
    }
}

const CompanyInfo = styled.div`
    font-size : 25px;
`;

const mapStateToProps = state => {
    return {
        companyInfo: state.company.companyInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCompanyStmtData: (data) => dispatch(actions.updateCompanyStmtData(data)),
        updateCompanyInfo: (data) => dispatch(actions.updateCompanyInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);