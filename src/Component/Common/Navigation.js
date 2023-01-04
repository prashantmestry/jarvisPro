import React, { useEffect, memo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, withRouter } from 'react-router';
import { Layout, Menu, Switch } from 'antd';
import {
    CaretLeftOutlined, AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons';
import { MyThemeContext } from '../../Context/MyThemeContext';
import Loading from './Loading';
import styled from 'styled-components';

const { Sider } = Layout;

const Navigation = (props) => {

    const history = useHistory();
    const { theme, currentTheme } = useContext(MyThemeContext);
    const [collapsed, setCollapsed] = useState(false);
    const { toggleTheme } = useContext(MyThemeContext);
    const [items, setItems] = useState([]);

    const allLinks = [
        { path: '/', name: 'Home' },
        { path: '/portfolio', name: 'Portfolio' },
        { path: '/grid-table', name: 'Grid Table' },
        { path: '/myblog', name: 'My Blog' },
        { path: '/users', name: 'Users' },
        { path: '/company', name: 'Company' },
        { path: '/draggable', name: 'Draggable' },
        { path: '/daaf', name: 'Daaf Charts' },
        { path: '/note', name: 'Credit Note' }
    ];

    let getMenuIcon = (link) => {
        switch (link) {
            case '/':
                return <AppstoreOutlined />
            case '/portfolio':
                return <BarChartOutlined />
            case '/grid-table':
                return <CloudOutlined />
            case '/myblog':
                return <TeamOutlined />
            case '/users':
                return <UserOutlined />
            case '/company':
                return <AppstoreOutlined />
            default: ;
                return <ShopOutlined />
        }
    }



    return (
        <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
            <div style={{ height: '32px', margin: '16px', textAlign: 'center' }} >
                <Switch
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    defaultChecked onChange={(checked) => toggleTheme(checked ? 'dark' : 'light')} />
            </div>
            <Menu theme={currentTheme} mode="inline"
                defaultSelectedKeys={history ? history.location.pathname : '/'}
            >
                {
                    allLinks.map(link => {
                        return (
                            <Menu.Item key={link.path} icon={getMenuIcon(link.path)}

                            >
                                <Link to={link.path}>{link.name}</Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
            <div className='txt-center mar-t-15' style={{ opacity: '0.5' }}>
                Env: {process.env.NODE_ENV}
            </div>
        </Sider >
    )
}


//export default memo(withRouter(Navigation));

export default Navigation;