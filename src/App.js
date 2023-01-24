import React, { useContext } from 'react';
import './App.css';
import Home from './Component/Home/Home.js'
import BlogView from './Component/Blog/BlogView';
import Portfolio from './Component/Portfolio/Portfolio';
import ViewCompany from './Component/Company/ViewCompany';
import Navigation from './Component/Common/Navigation';
import ViewDraggable from './Component/ViewDraggable/ViewDraggable';
import ViewDaafChart from './Component/Daaf/ViewDaafChart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyThemeContext } from './Context/MyThemeContext';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Layout } from 'antd';

import Users from './Component/Users/Users';
import MyHomeContextProvider from './Component/Home/Context/HomeContext';
import GridTable from './Component/GridTable/GridTable';
import HeaderInformation from './Component/Common/Header/HeaderInformation';
// //import GeneralSchema from './Component/Schema/GeneralSchema';

const { Header, Content } = Layout;

const GlobalStyle = createGlobalStyle`
  body {    
    background-color : ${props => props.theme.color.bg};
    color :${props => props.theme.color.text};
    Xfont-family : SF Pro Text, Helvetica,Arial,sans-serif;
    font-family : cursive !important;
  }  
  *{
    padding:0; margin:0;
    color : ${props => props.theme.color.text};
  }
  .ant-layout{
    background-color : ${props => props.theme.color.bg} !important;
  }
  .ant-select-selection-placeholder ,.ant-select-selection-placeholder{
     color : ${props => props.theme.color.text} !important;    
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${props => props.theme.color.bg};    
  }   
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.currentTheme === 'dark' ? '#005098' : '#a4a4a4'};    
    border-radius:3px;
  }

  .ant-select-selector{
    background : ${props => props.islight ? props.theme.color.bg : props.theme.color.bg2} !important;
    border :1px solid ${props => props.islight ? props.theme.color.bgBorder : props.theme.color.bg2Border} !important;
  }
  .ant-select-arrow{
      color : ${props => props.islight ? props.theme.color.bgBorder : props.theme.color.bg2Border};
  }
  .ant-select{
      color : ${props => props.theme.color.text};        
  }
  .ant-select-dropdown{
    background : ${props => props.theme.color.bg} !important;        
  }
  .ant-input , .ant-btn-default{
    background : ${props => props.islight ? props.theme.color.bg : props.theme.color.bg2};
    border :1px solid ${props => props.islight ? props.theme.color.bgBorder : props.theme.color.bg2Border};
    color : ${props => props.theme.color.text} !important;

    ::placeholder{
      color : ${props => props.theme.color.text};
      opacity:.5;
    }
  }
  .ant-layout-sider-trigger{
    background :${props => props.theme.color.bg3} !important; 
  }
  .ant-menu-dark{
    background :${props => props.theme.color.bg2} !important; 
  }
  .ant-layout-sider{
    background :${props => props.theme.color.bg2} !important;
  }
  
  .ag-overlay-loading-wrapper{
    background : #000 !important;
    opacity:.4;
  }
`;

function App() {

  const { theme, currentTheme } = useContext(MyThemeContext);

  return (
    <ThemeProvider theme={theme} currentTheme={currentTheme}>
      <MyHomeContextProvider>
        <GlobalStyle />
        <Layout style={{ minHeight: '100vh' }}>
          <Router>
            <Navigation />
            <Layout className="site-layout">
              <Header className="site-layout-background" style={{ padding: 0 }} >
                <HeaderInformation />
              </Header>
              <Content style={{ margin: '0 16px' }}>
                <div className="site-layout-background" style={{ padding: 15, minHeight: 360 }}>
                  <Switch>
                    <Route path="/grid-table"><GridTable /></Route>
                    <Route path="/portfolio"> <Portfolio /></Route>
                    <Route path='/myblog'><BlogView /></Route>
                    <Route path='/users'><Users /></Route>
                    <Route path='/company'><ViewCompany /></Route>
                    <Route path='/draggable'><ViewDraggable /></Route>
                    <Route path='/daaf'><ViewDaafChart /></Route>
                    {/* <Route path='/schema'><GeneralSchema /></Route> */}
                    <Route path="/"><Home /></Route>
                  </Switch>
                </div>
              </Content>
            </Layout>
          </Router>
        </Layout>
      </MyHomeContextProvider>
    </ThemeProvider>
  )
}


export default App;