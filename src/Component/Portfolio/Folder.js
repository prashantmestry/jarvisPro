import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { MyThemeContext } from '../../Context/MyThemeContext';
import { DownOutlined, RightOutlined } from '@ant-design/icons';
const Folder = ({ rootFolder }) => {

    const [open, setOpen] = useState(false);
    const { theme } = useContext(MyThemeContext);

    if (rootFolder.type === 'folder') {
        return (
            <DataList>
                <div style={{ fontWeight: 'bold', cursor: 'pointer' }}
                    onClick={() => setOpen(!open)}> {open ? <DownOutlined className='ico' /> : <RightOutlined className='ico' />}
                    <span className='folderName'>{rootFolder.name}</span>
                </div>
                <div style={{ display: open ? 'block' : 'none' }}>
                    {
                        rootFolder.child.map(val => {
                            return (
                                <Folder rootFolder={val} />
                            )
                        })
                    }
                </div>
            </DataList>
        )
    } else {
        return (
            <div style={{ marginLeft: '10px', color: theme.color.lightText }}>
                {rootFolder.name}
            </div>
        )
    }
}

const DataList = styled.div`
    margin: 5px 10px 5px 20px;
    .folderName{
        text-transform : capitalize;
    }
    .ico{
        font-size : 12px;
        margin-right:5px;
    }
`;

export default Folder;