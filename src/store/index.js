import {configureStore} from '@reduxjs/toolkit'
import {ProductReducer} from '../store/reducers/ProductSlice'
import { cartReducer } from './reducers/CartSlice'
import { UsersReducer } from './reducers/UsersSlice'
export const store=configureStore({
    reducer:{
        pro:ProductReducer,
        cart:cartReducer,
        user:UsersReducer
    }
})