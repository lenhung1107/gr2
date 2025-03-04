import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss'; // Import styles riêng cho layout
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserMd } from '@fortawesome/free-solid-svg-icons';

// Các component quản lý
import ManageUsers from '../../ManageUsers'; // Quản lý bệnh nhân
import ManageSchedules from '../../ManageSchedules'; // Quản lý ca khám
import ManageDoctors from '../../ManageDoctors'; // Quản lý bác sĩ

const cx = classNames.bind(styles);

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('patients'); // Quản lý bệnh nhân là mặc định
  const [adminName, setAdminName] = useState(''); // Tên admin
  const[userName, setUserName]=useState('');
  useEffect(() => {
    // Lấy thông tin user từ localStorage
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

  return (
    <div className={cx('layout')}>
      {/* Header mới */}
      <div className={cx('header')}>
        <div className={cx('logo')}>
          <img src="ava_v2.png" alt="Logo ứng dụng" />
        </div>
        <div className={cx('avatar')}>
          <p>{userName}</p> {/* Hiển thị tên admin */}
          <img src="doctor.jpg" alt="Avatar bác sĩ" />
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
              className={cx('menu-item', { active: activeTab === 'patients' })}
              onClick={() => handleTabChange('patients')}
            >
              Quản Lý Người dùng
            </button>
            <button
              className={cx('menu-item', { active: activeTab === 'schedules' })}
              onClick={() => handleTabChange('schedules')}
            >
              Quản Lý Ca Khám Bệnh
            </button>
            <button
              className={cx('menu-item', { active: activeTab === 'doctors' })}
              onClick={() => handleTabChange('doctors')}
            >
              Quản Lý Bác Sĩ
            </button>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('tab-content')}>
            {activeTab === 'patients' && <ManageUsers />}
            {activeTab === 'schedules' && <ManageSchedules />}
            {activeTab === 'doctors' && <ManageDoctors />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
