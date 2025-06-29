import axios from "axios";
import { loginFailed, loginStart, loginSuccess, registerStart, registerFailed,registerSuccess, logOutFailed,logOutStart,logOutSuccess
 } from "./authSlice";
import { deleteUserStart, deleteUserFailed, deleteUserSuccess } from "./userSlice";
export const loginUser= async(user, dispatch, callback)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post("https://gr2-3t8u.onrender.com/auth/login",user,{
            withCredentials: true}
        );
        dispatch(loginSuccess(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        if(callback) callback(res.data);
    }
    catch(err){
        const errorMessage = err.response?.data?.message || "Đăng nhập thất bại!";
        dispatch(loginFailed(errorMessage));
    }
}
export const registerUser= async(user, dispatch)=>{
    dispatch(registerStart());
    try{
        const res = await axios.post("https://gr2-3t8u.onrender.com/auth/signup",user,{
            withCredentials: true
        });
        dispatch(registerSuccess(res.data));
        await Promise.resolve(); // ✅ Đợi Redux cập nhật trạng thái
        // navigate("/login");
    }
    catch(err){
        console.error("Lỗi đăng ký:", err);
        const errorMessage = err.response?.data?.message || "Đăng ký thất bại!";
        dispatch(registerFailed(errorMessage));  // Chỉ truyền chuỗi thông báo
        
    }
}
export const deleteUser=async(accessToken, dispatch, id) =>{
    dispatch(deleteUserStart());
    try{
        const res= await axios.delete("https://gr2-3t8u.onrender.com/adminpage/"+id,{
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
export const logOut= async(dispatch, id,navigate,accessToken,axiosJWT)=>{
    dispatch(logOutStart());
    try{
        console.log("AccessToken trước logout:", accessToken); // Kiểm tra token
        await axiosJWT.post("https://gr2-3t8u.onrender.com/auth/logout",id,{
             headers:{token: `Bearer ${accessToken}`}
        });
        dispatch(logOutSuccess());
        localStorage.removeItem("user");
        navigate("/login");
    } catch(err){
        console.error("Lỗi logout:", err.response?.data);
        dispatch(logOutFailed(err))
    }
}