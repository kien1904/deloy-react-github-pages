import {createSlice} from '@reduxjs/toolkit'
const UserSlice=createSlice({
    name:'user',
    initialState:{
        users:[],
        userLogin:{},
        isLogin:false
    },
    reducers:{
        CheckLogin:(state,action)=>{
            const {name,password}=action.payload
            const check=state.users.find(user=>user.nameModal===name&&user.passwordModal===password)
            if(check){
                    state.isLogin=true
                    state.userLogin=check
            }
            else{
                state.login=false
            }
            
            
        },
        AddUser:(state,action)=>{
            
                state.users.push(action.payload)
            
        }
        ,
        changeState:(state,action)=>{
            state.isLogin=false
            state.userLogin={}
        }
    }

})
export const UsersReducer=UserSlice.reducer
export const userSelector=state=>state.user.users
export const LoginSelector=state=>state.user.userLogin
export const checkLogin=state=>state.user.isLogin
export const {AddUser,changeState,CheckLogin} =UserSlice.actions