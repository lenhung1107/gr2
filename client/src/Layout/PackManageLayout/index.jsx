import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './PackManageLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import ManageMedicalsByAdmin from '../../component/ManageMedicalsByAdmin';
import ManageOrderPacks from '../../component/ManageOrderPacks';
import ManagePacksAssign from '../../component/ManagePacksAssign';

const cx = classNames.bind(styles);

const PackManageLayout = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('packs');
  const [adminName, setAdminName] = useState('');
  const [userName, setUserName] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const userData = JSON.parse(storedUser);    
        setAdminName(userData.name);
        setUserName(userData.username);
      } catch (error) {
        console.error('Lỗi khi đọc user từ localStorage:', error);
      }
    }
  }, []);

  // Đóng sidebar khi click outside trên mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.querySelector(`.${cx('sidebar')}`);
      const hamburger = document.querySelector(`.${cx('hamburger-menu')}`);
      
      if (isSidebarVisible && sidebar && !sidebar.contains(event.target) && 
          hamburger && !hamburger.contains(event.target)) {
        setIsSidebarVisible(false);
      }
    };

    if (isSidebarVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarVisible]);
 
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Đóng sidebar sau khi chọn tab trên mobile
    if (window.innerWidth <= 768) {
      setIsSidebarVisible(false);
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
        <div className={cx('header-left')}>
          {/* Hamburger menu cho mobile */}
          <button 
            className={cx('hamburger-menu')}
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <FontAwesomeIcon 
              icon={isSidebarVisible ? faTimes : faBars} 
              className={cx('hamburger-icon')}
            />
          </button>
          
          <div className={cx('logo')}>
            <img src="/ava_v2.png" alt="Logo ứng dụng" />
          </div>
        </div>

        <div className={cx('avatar')}>
          {userName ? (
            <div className={cx('user-section')}>
              <p className={cx('username')}>{userName}</p>
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

      {/* Overlay cho mobile khi sidebar mở */}
      {isSidebarVisible && <div className={cx('overlay')} onClick={closeSidebar}></div>}

      <div className={cx('main')}>
        <div className={cx('sidebar', { 'sidebar-visible': isSidebarVisible })}>
          <div className={cx('sidebar-header')}>
            <button 
              className={cx('close-sidebar')}
              onClick={closeSidebar}
              aria-label="Close sidebar"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className={cx('doctor-info')}>
            <div className={cx('icon-doctor')}>
              <FontAwesomeIcon icon={faUserMd} className={cx('icon')} />
            </div>
            <div className={cx('info')}>
              <p className={cx('doctor-name')}>{adminName}</p>
              <p className={cx('doctor-role')}>Quản lý</p>
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