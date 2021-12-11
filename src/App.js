
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
import { useContext } from 'react';

const { Header, Content, Footer } = Layout;

const GlobalStyle = createGlobalStyle`
  body {    
    background-color : ${props => props.theme.color.bg};
    color :${props => props.theme.color.text};    
  }  
  .ant-layout{
    background-color : ${props => props.theme.color.bg};
  }
`;

function App() {

  const { theme, currentTheme } = useContext(MyThemeContext);

  return (
    <ThemeProvider theme={theme} currentTheme={currentTheme}>
      <GlobalStyle theme={theme} currentTheme={currentTheme} />
      <Layout style={{ minHeight: '100vh' }}>
        <Router>
          <Navigation />
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                <Switch>
                  <Route path="/portfolio"> <Portfolio /></Route>
                  <Route path="/grid-table">
                    <ViewGridRowStyleTable />
                    <ViewGridCellStyleTable />
                  </Route>
                  <Route path='/myblog'><BlogView /></Route>
                  <Route path='/users'><ViewAllUsers /></Route>
                  <Route path='/company'><ViewCompany /></Route>
                  <Route path='/draggable'><ViewDraggable /></Route>
                  <Route path='/daaf'><ViewDaafChart /></Route>
                  <Route path="/"><Home /></Route>
                </Switch>
              </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Router>
      </Layout>
    </ThemeProvider>
  );
}

export default App;