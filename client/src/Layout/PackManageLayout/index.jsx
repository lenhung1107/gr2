import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './PackManageLayout.module.scss'; // Import styles riêng cho layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import ManageMedicalsByAdmin from '../../component/ManageMedicalsByAdmin';
import ManageOrderPacks from '../../component/ManageOrderPacks';
import ManagePacksAssign from '../../component/ManagePacksAssign';
const cx = classNames.bind(styles);

const PackManageLayout = () => {
  const navigate = useNavigate(); // Khai báo hook useNavigate

  const [activeTab, setActiveTab] = useState('packs'); // Quản lý bệnh nhân là mặc định
  const [adminName, setAdminName] = useState(''); // Tên admin
  const [userName, setUserName] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  }
  const hideMenu = () => {
    setIsMenuVisible(false);
  }
  useEffect(() => {
    // Lấy thông tin user từ localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);    
          setAdminName(userData.name); // Gán tên admin
          setUserName(userData.username)
      } catch (error) {
        console.error('Lỗi khi đọc user từ localStorage:', error);
      }
    }
  }, []);
 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleLogout = () => {
    localStorage.removeItem('user');
    setAdminName('');
    setUserName('');
    navigate('/login'); // chuyển hướng về trang login
  };
  console.log(adminName);
  return (
    <div className={cx('layout')}>
      {/* Header mới */}
      <div className={cx('header')}>
        <div className={cx('logo')}>
          <img src="/ava_v2.png" alt="Logo ứng dụng" onClick={toggleMenu} />

        </div>
        <div className={cx('avatar')}>
          {userName ? (
            <div className={cx('user-section')}>
              <p>{userName}</p>
              <img
                src="/doctor.jpg"
                alt="Avatar bác sĩ"
                onClick={toggleMenu}
                className={cx('avatar-img')}
              />
              {isMenuVisible && (
                <div className={cx('menu-dropdown')} onMouseLeave={hideMenu}>
                  <Link to="/profile" className={cx('menu-item')} onClick={hideMenu}>
                    Hồ sơ cá nhân
                  </Link>
                  <button className={cx('menu-item')} onClick={handleLogout}>
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/login')} className={cx('login-button')}>
              Đăng nhập / Đăng ký
            </button>
          )}
        </div>

      </div>
      <div className={cx('main')}>
        <div className={cx('sidebar')}>
          <div className={cx('doctor-info')}>
            <div className={cx('icon-doctor')}>
              <FontAwesomeIcon icon={faUserMd} className={cx('icon')} />
            </div>
            <div className={cx('info')}>
              <p className={cx('doctor-name')}>{adminName}</p>
              <p className={cx('doctor-role')}>Quản lý </p>
            </div>
          </div>
          <div className={cx('menu')}>
            <button
              className={cx('menu-itemList', { active: activeTab === 'packs' })}
              onClick={() => handleTabChange('packs')}
            >
              Quản Lý Ca Khám
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'assign' })}
              onClick={() => handleTabChange('assign')}
            >
              Quản Lý Ca khám Được Chỉ Định
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'medical' })}
              onClick={() => handleTabChange('medical')}
            >
              Quản Lý Hồ Sơ Khám Bệnh
            </button>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('tab-content')}>
            {activeTab === 'packs' && <ManageOrderPacks />}
            {activeTab === 'assign' && <ManagePacksAssign />}
            {activeTab === 'medical' && <ManageMedicalsByAdmin />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackManageLayout;
