import React, { useEffect, useState } from 'react';
import * as actions from '../../../redux/actions/index';
import { connect } from 'react-redux';

import { Select } from 'antd';
const { Option } = Select;

const CityDropDown = (props) => {

    return (
        <Select
            mode="multiple"
            placeholder="Please select City"
            value={props.editMode.locations}
            onChange={props.getSelectedCities}
            style={{ width: '100%' }}
        >
            {
                props.cityList.map(val => {
                    return (
                        <Option key={val.city_id}>{val.city_name}</Option>
                    )
                })
            }
        </Select >
    )
}

const mapStateToProps = (state) => {
    return {
        editMode: state.blogs.editMode,
        cityList: state.blogs.cityList
    }
}

export default connect(mapStateToProps, null)(CityDropDown);