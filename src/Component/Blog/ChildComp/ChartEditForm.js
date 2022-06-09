import React, { useRef, useEffect, useState } from 'react';
import * as actions from '../../../redux/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components';
import CityDropDown from './CityDropDown';
import { Input } from 'antd';
import uuid from 'react-uuid';

const EditChartForm = (props) => {

    let onTitleChange = (e) => {
        props.updateCharList({
            ...props.blogs,
            editMode: {
                ...props.editMode,
                title: e.target.value
            }
        });
    }

    let onMessageChange = (e) => {
        props.updateCharList({
            ...props.blogs,
            editMode: {
                ...props.editMode,
                message: e.target.value
            }
        });
    }

    let getSelectedCities = (cities) => {
        props.updateCharList({
            ...props.blogs,
            editMode: {
                ...props.editMode,
                locations: cities
            }
        });
    }

    let emptyEditForm = () => {
        props.updateCharList({
            ...props.blogs,
            editMode: {
                chartId: null,
                messageId: null,
                title: null,
                message: null,
                locations: []
            }
        })
    }

    let submitForm = (e) => {
        e.preventDefault();

        let tempChartList = JSON.parse(JSON.stringify(props.chartList));

        if (props.editMode.chartId && props.editMode.messageId) {
            tempChartList.forEach(element => {
                let tempMessage = JSON.parse(JSON.stringify(element.message));
                tempMessage.forEach(mVal => {
                    if (mVal.messageId === props.editMode.messageId) {
                        mVal.data = props.editMode.message
                    }
                });
                if (element.id === props.editMode.chartId) {
                    element.title = props.editMode.title;
                    element.message = tempMessage;
                    element.locations = props.editMode.locations
                }
            });

        } else {
            if (props.editMode.title && props.editMode.message) {

                tempChartList.push({
                    id: uuid(),
                    title: props.editMode.title,
                    message: [{
                        messageId: uuid(),
                        data: props.editMode.message
                    }],
                    locations: props.editMode.locations

                });

                props.updateCharList({
                    ...props.blogs,
                    chartList: tempChartList
                });

            }
        }
        props.updateCharList({
            ...props.blogs,
            chartList: tempChartList,
            editMode: {
                title: null,
                message: null,
                locations: [],
                messageId: null,
                chartId: null
            }
        });

    }

    return (
        <EditChartDiv className='mar-l-15'>
            <form onSubmit={submitForm}>
                <div className="form-group">
                    <label htmlFor="chart_title">Chart Title:</label>
                    <Input
                        onChange={onTitleChange}
                        value={props.editMode.title}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="chart_message">Message:</label>
                    <Input
                        onChange={onMessageChange}
                        value={props.editMode.message}
                    />
                </div>
                <div className="form-group">
                    <CityDropDown
                        getSelectedCities={getSelectedCities}
                        showCity={props.editMode.locations.map(val => val.city_name)}
                    />
                </div>
                <div className="form-group" style={{ textAlign: 'right' }}>

                    <button type="button" className="btn btn-primary"
                        onClick={() => emptyEditForm()}>Cancel</button>&nbsp;&nbsp;
                    <button type="submit" className="btn btn-success">Submit</button>
                </div>
            </form>
        </EditChartDiv>
    )
}

let EditChartDiv = styled.div`     
    border : 1px solid #ebebeb;
    padding:10px;    
`;

const mapStateToProps = (state) => {
    return {
        chartList: state.blogs.chartList,
        editMode: state.blogs.editMode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (count) => dispatch(actions.createBlog(count)),
        updateCharList: (obj) => dispatch(actions.updateCharList(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditChartForm);