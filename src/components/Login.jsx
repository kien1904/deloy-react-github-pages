import React, { useState,useEffect } from "react";
import "../assets/css/login.css";
import {Link, useHistory} from 'react-router-dom'
import { Row, Col, Form ,Input,Icon ,Checkbox,Button,Modal, message} from "antd";
import {UserOutlined,UnlockOutlined} from '@ant-design/icons'
import { nanoid } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { AddUser, checkLogin, CheckLogin } from "../store/reducers/UsersSlice";
const Login = () => {
  const dispatch=useDispatch()
  const isLogin=useSelector(checkLogin);
  const [loading,setLoading]=useState(false)
  const history=useHistory()

  const [infor,setInfor]=useState({
    name:'',
    password:''
  })
  const [modal,setModal]=useState(false)
   const [user,setUser]=useState({
     nameModal:'',
     passwordModal:'',
     emailModal:''
   })
   
    const Login=()=>{
      dispatch(CheckLogin(infor))
      setLoading(!loading)
    }
    const Register=()=>{
      dispatch(AddUser(user))
      setUser({
        nameModal:'',
        passwordModal:'',
        emailModal:''

      })
      message.success('dang ki thanh cong',3,setModal(false))
    }
    useEffect(()=>{
      if(isLogin===true&&loading===true){
        message.success('Dang nhap thanh cong')
        history.push('/')
      }
      if(isLogin===false &&loading===true){
        message.warning('Dang nhap that bai')
        setLoading(false)
      } 

    },[loading,isLogin])
    const onChange=(e)=>{
      const {value,name}=e.target
      setInfor({
        ...infor,
        [name]:value
      })

    }
    const changeModal=(e)=>{
      const {value,name}=e.target
      setUser({
        ...user,
        [name]:value
      })

    }
  return (
     

    
    <div className="login">
      <Row className="login-heading">
          <h2 style={{paddingLeft: "183px"}}>Đăng nhập</h2>
        <Form layout="vertical" className="form-login"  >
            <Form.Item rules={[{required:true, message:"ban chua nhap ten dang nhap"}]} label="Username"  className="input">
            <Input
              prefix={ <UserOutlined />}
              placeholder="Username"
              name="name"
              value={infor.name}
              onChange={onChange}
              required
              
            />
            </Form.Item>
            <Form.Item rules={[{required:true, message:"ban chua nhap password"}]} label="Password"  className="input">
            <Input
              prefix={<UnlockOutlined />}
              placeholder="Password"
              name="password"
              value={infor.password}
              onChange={onChange}
              type="password"
              required
             
            />
            
            </Form.Item>
            
            <Form.Item rules={[{required:false}]} className="input" >
                <Row className="checkbox-pass">
                <Checkbox>Remember me</Checkbox>
                <a href="/">Forgot Password</a>
                </Row>
                
               <Row className="btn-login">
               <Button type="primary"  className="login-form-button" onClick={Login}>
                    Log in
                </Button>

               </Row>
               <Row className="register">
               Or <Link onClick={()=>setModal(true)} style={{paddingLeft:"5px"}}>Register Now!</Link>

               </Row>
                
            
            </Form.Item>
            
        </Form>
      </Row>

      <Modal
      visible={modal}
      title="Dang ki tai khoan"
      onCancel={()=>setModal(false)}
      onOk={()=>setModal(true)}
      footer={[
         <Button onClick={()=>setModal(false)}>Back</Button>,
         <Button type="primary"  onClick={Register}>Register</Button>
      ]}
       
      
      
      >
          <Form layout="vertical" className="form-regis" >
            <Form.Item rules={[{required:true, message:"ban chua nhap ten dang nhap"}]} label="Username"  className="input-dk">
            <Input
              prefix={ <UserOutlined />}
              placeholder="Username"
              className="input-detail"
              value={user.nameModal}
              name="nameModal"
              onChange={changeModal}
              required
              
            />
            </Form.Item>
            <Form.Item rules={[{required:true, message:"ban chua nhap email"}]} label="Email"  className="input-dk">
            <Input
              prefix={ <UserOutlined />}
              placeholder="Email"
              className="input-detail"
              value={user.emailModal}
              name="emailModal"
              onChange={changeModal}
              required
              
            />
            </Form.Item>
            <Form.Item rules={[{required:true, message:"ban chua nhap password"}]} label="Password"  className="input-dk">
            <Input
              prefix={<UnlockOutlined />}
              placeholder="Password"
              className="input-detail"
              value={user.passwordModal}
              name="passwordModal"
              onChange={changeModal}
              type="password"
              required
             
            />
            </Form.Item>
            
            
            
        </Form>

      </Modal>
    </div>
    

  );
};

export default Login;
