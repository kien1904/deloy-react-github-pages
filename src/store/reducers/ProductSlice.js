import {createSlice} from '@reduxjs/toolkit'
import {data} from '../../data'
const ProductSlice=createSlice({
    name:'pro',
    initialState:{
        products:data,
        product:{},
        searchData:[]
    },
    reducers:{
        getDataById:(state,action)=>{
            console.log(action.payload)
            state.product=state.products.find(pro=>pro.id===parseInt(action.payload))
        },
        searchData:(state,action)=>{
            state.searchData=state.products.filter(pro=>pro.name.search(action.payload)!==-1)
        }
    }
    
})
export const ProductReducer=ProductSlice.reducer
export const ProductSelector=state=>state.pro.products
export const ProductDetail=state=>state.pro.product
export const dataSelector=state=>state.pro.searchData
export const {getDataById,searchData} =ProductSlice.actions