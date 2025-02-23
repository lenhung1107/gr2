import { createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        users:{
            isFetching: false,
            error: false
        },
        mgs:""
    },
    reducers:{
        deleteUserStart: (state)=>{
            state.users.isFetching=true;
        },
        deleteUserSuccess: (state, action)=>{
            state.users.isFetching=false;
            state.mgs=action.payload;
        },
        deleteUserFailed: (state,action)=>{
            state.users.isFetching=false;
            state.users.error=true;
            state.mgs=action.payload;
        }
    }
})
export const{
   deleteUserFailed,
   deleteUserStart,
   deleteUserSuccess
} = userSlice.actions;
export default userSlice.reducer;