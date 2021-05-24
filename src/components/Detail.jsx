import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataById, ProductDetail } from "../store/reducers/ProductSlice";
import { Row, Col ,Button, message} from "antd";
import currencyFormatter from "currency-formatter";
import '../assets/css/detail.css'
import {PlusOutlined,MinusOutlined,ArrowRightOutlined} from '@ant-design/icons'
import { useParams } from "react-router";
import { AddToCart } from "../store/reducers/CartSlice";
import {Link} from 'react-router-dom'
const Detail = () => {
    const dispatch=useDispatch()
    const {id}=useParams()
    
    useEffect(()=>{
        dispatch(getDataById(id))
        
    },[id]) 
   const AddCart=(value)=>{
       dispatch(AddToCart(value))
       message.success('Add product success',3)
   }


  const product = useSelector(ProductDetail);
  const [quantity,setQuantity]=useState(1)
  // console.log(product.image)

  return (
    product?.image ?
    <div className="detail">
      <Row className="detail-heading">
        <Col xs={12} sm={12} md={10} lg={10} className="detail-image">
          <img src={require(`../${product.image}`).default} alt="" />
        </Col>
        <Col  xs={12} md={10} sm={12} lg={14} className="detail-right">
          <div className="detail-name">{product?.name}</div>
          <div className="prices">
          <div className="detail-price ">
            <span >
              {currencyFormatter.format(product?.price, { code: "USD" })}
            </span>
          </div>
          <span className="icon-detail">{<ArrowRightOutlined />}</span>
          <div className="detail-discount-price">
            {currencyFormatter.format(product?.discountPrice, { code: "USD" })}
          </div>

          </div>
          
          <Row className="detail-click">
              <Col span={6} className="detail-quantity">
                  <span className="Qplus" onClick={()=>setQuantity(quantity+1)}>{<PlusOutlined />}</span>
                  <span className="Qresult">{quantity}</span>
                  <span className="Qminus" onClick={()=>setQuantity(quantity>1?quantity-1:quantity)}>{<MinusOutlined />}</span>
              </Col>
              <Col span={18} className="detail-btn">

                  
                  <Button className="btn-add" onClick={()=>AddCart({product,quantity,id})}>Add To Cart</Button>
                  
              </Col>
          </Row>
          <div className="detail-desc">
              <h2>Detail</h2>
              <div className="desc">
                  {product.desc}
              </div>
          </div>
          
        </Col>
      </Row>
    </div>
    : <div className="detail"></div>
  );
};

export default Detail;
