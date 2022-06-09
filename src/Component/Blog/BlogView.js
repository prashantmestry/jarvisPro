import React from 'react';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import ChartList from './ChartList';
import SummaryWidget from './SummaryWidget';

const BlogView = (props) => {

    return (
        <div>
            <ChartList />
            <SummaryWidget />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        blogList: state.blogs.blogList
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (count) => dispatch(actions.createBlog(count))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogView);