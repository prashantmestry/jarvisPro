import React, { useEffect, useState } from 'react';
import * as actions from '../../redux/actions/index';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

const GeneralSchema = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const generalSchema = useSelector(state => state.generalSchema);

    return (
        <div className='padding-16'>
            <div className='flex flex-direc-col margin-t-8'>
                <div>Schema name</div>
                <input
                    style={{ width: 250 }}
                    value={generalSchema?.schemaName}
                    onChange={e => {
                        dispatch(actions.updateSchemaDetail({
                            ...generalSchema,
                            schemaName: e.target.value
                        }));
                    }}
                    placeholder="Enter name"
                />
            </div>
        </div>
    )
}

export default GeneralSchema;