import React from "react";
import { Row, Col, Input, message } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import '../assets/css/nav.css'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../store/reducers/CartSlice";
import { searchData } from '../store/reducers/ProductSlice'
import { changeState, checkLogin } from "../store/reducers/UsersSlice";
const { Search } = Input;
const Navbar = () => {
  const history=useHistory()
  const dispatch=useDispatch()
  const isLogin=useSelector(checkLogin)
  const onSearch=(value)=>{
    dispatch(searchData(value))
    history.push('/search')
    
  }
  const changeLogout=()=>{
    dispatch(changeState())
    
    history.push('/login')
  }
  const url = 'assets/images/logo.webp';
  const products=useSelector(cartSelector)
  return (
    <div className="container">
      <Row className="navbar">
        <Col xs={4} md={4} sm={4} lg={4}>
          <div className="nav-logo">
            <Link to="/"><img src={require('../' + url).default} alt="" /></Link>
          </div>
        </Col>
        <Col xs={12} md={14} sm={12} lg={16}>
          <div className="nav-search">
            
            <Search placeholder="Search Product" enterButton className="search-input" onSearch={onSearch}></Search>

            
            
          </div>
        </Col>
        <Col xs={8} sm={8} md={6} lg={4} className="nav-right">
          <Col span={12}>
            <div className="nav-cart">
                <Link to="/cart"><span >{<ShoppingCartOutlined style={{color:"red",cursor:"pointer"}}/>}</span> <span className="nav-quantity">{products.length}</span></Link>
              
            </div>
          </Col>
          <Col span={12}>
            <div className="nav-user">
              <span className="nav-icon"  >{<UserOutlined />}</span> <button className="nav-login" onClick={changeLogout}>{isLogin?'Logout':'LogIn'}</button>
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Navbar;
