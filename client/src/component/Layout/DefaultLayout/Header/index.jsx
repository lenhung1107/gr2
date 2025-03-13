import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss'
import { Wrapper as PopperWrapper } from '../../../Popper';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useSelector, useDispatch } from 'react-redux';
import { loginSuccess, logOutSuccess } from '../../../../redux/authSlice';
import { logOut } from '../../../../redux/apiRequest';
import { createAxios, refreshToken } from '../../../../createInstance';
const cx = classNames.bind(styles)
function Header() {
    const navigate = useNavigate(); // Khai báo hook useNavigate
    const dispatch = useDispatch();
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            dispatch(loginSuccess(JSON.parse(storedUser)));
        }
    }, [dispatch]);
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    console.log(currentUser);
    let axiosJWT=createAxios(currentUser,dispatch,logOutSuccess);
    const accessToken=currentUser?.accessToken;
    const id= currentUser?._id;
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    const hideMenu = () => {
        setIsMenuVisible(false);
    };
    const handleClick = () => {
        navigate("/login")
    }
    const handleLogout = async () => {
        try {
            let newAccessToken = accessToken;
    
            if (currentUser) {
                const newTokenData = await refreshToken(); // Gọi refresh token trước
                if (newTokenData?.accessToken) {
                    newAccessToken = newTokenData.accessToken;
                } else {
                    console.warn("Không thể refresh token, logout trực tiếp.");
                    localStorage.removeItem("user");
                    dispatch(logOutSuccess());
                    navigate("/login");
                    return;
                }
            }
    
            logOut(dispatch, id, navigate, newAccessToken, axiosJWT);
        } catch (error) {
            console.error("Lỗi khi refresh token trước logout:", error);
            localStorage.removeItem("user");
            dispatch(logOutSuccess());
            navigate("/login");
        }
    };
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('infor')}>
                    <span>Hotline đặt khám: 0982333</span>
                    {currentUser ? (
                        <div className={cx('action')}>
                            <span>Xin chào {currentUser.username}
                            </span>
                            <div className={cx('avatar')}
                                onClick={toggleMenu}
                            >
                                <img
                                    src="/path-to-avatar.jpg"
                                    alt="Avatar"
                                    className={cx('avatar-img')}
                                />
                                {isMenuVisible && (
                                    <div
                                        className={cx('menu-dropdown')}
                                        onMouseLeave={hideMenu} // Ẩn menu khi chuột rời khỏi
                                    >
                                        <Link
                                            to="/profile"
                                            className={cx('menu-item')}
                                            onClick={hideMenu}
                                        >
                                            Hồ sơ cá nhân
                                        </Link>
                                        <Link
                                            className={cx('menu-item')}
                                            onClick={ handleLogout}
                                        >
                                            Đăng xuất
                                        </Link>
                                    </div>
                                )}

                            </div>
                        </div>
                    ) : (
                        <>
                            <button className={cx("button")} onClick={handleClick}>Đăng ký/Đăng nhập</button>
                        </>
                    )}
                </div>
                {/* <div className={cx('user')}>
                
              </div> */}

                <div className={cx('menu')}>
                    <div className={cx('logo')}>
                        <img src="/ava_v2.png" height={40} width={200} alt="Logo" />
                    </div>
                    <div className={cx('menu_list')}>
                        <Link to="/" style={{ textDecoration: 'none' }}>
                            <span>Trang chủ</span>
                        </Link>

                        <Tippy
                            interactive
                            placement='bottom-end'
                            //  visible
                            render={attrs => (

                                <div className={cx('menu-items')} tabIndex="-1" {...attrs}>
                                    <PopperWrapper>
                                        <div className={cx('menu-text')}>
                                            <Link to="/listOrderPack" style={{ textDecoration: 'none' }}>
                                                <span>Gói khám</span>
                                            </Link>
                                            <Link to="/listDoctor" style={{ textDecoration: 'none' }}>
                                                <span>Bác sĩ</span>
                                            </Link>
                                            {/* <Link to="/facilities" style={{ textDecoration: 'none' }}>
                                                <span>Cơ sở y tế</span>
                                            </Link> */}
                                        </div>
                                    </PopperWrapper>
                                </div>

                            )}
                        >
                            <span>  Đặt khám   <FontAwesomeIcon icon={faChevronDown} className={cx('icon')} /></span>
                        </Tippy>

                        <Link to="/facilities" style={{ textDecoration: 'none' }}>
                            <span> Chuyên khoa</span>
                        </Link>

                        <Link to="/historypage" style={{ textDecoration: 'none' }}>
                            <span>Lịch sử đặt khám</span>
                        </Link>

                        <span>Hỏi bác sĩ </span>


                    </div>


                </div>
            </div>
        </div>
    )
}
export default Header;