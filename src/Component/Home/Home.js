import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions';
import CompanySelection from '../Common/Selection/CompanySelection';
import SubStatementSelection from '../Common/Selection/SubStatementSelection';
import PageSection from '../Common/PageSection';
import ErrorBoundary from '../ErrorComp/ErrorBoundary';

class Home extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    onCompanyChange = (val) => {
        console.log('on cmp search ', val);
    }

    render() {
        return (
            <div>
                <PageSection className='pad-10 flex flex-wrap'>
                    <div className='mar-r-15 mar-b-10'>
                        <div className='mar-b-5 txt-500'>Select Company</div>
                        <div>
                            <CompanySelection
                                islight
                                onChange={this.onCompanyChange}
                            />
                        </div>
                    </div>

                    <div>
                        <div className='mar-b-5 txt-500'>Select Company</div>
                        <div>
                            <ErrorBoundary>
                                <SubStatementSelection default_value='con' />
                            </ErrorBoundary>
                        </div>
                    </div>
                </PageSection>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        //getCompanyList: () => dispatch(actions.getCompanyList());
    }
}

export default connect(null, mapDispatchToProps)(Home);