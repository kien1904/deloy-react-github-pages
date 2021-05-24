import React from 'react'
import '../assets/css/cart.css'
import {Row,Col,Button, message} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { cartSelector, priceSelector, quantitySelector, removeCart, resetData, updateQuantity } from '../store/reducers/CartSlice'
import {PlusOutlined,MinusOutlined,DeleteOutlined} from '@ant-design/icons'
import currencyFormatter from 'currency-formatter'
import {Link, useHistory} from 'react-router-dom'
import { checkLogin } from '../store/reducers/UsersSlice'
const Cart = () => {
    const products=useSelector(cartSelector)
    const dispatch=useDispatch()
    const totalPrice=useSelector(priceSelector)
    const totalItem=useSelector(quantitySelector)
    const isLogin=useSelector(checkLogin)
    const history=useHistory()
    const checkout=()=>{
        if(isLogin===true){
            dispatch(resetData())
            history.push('/')
            message.success('mua thanh cong',3)
        }
        else{
            history.push("/login")
            message.warning('Ban chua dang nhap. Hay dang nhap de mua hang')
            
        }
        
    }
    return (
        
        <div className="cart">
            {products.length?(<Row className="cart-heading">
              <Col span={18} >
                  <div className="cart-title">
                  <Col span={4}>Picture</Col>
                  <Col span={4}>Name</Col>
                  <Col span={4}>Price</Col>
                  <Col span={4}>Quantity</Col>
                  <Col span={4}>Total Price</Col>
                  <Col span={4}>Remove</Col>
                  </div>

                  {products.map((pro,index)=>(
                      <Row className="cart-detail " key={index}>
                      <Col span={4}>
                          <div className="cart-image">
                              <img src={require('../'+pro.image).default} alt="" />
                          </div>
                      </Col>
                      <Col span={4}>
                          <div className="cart-name text-center">
                              {pro.name}
                          </div>
                      </Col>
                      <Col span={4}>
                          <div className="cart-price text-center">
                          {currencyFormatter.format(pro.discountPrice, { code: "USD" })}
                          </div>
                      </Col>
                      <Col span={4}>
                          <div className="cart-quantity ">
                            <span className="Cplus" onClick={()=>dispatch(updateQuantity({id:pro.id,index,sl:pro.quantity+1}))}>{<PlusOutlined />}</span>
                            <span className="Cresult">{pro.quantity}</span>
                            <span className="Cminus" onClick={()=>dispatch(updateQuantity({id:pro.id,index,sl:pro.quantity>1?pro.quantity-1:pro.quantity}))}>{<MinusOutlined />}</span>
                          </div>
                      </Col>
                      <Col span={4}>
                          <div className="total-price text-center">
                          {currencyFormatter.format(pro.quantity*pro.discountPrice, { code: "USD" })}
                          </div>
                      </Col>
                      <Col span={4}>
                          <div className="remove text-center">
                              <span onClick={()=>dispatch(removeCart(pro.id))}>{<DeleteOutlined />}</span>
                          </div>
                      </Col>
  
                    </Row>



                  ))}

                  
              </Col>
              <Col span={6} className="checkout">
                  <div className="check-color">
                  <h2 className="summary">Summary</h2>
                  <Row>
                  <Col span={12} className="text">
                      Total Items
                  </Col>
                  <Col span={12} className="price-total">
                      {totalItem}
                  </Col>

                  </Row>

                  <Row>
                  <Col span={12} className="text">
                      Total Price
                  </Col>
                  <Col span={12} className="price-total">
                  {currencyFormatter.format(totalPrice, { code: "USD" })}
                  </Col>

                  </Row>
                  <Row>
                     <Button className="btn-check" onClick={checkout}>Checkout</Button>
                  </Row>

                  </div>
                  
                  
                  

              </Col>
          </Row>):(<h2 style={{textAlign:"center", fontSize:"24"}}>Empty Cart</h2>)}
          
        </div>
    )
}

export default Cart
