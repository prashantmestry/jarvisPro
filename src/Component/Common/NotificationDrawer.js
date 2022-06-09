import React, { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

const NotificationDrawer = ({ visible, onClose }) => {

    const [start, setStart] = useState(1);
    const [list, setList] = useState([]);

    const getNewRecords = () => {
        let records = [];
        let end = start + 50;
        for (let i = start; i < end; i++) {
            records.push({
                name: i + ' : User',
                body: 'This is user has total ' + i + ' contacts'
            })
        }
        setStart(end);
        return records;
    }

    const loadFunc = () => {
        console.log('load api call');

        setTimeout(() => {
            let userList = getNewRecords();
            setList([...list, ...userList]);
        }, 2000);

    }

    useEffect(() => {
        let userList = getNewRecords();
        setList(userList);
    }, []);




    return (
        <Drawer title="Basic Drawer" placement="right"
            onClose={onClose}
            visible={visible}
            width={400}
            bodyStyle={{
                color: '#000'
            }}
        >
            <div style={{ height: '100%', overflow: 'auto', padding: '5px' }}>
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
                                <div style={{ border: '1px solid gray', margin: '10px 0 ', padding: '5px' }} id={val.name}>
                                    <div>{val.name}</div>
                                    <div>{val.body}</div>
                                </div>
                            )
                        })
                    }
                </InfiniteScroll>
            </div>
        </Drawer>
    )
}

export default NotificationDrawer;