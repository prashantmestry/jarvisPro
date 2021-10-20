import logo from './logo.svg';
import './App.css';
import CreateBlog from './Component/Blog/CreateBlog';
import CreateWidget from './Component/Blog/CreateWidget';

function App() {
  return (
    <div className="App">
      <header className="App-body">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Deployment is running with redux1...
        </p>
        <CreateBlog />
        <CreateWidget />
      </header>
    </div>
  );
}

export default App;
