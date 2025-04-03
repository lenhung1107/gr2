import { createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState:{
        login:{
            currentUser: null,
            isFetching: false,
            error: false,
            errorMessage:""
        },
        register:{
            isFetching:false,
            error: false,
            success: false
        },
    },
    reducers:{
        loginStart: (state)=>{
            state.login.isFetching =true;
            state.login.error = false;
            state.login.errorMessage = ""; // ✅ Xóa lỗi cũ khi đăng nhập lại
        },
        loginSuccess:(state, action) =>{
            state.login.isFetching =false;
            state.login.currentUser=action.payload;
            state.login.error=false;
            state.login.errorMessage = "";
        },
        loginFailed:(state, action)=>{
            state.login.isFetching=false;
            state.login.error=true;
            state.login.errorMessage = action.payload; // ✅ Lưu message lỗi từ API
        },
        registerStart: (state)=>{
            state.register.isFetching =true;
        },
        registerSuccess:(state) =>{
            state.register.isFetching =false;
            state.register.error=false;
            state.register.success=true;
        },
        registerFailed:(state)=>{
            state.register.isFetching=false;
            state.register.error=true;
            state.register.success=false;
        },
        registerReset: (state) => {
            state.register.success = false;
        },
        logOutStart:(state)=>{
            state.login.isFetching=false;
           
        },
        logOutSuccess:(state) =>{
            state.login.isFetching =false;
            state.login.currentUser=null;
            state.login.error=false;
        },
        logOutFailed:(state)=>{
            state.login.isFetching=false;
            state.login.error=true;
        },
        
    }
})
export const{
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
    registerReset,
    logOutStart,
    logOutFailed,
    logOutSuccess
} = authSlice.actions;
export default authSlice.reducer;