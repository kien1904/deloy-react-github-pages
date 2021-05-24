import React from 'react';
import 'antd/dist/antd.css';
import './App.css';
import Navbar from './components/Navbar';
import {HashRouter as Router,Route} from 'react-router-dom'
import Home from './components/Home';
import { Provider } from 'react-redux';
import { store } from './store';
import Detail from './components/Detail';
import Cart from './components/Cart';
import Search from './components/Search';
import Login from './components/Login';

function App() {
  return (
    <Router>
      <Provider store={store}>
      <Navbar/>
      <Route path="/" exact component={Home}></Route>
      <Route path="/detail/:id" exact component={Detail}></Route>
      <Route path="/cart" component={Cart} exact></Route>
      <Route path="/search" component={Search} exact></Route>
      <Route path="/login" exact  component={Login}></Route>
      </Provider>
    </Router>
    
      
   
  );
}

export default App;
