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
import { createGlobalStyle, ThemeProvider } from "styled-components";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine-dark.css';
import { Layout } from 'antd';
import ViewAllUsers from './Component/Users/ViewAllUsers';
import { useContext } from 'react';
import MyHomeContextProvider from './Component/Home/Context/HomeContext';

const { Header, Content } = Layout;

const GlobalStyle = createGlobalStyle`
  body {    
    background-color : ${props => props.theme.color.bg};
    color :${props => props.theme.color.text};
  }  
  *{
    padding:0; margin:0;
  }
  .ant-layout{
    background-color : ${props => props.theme.color.bg};
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
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <div className="site-layout-background" style={{ padding: 15, minHeight: 360 }}>
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
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </Content>
          </Layout>
        </Router>
      </Layout>
      </MyHomeContextProvider>
    </ThemeProvider>
  );
}

export default App;