import { useState, useEffect } from 'react'; // Thêm useEffect
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
  const [activeTab, setActiveTab] = useState('patients'); // Quản lý bệnh nhân là mặc định

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [doctorName, setDoctorName] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setDoctorName(parsedUser.name || "Bác sĩ");
      } catch (error) {
        console.error("Lỗi khi parse user từ localStorage:", error);
      }
    }
  }, []);
  
  return (
    <div className={cx('layout')}>
      {/* Header mới */}
      <div className={cx('header')}>
        <div className={cx('logo')}>
          <img src="ava_v2.png" alt="Logo ứng dụng" />
        </div>
        <div className={cx('avatar')}>
          <p>{doctorName}</p>
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
              <p className={cx('doctor-name')}>{doctorName}</p>
              <p className={cx('doctor-role')}>Bác Sĩ</p>
            </div>
          </div>
          <div className={cx('menu')}>
            <button
              className={cx('menu-item', { active: activeTab === 'patients' })}
              onClick={() => handleTabChange('patients')}
            >
              Quản Lý Bệnh Nhân
            </button>
            <button
              className={cx('menu-item', { active: activeTab === 'schedules' })}
              onClick={() => handleTabChange('schedules')}
            >
              Xem Lịch trình
            </button>
            <button
              className={cx('menu-item', { active: activeTab === 'register_schedules' })}
              onClick={() => handleTabChange('register_schedules')}
            >
              Đăng ký ca khám bệnh
            </button>
            <button
              className={cx('menu-item', { active: activeTab === 'medical' })}
              onClick={() => handleTabChange('medical')}
            >
              Quản Lý Hồ Sơ Khám Bệnh
            </button>
          </div>
        </div>
        <div className={cx('content')}>
          <div className={cx('tab-content')}>
            {activeTab === 'patients' && <ManagePatients  />}
            {activeTab === 'schedules' && <ManageSchedules />}
            {activeTab ==='medical' && <ManageMedicals />}
            {activeTab ==='register_schedules' && <Register_schedules />}
          </div>
        </div>
      </div>
    </div>


  );
};
export default DoctorLayout;