import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Tippy from '@tippyjs/react/headless';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.scss'
import { Wrapper as PopperWrapper } from '../../../Popper';
import Button from '../../../Button';
const cx = classNames.bind(styles)
const currentUser = true
function Header() {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const toggleMenu = () => {
        setIsMenuVisible((prev) => !prev);
    };

    const hideMenu = () => {
        setIsMenuVisible(false);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('infor')}>
                    <span>Hotline đặt khám: 0982333</span>
                        {currentUser ? (
                            <div className={cx('action')}>
                                <span>Xin chào nyung1107</span>
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
                                                onClick={() => {
                                                    alert('Đăng xuất thành công');
                                                    hideMenu();
                                                }}
                                            >
                                                Đăng xuất
                                            </Link>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <>
                                <Button primary onClick={() => alert('click')}>
                                    Log In
                                </Button>
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