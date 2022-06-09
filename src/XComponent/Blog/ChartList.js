import React from 'react';
import * as actions from '../../redux/actions/index';
import { connect } from 'react-redux';
import styled from 'styled-components';
import ChartEditForm from './ChildComp/ChartEditForm';

const ChartList = (props) => {

    let editMessage = (chartId, messageId) => {
        let chartFound = props.blogs.chartList.find(cVal => cVal.id === chartId);
        let selectMessage = chartFound.message.find(mVal => mVal.messageId === messageId) ? chartFound.message.find(mVal => mVal.messageId === messageId).data : '';

        props.updateCharList({
            ...props.blogs,
            editMode: {
                chartId: chartId,
                messageId: messageId,
                title: chartFound.title,
                message: selectMessage,
                locations: chartFound.locations
            }
        });
    }

    let deleteMessage = (chartId, messageId) => {
        let tempchartList = JSON.parse(JSON.stringify(props.blogs.chartList));
        if (chartId && messageId) {
            tempchartList.forEach(cVal => {
                if (cVal.id === chartId) {
                    cVal.message = cVal.message.filter(mVal => mVal.messageId !== messageId);
                }
            })
        }
        props.updateCharList({
            ...props.blogs,
            chartList: tempchartList
        });
    }

    return (
        <ChartListDiv>
            {
                (props.blogs.chartList && props.blogs.chartList.length > 0) &&
                <ul>
                    {
                        props.blogs.chartList.map(chart => {
                            return (
                                <li key={chart.id}>
                                    <div className='chartInfoBox'>
                                        <div style={{ fontWeight: '700', color: '#2f84cf' }}>{chart.title}</div>
                                    </div>
                                    <div className='messageBox'>
                                        {
                                            chart.message.length > 0 &&
                                            chart.message.map(mVal => {
                                                return (
                                                    <div key={mVal.messageId}>
                                                        <div style={{ fontWeight: '500', flex: 2 }}>{mVal.data}</div>
                                                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                            <button onClick={() => editMessage(chart.id, mVal.messageId)}>Edit</button>&nbsp;&nbsp;
                                                            <button onClick={() => deleteMessage(chart.id, mVal.messageId)}>Delete</button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            }
            <div>
                <ChartEditForm />
            </div>

        </ChartListDiv >
    )
}

const ChartListDiv = styled.div`
    display : flex; 
    justify-content:space-between;
    padding:5px;

    ul{
        flex:1;
        list-style:none;
        margin:0;
        padding:0;        
        li{            
            margin:10px;
            display:block;                        
            padding-bottom:10px;
            margin-bottom:10px;
            &:last-child{
                border-bottom:none;
            }
        }
    }

    .chartInfoBox{        
        background:#dee8f1;
        padding:10px;
        margin-bottom:10px;
    }
    .messageBox{        
        div{            
            border-radius:5px;            
            margin-bottom:5px;            
            display:flex;
            justify-content: space-between;
            padding-left:5px;
            align-items:center;
            &:last-child{
                margin-bottom:0px;
            }
        }        
    }
`;

const mapStateToProps = (state) => {
    return {
        blogs: state.blogs
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createBlog: (count) => dispatch(actions.createBlog(count)),
        updateCharList: (obj) => dispatch(actions.updateCharList(obj))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChartList);