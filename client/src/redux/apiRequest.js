import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerFailed,registerSuccess } from "./authSlice";
import { deleteUserStart, deleteUserFailed, deleteUserSuccess } from "./userSlice";
export const loginUser= async(user, dispatch, callback)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:3000/auth/login",user,{
            withCredentials: true}
        );
        dispatch(loginSuccess(res.data));
        localStorage.setItem("user", JSON.stringify(res.data)); // ✅ Lưu vào localStorage
        if(callback) callback(res.data);
    }
    catch(err){
        const errorMessage = err.response?.data?.message || "Đăng nhập thất bại!";
        dispatch(loginFailed(errorMessage));
    }
}
export const registerUser= async(user, dispatch, navigate)=>{
    dispatch(registerStart());
    try{
        const res = await axios.post("http://localhost:3000/auth/signup",user,{
            withCredentials: true
        });
        dispatch(registerSuccess(res.data));
        navigate("/login");
    }
    catch(err){
        dispatch(registerFailed(err));
    }
}
export const deleteUser=async(accessToken, dispatch, id) =>{
    dispatch(deleteUserStart());
    try{
        const res= await axios.delete("http://localhost:3000/adminpage/"+id,{
            headers:{token: `Bearer ${accessToken}`},
        },{
            withCredentials: true
        });
        dispatch(deleteUserSuccess(res.data));
    }
    catch(err){
        dispatch(deleteUserFailed(err.response.data));
    }
}