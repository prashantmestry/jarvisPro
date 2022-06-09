import React from 'react';
import * as actions from '../../redux/actions';
import { connect } from 'react-redux';
import CompanyStatements from './Comp/CompanyStatements';

class ViewCompany extends React.Component {

    constructor(props) {
        console.log('constructor called');
        super(props);
    }

    componentDidMount() {
        let data = {
            id: 1234,
            name: 'ABC Technology',
            stmtType: 'conp',
            stmtId: 2
        }
        this.props.updateCompanyInfo({
            ...this.props.companyInfo,
            ...data
        });
    }

    handleCall = () => {
        let data = {
            id: 1234,
            name: 'XYZ Technology',
            stmtType: 'conp',
            stmtId: 3
        }
        this.props.updateCompanyInfo({
            ...this.props.companyInfo,
            ...data
        });
    }

    fetchData = () => {
        //console.log('Here call fetch new Data');
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.companyInfo.id !== prevProps.companyInfo.id
            || this.props.companyInfo.stmtId !== prevProps.companyInfo.stmtId
            || this.props.companyInfo.stmtType !== prevProps.companyInfo.stmtType) {
            this.fetchData();
        }

    }

    callMe = () => {
        console.log('callMe function ')
    }

    render() {

        console.log('render called');

        return (
            <div>
                <h3>Company</h3>

                <button onClick={this.handleCall}>Set New Info</button>

                <CompanyStatements company='hcl' callMe={this.callMe} />

            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        companyInfo: state.company.companyInfo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCompanyInfo: (data) => dispatch(actions.updateCompanyInfo(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewCompany);