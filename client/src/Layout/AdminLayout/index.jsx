import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss'; // Import styles riêng cho layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

// Các component Quản Lý
import ManageUsers from '../../component/ManageUsers'; // Quản Lý bệnh nhân
import ManageDoctors from '../../component/ManageDoctors'; // Quản Lý bác sĩ
import ManageMedicalsByAdmin from '../../component/ManageMedicalsByAdmin';
import ManageAppointments from '../../component/ManageAppointments';
import ManagePacks from '../../component/ManagePacks';
import ManageTest from '../../component/ManageTest';
import ManageStatisticst from '../../component/ManageStatisticst'
const cx = classNames.bind(styles);

const AdminLayout = () => {
  const navigate = useNavigate(); // Khai báo hook useNavigate

  const [activeTab, setActiveTab] = useState('patients'); // Quản Lý bệnh nhân là mặc định
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
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.admin) {
          setAdminName(userData.name); // Gán tên admin
          setUserName(userData.username)
        }
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

  return (
    <div className={cx('layout')}>
      {/* Header mới */}
      <div className={cx('header')}>
        <div className={cx('logo')}>
          <img src="ava_v2.png" alt="Logo ứng dụng" onClick={toggleMenu} />

        </div>
        <div className={cx('avatar')}>
          {userName ? (
            <div className={cx('user-section')}>
              <p>{userName}</p>
              <img
                src="doctor.jpg"
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
              <p className={cx('doctor-role')}>Quản trị viên</p>
            </div>
          </div>
          <div className={cx('menu')}>
            <button
              className={cx('menu-itemList', { active: activeTab === 'patients' })}
              onClick={() => handleTabChange('patients')}
            >
              Quản Lý Người dùng
            </button>

            <button
              className={cx('menu-itemList', { active: activeTab === 'doctors' })}
              onClick={() => handleTabChange('doctors')}
            >
              Quản Lý Bác Sĩ
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'appointments' })}
              onClick={() => handleTabChange('appointments')}
            >
              Quản Lý Các Yêu Cầu Khám
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'medical' })}
              onClick={() => handleTabChange('medical')}
            >
              Quản Lý Hồ Sơ Khám Bệnh
            </button><button
              className={cx('menu-itemList', { active: activeTab === 'pack' })}
              onClick={() => handleTabChange('pack')}
            >
               Quản Lý Dịch Vụ Gói Khám
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'testOrder' })}
              onClick={() => handleTabChange('testOrder')}
            >
              Quản Lý Các Loại Xét Nghiệm
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'statistics' })}
              onClick={() => handleTabChange('statistics')}
            >
              Thống kê hệ thống
            </button>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('tab-content')}>
            {activeTab === 'patients' && <ManageUsers />}
            {activeTab === 'doctors' && <ManageDoctors />}
            {activeTab === 'medical' && <ManageMedicalsByAdmin />}
            {activeTab === 'appointments' && <ManageAppointments />}
            {activeTab === 'pack' && <ManagePacks />}
            {activeTab === 'testOrder' && <ManageTest/>}
             {activeTab === 'statistics' && <ManageStatisticst/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
