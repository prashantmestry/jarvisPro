import React, { useContext } from 'react';
import './App.css';
import Home from './Component/Home/Home.js'
import BlogView from './Component/Blog/BlogView';
import Portfolio from './Component/Portfolio/Portfolio';
import ViewCompany from './Component/Company/ViewCompany';
import Navigation from './Component/Common/Navigation';
import ViewGridRowStyleTable from './Component/Grid/ViewGridRowStyleTable'
import ViewGridCellStyleTable from './Component/Grid/ViewGridCellStyleTable';
import ViewDraggable from './Component/ViewDraggable/ViewDraggable';
import ViewDaafChart from './Component/Daaf/ViewDaafChart';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyThemeContext } from './Context/MyThemeContext';
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Layout } from 'antd';

import ViewAllUsers from './Component/Users/ViewAllUsers';
import MyHomeContextProvider from './Component/Home/Context/HomeContext';
// //import GeneralSchema from './Component/Schema/GeneralSchema';

const { Header, Content } = Layout;

const GlobalStyle = createGlobalStyle`
  body {    
    background-color : ${props => props.theme.color.bg};
    color :${props => props.theme.color.text};
  }  
  *{
    padding:0; margin:0;
    color : ${props => props.theme.color.text};
  }
  .ant-layout{
    background-color : ${props => props.theme.color.bg} !important;
  }
  :where(.css-dev-only-do-not-override-acm2ia).ant-select .ant-select-selection-placeholder{
     color : ${props => props.theme.color.text};
    // opacity:.6;
  }

`;

function App() {

  const { theme, currentTheme } = useContext(MyThemeContext);

  return (
    <ThemeProvider theme={theme} currentTheme={currentTheme}>
      <MyHomeContextProvider>
        <GlobalStyle />
        <GlobaleDiv>
          <Layout style={{ minHeight: '100vh' }}>
            <Router>
              <Navigation />
              <Layout className="site-layout">
                {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
                <Content style={{ margin: '0 16px' }}>
                  <div className="site-layout-background" style={{ padding: 15, minHeight: 360 }}>
                    <Switch>
                      <Route path="/grid-table">
                        <ViewGridRowStyleTable />
                        <ViewGridCellStyleTable />
                      </Route>
                      <Route path="/portfolio"> <Portfolio /></Route>
                      <Route path='/myblog'><BlogView /></Route>
                      <Route path='/users'><ViewAllUsers /></Route>
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
        </GlobaleDiv>
      </MyHomeContextProvider>
    </ThemeProvider>
  )
}

const GlobaleDiv = styled.div`  
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

`;

export default App;