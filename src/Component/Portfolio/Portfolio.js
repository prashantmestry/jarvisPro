import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const Portfolio = (props) => {

    useEffect(() => {

        props.getportfolioist();

    }, []);


    return (
        <div>Portfolio page

        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        //portfolioList = state.po
    }
}

let mapDispatchToProps = dispatch => {
    return {
        getportfolioist: () => dispatch(actions.getportfolioList())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);