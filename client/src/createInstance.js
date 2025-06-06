import axios from "axios";
import { jwtDecode } from "jwt-decode";
export const refreshToken = async () => {  // Thêm "export const"
    try {
        const res = await axios.post("https://gr2-hdy0.onrender.com/auth/refresh", {}, {
            withCredentials: true,
        });
        return res.data;
    } catch (err) {
        console.log(err);
        return null; // Tránh lỗi nếu không nhận được data
    }
};

export const createAxios=(user, dispatch,stateSuccess)=>{
    let date = new Date();
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
            async (config) => {
                const decodedToken = jwtDecode(user?.accessToken);
                if (decodedToken.exp < date.getTime() / 1000) 
                {
                    const data= await refreshToken();
                    const refreshUser ={
                        ...user,
                        accessToken: data.accessToken,
                    };
                    dispatch(stateSuccess(refreshUser));
                    config.headers["token"]="Bearer"+ data.accessToken;
                }
                return config;
            },
            (err)=>{
                return Promise.reject(err);
            }
        )
        return newInstance;
}