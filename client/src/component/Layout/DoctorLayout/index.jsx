import { useState, useEffect } from 'react'; // Thêm useEffect
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './DoctorLayout.module.scss'; // Import styles riêng cho layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

// Các component quản lý
import ManagePatients from '../../ManagePatients';  // Quản lý bệnh nhân
import ManageSchedules from '../../ManageSchedules'; // Quản lý ca khám
import ManageMedicals from '../../ManageMedicals';
import Register_schedules from '../../Register_schedules';
const cx = classNames.bind(styles);

const DoctorLayout = () => {
  const navigate = useNavigate(); // Khai báo hook useNavigate
  const [activeTab, setActiveTab] = useState('patients'); // Quản lý bệnh nhân là mặc định
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [doctorName, setDoctorName] = useState("");

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
  }
  const hideMenu = () => {
    setIsMenuVisible(false);
  }
  const handleLogout = () => {
    localStorage.removeItem('user');
    setDoctorName('');
    setUserName('');
    navigate('/login'); // chuyển hướng về trang login
  };
  return (
    <div className={cx('layout')}>
      {/* Header mới */}
      <div className={cx('header')}>
        <div className={cx('logo')}>
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
        <div className={cx('sidebar')}>
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