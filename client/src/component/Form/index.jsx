import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Form = ({ onClose, doctor, date, time }) => {
  const [isForSelf, setIsForSelf] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Bạn cần đăng nhập');
      return;
    }
    const appointmentData = {
      user_id: user._id,
      doctor_id: doctor._id,
      appointment_date: date ? date.toISOString().split('T')[0] : null,
      appointment_time: time,
      symptoms: document.getElementById("reason")?.value || "",
      isForSomeoneElse: isForSelf === false,
      patient_name: isForSelf === false ? document.getElementById("name")?.value : null,
      patient_age: isForSelf === false ? document.getElementById("age")?.value : null,
      patient_phone: isForSelf === false ? document.getElementById("phone")?.value : null
    };

    try {
      const response = await fetch("http://localhost:3000/appointment/bookAppointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || "Đặt lịch thành công!");
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx('overlay')}>
      <div className={cx('wrapper')}>
        <button className={cx('closeButton')} onClick={onClose}>×</button>
        {successMessage ? (
          <div className={cx('successPopup')}>
            <span className={cx('successIcon')}>✅</span>
            <p>{successMessage}</p>
            <button onClick={() => window.location.href = '/'}>OK</button>
          </div>
        ) : (
          <>
            <h2 className={cx('title')}>Thông tin đặt lịch khám bệnh</h2>
            <div className={cx('infoSection')}>
              <img
                src={doctor.image || 'doctor.png'}
                alt={doctor.name}
                className={cx('doctorImage')}
              />
              <div className={cx('doctorInfo')}>
                <h3>{doctor.name}</h3>
                <p>Chuyên khoa: {doctor.specialty}</p>
                <p>Ngày khám: {date ? date.toLocaleDateString('vi-VN') : 'Chưa chọn'}</p>
                <p>Giờ khám: {time || 'Chưa chọn'}</p>
                <p>Giá khám: {doctor.price}</p>
              </div>
            </div>

            <form className={cx('form')} onSubmit={handleSubmit}>
              <div className={cx('formGroup')}>
                <label>Loại đặt lịch:</label>
                <select onChange={(e) => setIsForSelf(e.target.value === 'self')}>
                  <option value="" hidden>Chọn loại đặt lịch</option>
                  <option value="self">Khám cho bản thân</option>
                  <option value="other">Đặt khám hộ</option>
                </select>
              </div>

              {isForSelf === true && (
                <div className={cx('formGroup')}>
                  <label htmlFor="reason">Lý do khám:</label>
                  <input type="text" id="reason" name="reason" required />
                </div>
              )}

              {isForSelf === false && (
                <>
                  <div className={cx('formRow')}>
                    <div className={cx('formGroup')}>
                      <label htmlFor="name">Tên bệnh nhân:</label>
                      <input type="text" id="name" name="name" required />
                    </div>
                    <div className={cx('formGroup')}>
                      <label htmlFor="age">Tuổi:</label>
                      <input type="number" id="age" name="age" required />
                    </div>
                    <div className={cx('formGroup')}>
                      <label htmlFor="phone">Số điện thoại:</label>
                      <input type="tel" id="phone" name="phone" required />
                    </div>
                  </div>
                  <div className={cx('formGroup')}>
                    <label htmlFor="reason">Lý do khám:</label>
                    <input type="text" id="reason" name="reason" required />
                  </div>
                </>
              )}

              {isForSelf !== null && (
                <div className={cx('actions')}>
                  <button type="submit" className={cx('submitButton')}>Xác nhận</button>
                  <button type="button" className={cx('cancelButton')} onClick={onClose}>Hủy</button>
                </div>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
};

Form.propTypes = {
  onClose: PropTypes.func.isRequired,
  doctor: PropTypes.object.isRequired,
  date: PropTypes.object,
  time: PropTypes.string,
};

export default Form;
