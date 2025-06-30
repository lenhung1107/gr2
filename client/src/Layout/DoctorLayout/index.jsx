import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DoctorLayout.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import ManagePatients from '../../component/ManagePatients';
import ManageSchedules from '../../component/ManageSchedules';
import ManageMedicals from '../../component/ManageMedicals';
import Register_schedules from '../../component/Register_schedules';

const cx = classNames.bind(styles);

const DoctorLayout = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('patients');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isMobileSidebarVisible, setIsMobileSidebarVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [doctorName, setDoctorName] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setIsMobileSidebarVisible(false);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser) {
          setDoctorName(parsedUser.name || "Bác sĩ");
          setUserName(parsedUser.username);
        }
      } catch (error) {
        console.error("Lỗi khi parse user từ localStorage:", error);
      }
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuVisible((prev) => !prev);
  };

  const hideMenu = () => {
    setIsMenuVisible(false);
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarVisible((prev) => !prev);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setDoctorName('');
    setUserName('');
    navigate('/login');
  };

  return (
    <div className={cx('layout')}>

      <div className={cx('header')}>
        <div className={cx('logo')}>
          <button 
            className={cx('mobile-menu-toggle')} 
            onClick={toggleMobileSidebar}
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={isMobileSidebarVisible ? faTimes : faBars} />
          </button>
          <img src="/ava_v2.png" alt="Logo ứng dụng" />
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
        {isMobileSidebarVisible && (
          <div 
            className={cx('mobile-overlay')} 
            onClick={closeMobileSidebar}
          />
        )}
        <div className={cx('sidebar', { 'mobile-visible': isMobileSidebarVisible })}>
          <div className={cx('doctor-info')}>
            <div className={cx('icon-doctor')}>
              <FontAwesomeIcon icon={faUserMd} className={cx('icon')} />
            </div>
            <div className={cx('info')}>
              <p className={cx('doctor-name')}>{doctorName}</p>
              <p className={cx('doctor-role')}>Bác Sĩ</p>
            </div>
          </div>
          <div className={cx('menu')}>
            <button
              className={cx('menu-itemList', { active: activeTab === 'patients' })}
              onClick={() => handleTabChange('patients')}
            >
              Quản Lý Bệnh Nhân
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'schedules' })}
              onClick={() => handleTabChange('schedules')}
            >
              Xem Lịch trình
            </button>
            <button
              className={cx('menu-itemList', { active: activeTab === 'register_schedules' })}
              onClick={() => handleTabChange('register_schedules')}
            >
              Đăng ký ca khám bệnh
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
            {activeTab === 'patients' && <ManagePatients />}
            {activeTab === 'schedules' && <ManageSchedules />}
            {activeTab === 'medical' && <ManageMedicals />}
            {activeTab === 'register_schedules' && <Register_schedules />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorLayout;