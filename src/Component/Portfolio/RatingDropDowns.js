import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import * as actions from '../../redux/actions/index';
import { Select } from 'antd';
const { Option } = Select;

const RatingDropDowns = (props) => {


    const portfolio = useSelector(state => state.portfolio);
    const dispatch = useDispatch();
    const [ratingAgency, setRatingAgency] = useState([]);
    const [ratingType, setRatingType] = useState([]);
    const [rating, setRating] = useState([]);

    useEffect(() => {
        if (rating) {
            setRatingAgency(portfolio.ratingAll?.rating_agency || []);
            setRatingType(Object.keys(portfolio.ratingAll?.rating_type?.[0]) || []);
        }

    }, [portfolio.ratingAll]);

    const updateRatingList = (optionFlag, value, i) => {
        const updatedList = portfolio.userRating.map((rVal, index) => {
            if (index === i) {
                rVal[optionFlag] = value || null;
                if (optionFlag === 'rating_type') {
                    rVal['rating_value'] = null;
                }
            }
            return rVal;
        });

        dispatch(actions.updatePortfolioDetail({
            ...portfolio,
            userRating: updatedList
        }))

    }

    return (
        <div>
            <div className='mar-b-10 mar-t-10'>Your Rating Selection</div>
            {
                portfolio?.userRating.map((list, index) => {
                    return (
                        <div key={list?.rating_type + index}>
                            <Select className="mar-r-10"
                                value={list?.rating_agency || null}
                                allowClear={true}
                                placeholder="Agency"
                                onChange={e => updateRatingList('rating_agency', e, index)}
                                style={{ width: '30%' }}
                                disabled={ratingAgency?.length < 1}
                            >
                                {
                                    (ratingAgency || []).map((agVal, key) => (
                                        <Option key={agVal.value} value={agVal.value}>{agVal.value}</Option>
                                    ))
                                }
                            </Select>

                            <Select className="mar-r-10"
                                value={list?.rating_type || null}
                                allowClear={true}
                                placeholder="Type"
                                style={{ width: '30%' }}
                                onChange={e => {
                                    setRating(portfolio.ratingAll?.rating_type?.[0][e]?.rating_value);
                                    updateRatingList('rating_type', e, index);
                                }}
                                disabled={ratingType?.length < 1}
                            >
                                {
                                    (ratingType || []).map((typeVal, key) => (
                                        <Option key={typeVal} value={typeVal}>{typeVal}</Option>
                                    ))
                                }
                            </Select>

                            <Select className="mar-b-10"
                                value={list?.rating_value || null}
                                allowClear={true}
                                placeholder="Rating"
                                style={{ width: '30%' }}
                                onChange={e => updateRatingList('rating_value', e, index)}
                            >
                                {
                                    (rating || []).map((typeVal, key) => (
                                        <Option key={typeVal.value} value={typeVal.value}>{typeVal.value}</Option>
                                    ))
                                }
                            </Select>

                            <DeleteOutlined
                                className='mar-l-10'
                                onClick={() => {
                                    dispatch(actions.updatePortfolioDetail({
                                        ...portfolio,
                                        userRating: portfolio?.userRating.filter((rVal, itemI) => itemI !== index)
                                    }))
                                }}
                            />
                        </div>

                    )
                })
            }
            <div className='text-center'>
                <button
                    onClick={() => {
                        dispatch(actions.updatePortfolioDetail({
                            ...portfolio,
                            userRating: [...portfolio.userRating, { rating_agency: null, rating_type: null, rating_value: null }]
                        }))
                    }}
                >Add <PlusOutlined className='margin-l-8' /></button>
            </div>
        </div>
    )
}

export default RatingDropDowns;