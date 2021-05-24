import {createSlice, current} from '@reduxjs/toolkit'
const cartSlice=createSlice({
    name:'cart',
    initialState:{
        products:[],
        totalPrice:0,
        totalQuantities:0
    },
    reducers:{
        AddToCart:(state,action)=>{
            const {id,product,quantity}=action.payload
           
           
            const check=state.products.find(pros=>pros.id===parseInt(id))
            if(check){
                return {
                    ...state
                }
            }
            else{
                const TPrice=state.totalPrice+product.discountPrice*quantity
                const Tquantity=state.totalQuantities+quantity
                return{
                    ...state,
                    products:[...state.products,{...product,quantity:quantity}],
                    totalPrice:TPrice,
                    totalQuantities:Tquantity
                }
            }
        },
        updateQuantity:(state,action)=>{
            const {id,sl,index}=action.payload
            const findPro=state.products.find(pro=>pro.id===id)
            const old_quantity=findPro.quantity
            findPro.quantity=sl
            state.products[index]=findPro
            state.totalPrice=state.totalPrice+findPro.discountPrice*sl-findPro.discountPrice*old_quantity
            state.totalQuantities=state.totalQuantities+sl-old_quantity

        },
        removeCart:(state,action)=>{
            const id=action.payload
            
            const findPro=state.products.find(pro=>pro.id===id)
            state.products=state.products.filter(pro=>pro.id !==id)
            state.totalPrice=state.totalPrice-findPro.discountPrice*findPro.quantity
            state.totalQuantities=state.totalQuantities-findPro.quantity
        },
        resetData:(state,action)=>{
            state.products=[]
            state.totalPrice=0
            state.totalQuantities=0
        }
    }

})
export const cartReducer=cartSlice.reducer
export const cartSelector=state=>state.cart.products
export const priceSelector=state=>state.cart.totalPrice
export const quantitySelector=state=>state.cart.totalQuantities
export const {AddToCart,updateQuantity,removeCart,resetData}=cartSlice.actions