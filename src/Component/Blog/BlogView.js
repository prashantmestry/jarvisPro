import React, { useEffect } from 'react';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChartList from './ChartList';
import SummaryWidget from './SummaryWidget';

const BlogView = (props) => {

    let addNewBlog = () => {
        props.createBlog(props.blogList.length + 1);
    }

    return (
        <BlogListDiv>
            <SummaryWidget />
            {/* <h2>Create new Blog</h2>
            <AddBlogButton onClick={() => addNewBlog()}>Add Blog</AddBlogButton>
            <Button variant="success" size="xxl">
                flat button
            </Button>
            {
                (props.blogList && props.blogList.length > 0) && props.blogList.map((blog, index) => {
                    return (
                        <div key={index}> {blog.counter}  {blog.title} - {blog.description}</div>
                    )
                })
            } */}
            <ChartList />
        </BlogListDiv>
    )
}

const BlogListDiv = styled.div`
    border : 1px solid gray;        
    text-align:left;
    Xwidth:100%;
`;

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