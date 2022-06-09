import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';
import './Portfolio.css';

const Portfolio = (props) => {

    useEffect(() => {
        props.getportfolioist();
    }, []);

    return (
        <div className='portDiv'>

            <div className='innerDiv div1'>1</div>
            <div className='innerDiv'>2</div>
            <div className='innerDiv'>3</div>
            <div className='innerDiv'>4</div>
            <div className='innerDiv'>5</div>

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