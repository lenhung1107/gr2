import classNames from 'classnames/bind'
import styles from "./Home.module.scss"

import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { jwtDecode } from "jwt-decode";
import axios from "axios"
import Menu from '../../component/Menu'
import Button from '../../component/Button'
import {loginSuccess} from "../../redux/authSlice"

// import Search from '../../component/Layout/DefaultLayout/Search';
const cx = classNames.bind(styles);
function Home() {
    const user = useSelector((state) => state.auth.login?.currentUser)
    let axiosJWT = axios.create();
    const dispatch = useDispatch();
    let date = new Date();
    const refreshToken = async()=>{
        try{
            const res= await axios.post("http://localhost:3000/auth/refresh",{
                withCredentials: true,
            })
            return res.data;
        }
        catch(err){
            console.log(err);
        }

    }
    axiosJWT.interceptors.request.use(
        async (config) => {
            const decodedToken = jwtDecode(user?.accessToken);
            if (decodedToken.exp < date.getTime() / 1000) 
            {
                const data= await refreshToken();
                const refreshUser ={
                    ...user,
                    accessToken: data.accessToken,
                };
                dispatch(loginSuccess(refreshUser));
                config.headers["token"]="Bearer"+ data.accessToken;
            }
            return config;
        },
        (err)=>{
            return Promise.reject(err);
        }
    )
    return (
        <div className={cx('background')}>
            <div className={cx('wrapper')}>
                <div className="item">
                    <Link to={'/doctorItem'}>
                        <Button>
                            <Menu title={'Khám Online'} description={'Khám từ xa với bác sĩ qua video call'} linkimg={'doctor.png'} />
                        </Button>
                    </Link>
                    <Link to={'/listOrder'}>
                        <Button>
                            <Menu title={'Khám Gói Khám'} description={'Đặt khám với các gói khám có sẵn '} linkimg={'pack.png'} />
                        </Button>
                    </Link>
                    <Link to={'/facilities'}>
                        <Button>
                            <Menu title={'Khám Tại CSYT'} description={'Đặt khám ưu tiên tại bệnh viện'} linkimg={'home.png'} />
                        </Button>
                    </Link>
                    <Link>
                        <Button>
                            <Menu title={'Hồ sơ sức khỏe'} description={'Xem và lưu trữ kết quả khám'} linkimg={'profile.png'} />
                        </Button>
                    </Link>
                    <Link>
                        <Button>
                            <Menu title={'Tư vấn sức khỏe'} description={'Tham khảo tư vấn của bác sĩ'} linkimg={'doctor.png'} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;