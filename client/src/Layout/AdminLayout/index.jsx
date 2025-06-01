import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

// Các component Quản Lý
import ManageUsers from '../../component/ManageUsers';
import ManageDoctors from '../../component/ManageDoctors';
import ManageMedicalsByAdmin from '../../component/ManageMedicalsByAdmin';
import ManageAppointments from '../../component/ManageAppointments';
import ManagePacks from '../../component/ManagePacks';
import ManageTest from '../../component/ManageTest';
import ManageStatisticst from '../../component/ManageStatisticst'

const cx = classNames.bind(styles);

const AdminLayout = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('patients');
  const [adminName, setAdminName] = useState('');
  const [userName, setUserName] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State cho mobile sidebar

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  }

  const hideMenu = () => {
    setIsMenuVisible(false);
  }

  // Toggle sidebar trên mobile
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        if (userData.admin) {
          setAdminName(userData.name);
          setUserName(userData.username)
        }
      } catch (error) {
        console.error('Lỗi khi đọc user từ localStorage:', error);
      }
    }
  }, []);

  // Đóng sidebar khi resize về desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Đóng sidebar khi nhấn ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Đóng sidebar trên mobile sau khi chọn menu
    if (window.innerWidth <= 768) {
      closeSidebar();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setAdminName('');
    setUserName('');
    navigate('/login');
  };

  return (
    <div className={cx('layout')}>
      {/* Header */}
      <div className={cx('header')}>
        <div className={cx('logo')}>
          <button 
            className={cx('mobile-menu-toggle')} 
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
          </button>
          <img src="ava_v2.png" alt="Logo ứng dụng" />
        </div>
        
        <div className={cx('avatar')}>
          {userName ? (
            <div className={cx('user-section')}>
              <p className={cx('username')}>{userName}</p>
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

      {/* Overlay cho mobile */}
      {isSidebarOpen && (
        <div 
          className={cx('sidebar-overlay')} 
          onClick={closeSidebar}
        />
      )}

      <div className={cx('main')}>
        <div className={cx('sidebar', { 'sidebar-open': isSidebarOpen })}>
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
            </button>
            
            <button
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
            {activeTab === 'testOrder' && <ManageTest />}
            {activeTab === 'statistics' && <ManageStatisticst />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;