import React, { useEffect } from 'react';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components';

const CreateBlog = (props) => {

    // useEffect(() => {
    //     props.createBlog(props.blogList.length);
    // }, []);


    let addNewBlog = () => {
        // console.log('blog list is ', props.blogList);
        // console.log('total is ', props.blogList.length + 1);
        props.createBlog(props.blogList.length + 1);
    }

    return (
        <BlogListDiv>
            <h2>Create new Blog</h2>
            <AddBlogButton onClick={() => addNewBlog()}>Add Blog</AddBlogButton>
            {
                (props.blogList && props.blogList.length > 0) && props.blogList.map((blog, index) => {
                    return (
                        <div key={index}> {blog.counter}  {blog.title} - {blog.description}</div>
                    )
                })
            }
        </BlogListDiv>
    )
}

const AddBlogButton = styled.button`

`;

const BlogListDiv = styled.div`
    border : 1px solid gray;
    margin:10px;
    padding:10px;
    text-align:left;
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateBlog);