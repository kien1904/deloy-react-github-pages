import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { dataSelector, getDataById, ProductSelector } from '../store/reducers/ProductSlice'
import Header from './Header'
import {Row,Col} from 'antd'
import currencyFormatter from 'currency-formatter'
import {Link} from 'react-router-dom'

const Search = () => {
    
    const products=useSelector(dataSelector)
    // console.log(products)
    const dispatch=useDispatch()
    return (
        <div className="home">
           <h2 style={{marginLeft:"40px"}}>Kết quả tìm kiếm: {products.length} sản phẩm được tìm thấy</h2>

           {products.length?(<Row className="list-product">
                {products.map(pro=>(
                    <Col xs={24} sm={12} md={8} lg={6} className="product-item" key={pro.id}>
                        <div className="pro-image">

                            <Link to={`detail/${pro.id}`}>
                            <img src={require('../'+pro.image).default} alt=""  />
                            </Link>
                        </div>
                        <div className="pro-name">
                            {pro.name}
                        </div>
                        <div className="pro-detail-price">
                        <div className="pro-price ">
                       <span className="price">{currencyFormatter.format(pro.price, { code: 'USD' })}</span>  <span className="discount">{pro.discount}%</span>
                        </div>
                        <div className="pro-discount-price">
                        {currencyFormatter.format(pro.discountPrice, { code: 'USD' })}
                        </div>

                        </div>

                        
                    </Col>

                ))}
                

            </Row>):(<h2 style={{textAlign:"center"}}>Not Found </h2>)}
            

        </div>
    )
}

export default Search

