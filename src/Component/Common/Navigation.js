import React, { useEffect, memo, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Layout, Menu, Switch } from 'antd';
import {
    CaretLeftOutlined, AppstoreOutlined, BarChartOutlined, CloudOutlined, ShopOutlined, TeamOutlined, UserOutlined
} from '@ant-design/icons';
import { MyThemeContext } from '../../Context/MyThemeContext';

const { Sider } = Layout;

const Navigation = (props) => {

    const [collapsed, setCollapsed] = useState(false);
    const { toggleTheme } = useContext(MyThemeContext);

    const allLinks = [
        { path: '/', name: 'Home' },
        { path: '/portfolio', name: 'Portfolio' },
        { path: '/grid-table', name: 'Grid Table' },
        { path: '/myblog', name: 'My Blog' },
        { path: '/users', name: 'Users' },
        { path: '/company', name: 'Company' },
        { path: '/draggable', name: 'Draggable' },
        { path: '/daaf', name: 'Daaf Charts' }
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
                <Switch defaultChecked onChange={(checked) => toggleTheme(checked ? 'light' : 'dark')} />
            </div>

            <Menu theme="dark" mode="inline"
                defaultSelectedKeys={props.location ? props.location.pathname : '/'}
            >
                {
                    allLinks.map(link => {
                        return (
                            <Menu.Item key={link.path} icon={getMenuIcon(link.path)}>
                                <Link to={link.path}>{link.name}</Link>
                            </Menu.Item>
                        )
                    })
                }
            </Menu>
        </Sider >
    )
}

export default memo(withRouter(Navigation));