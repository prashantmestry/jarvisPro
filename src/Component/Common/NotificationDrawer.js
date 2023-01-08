import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import styled from 'styled-components';
import CustomDrawer from './Element/CustomDrawer';
import { CheckCircleOutlined } from '@ant-design/icons';
import uuid from 'react-uuid';

const NotificationDrawer = ({ visible, onClose }) => {

    const [start, setStart] = useState(1);
    const [list, setList] = useState([]);

    const getNewRecords = () => {
        let records = [];
        let end = start + 50;
        for (let i = start; i < end; i++) {
            let unqId = uuid();
            records.push({
                name: `${unqId}`,
                key: unqId,
                body: 'This is user has total ' + unqId + ' contacts',
                create_date: '01-01-2023'
            })
        }
        setStart(end);
        return records;
    }

    const loadFunc = () => {
        console.log('load api call');

        setTimeout(() => {
            let userList = getNewRecords();
            console.log('userList', userList);
            setList([...list, ...userList]);
        }, 2000);
    }

    const changeReadStatus = (itemKey) => {
        setList(prev => prev.map(val => (
            val.key === itemKey ? { ...val, isSeen: !val?.isSeen } : val
        )))
    }

    useEffect(() => {
        let userList = getNewRecords();
        setList(userList);
    }, []);



    return (
        <CustomDrawer
            title={`Notifications : ${list?.length}`}
            placement="right"
            onClose={onClose}
            open={visible}
            width={800}
        >
            <div className='notificationSetting flex align-center justify-between pad-5 mar-t-5' style={{ fontWeight: '500' }}>
                <div>Total seen : {list.filter(lVal => lVal.isSeen)?.length}</div>
                <div>Sort by name</div>
            </div>
            <div style={{ height: 'calc(100% - 5px)', overflow: 'auto', marginTop: '10px', paddingRight: '10px' }}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={loadFunc}
                    hasMore={true || false}
                    loader={<div className="loader" key={0}>Loading ...</div>}
                    useWindow={false}
                >
                    {
                        list.map(val => {
                            return (
                                <NotificationItem className='flex' key={val.key} id={val.name} onClick={() => changeReadStatus(val.key)}>
                                    <div className='mar-r-10 flex align-center'>
                                        {val.isSeen && <CheckCircleOutlined style={{ fontSize: '20px', color: 'green' }} />}
                                    </div>
                                    <div className='flex flex-direc-col flex-1'>
                                        <div className='flex justify-between'>
                                            <div style={{ fontWeight: '500' }}>{val.name}</div>
                                            <div style={{ opacity: '.7' }}>{val.create_date}</div>
                                        </div>
                                        <div style={{ opacity: '.7' }}>{val.body}</div>
                                    </div>
                                </NotificationItem>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </CustomDrawer >
    )
}

const NotificationItem = styled.div`
    border: 1px solid ${props => props.theme.color.bgBorder}; 
    margin: 10px 0; 
    padding: 5px;
    font-weight:normal;       
    &:first-child{
        margin-top:0px;
    } 
    .noteTitle{
        font-weight:500;
    }
    &:hover{     
        cursor:pointer;   
        border:1px solid ${props => props.theme.color.lightText};
    }
`;

export default NotificationDrawer;