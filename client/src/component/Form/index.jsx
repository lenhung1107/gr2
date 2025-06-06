import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

const Form = ({ onClose, service, date, time, appointmentType }) => {
  const [isForSelf, setIsForSelf] = useState(null);
  const [savedPatients, setSavedPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [addingNew, setAddingNew] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchSavedPatients = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && isForSelf === false) {
        try {
          const res = await fetch(`https://gr2-hdy0.onrender.com/appointment/getAppoinmentByUserId/${user._id}`);
          const data = await res.json();
          // Lọc danh sách người từng đặt hộ và loại bỏ trùng lặp theo tên + SĐT
          const filtered = data.filter(a => a.isForSomeone &&
            a.name !== "Đã xoá" &&
            a.phone !== "Không có").map(a => ({
              id: a._id,
              name: a.name,
              phone: a.phone,
              age: a.age
            }));
          const unique = Array.from(new Map(filtered.map(p => [p.phone, p])).values());
          setSavedPatients(unique);
        } catch (err) {
          console.error('Lỗi lấy danh sách bệnh nhân đã đặt hộ:', err);
        }
      }
    };

    fetchSavedPatients();
  }, [isForSelf]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      alert('Bạn cần đăng nhập');
      return;
    }
    const formatDateToLocalString = (date) => {
      const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
      return offsetDate.toISOString().split('T')[0];
    };
    let appointmentData = {
      user_id: user._id,
      service_id: service._id,
      appointment_type: appointmentType,
      appointment_date: date ? formatDateToLocalString(date) : null,
      appointment_time: time,
      symptoms: document.getElementById("reason")?.value || "",
      isForSomeoneElse: isForSelf === false,
    };

    if (isForSelf === false) {
      if (!addingNew) {
        const selected = savedPatients.find(p => p.id === selectedPatientId);
        if (!selected) return alert('Vui lòng chọn người bệnh');
        appointmentData = {
          ...appointmentData,
          patient_name: selected.name,
          patient_age: selected.age,
          patient_phone: selected.phone,
        };
      } else {
        appointmentData = {
          ...appointmentData,
          patient_name: document.getElementById("name")?.value,
          patient_age: document.getElementById("age")?.value,
          patient_phone: document.getElementById("phone")?.value,
        };
      }
    }
    console.log(appointmentData);
    try {
      const response = await fetch("https://gr2-hdy0.onrender.com/appointment/bookAppointment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage(data.message || "Đặt lịch khám thành công !");
      } else {
        alert("Lỗi: " + data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={cx('overlay')}>
      {/* <div className={cx('wrapper')}> */}
    
      {successMessage ? (
        <div className={cx('successPopup')}>
          {/* <span className={cx('successIcon')}>✅</span> */}
          <FontAwesomeIcon icon={faCircleCheck} className={cx('successIcon')} />
          <p>{successMessage}</p>
          <button onClick={() => window.location.href = '/'}>OK</button>
        </div>
      ) : (
        <div className={cx("wrapper")}>
         <button className={cx('closeButton')} onClick={onClose}>×</button>
          <h2 className={cx('title')}>Thông tin đặt lịch khám bệnh</h2>
          <div className={cx('infoSection')}>
            <img
              src={service.image || 'doctor.png'}
              alt={service.name}
              className={cx('doctorImage')}
            />
            <div className={cx('doctorInfo')}>
              <h3>{service.name}</h3>
              <p>Chuyên khoa: {service.specialty}</p>
              <p>Ngày khám: {date ? date.toLocaleDateString('vi-VN') : 'Chưa chọn'}</p>
              <p>Giờ khám: {time || 'Chưa chọn'}</p>
              <p>Giá khám: {service.price}</p>
            </div>
          </div>

          <form className={cx('form')} onSubmit={handleSubmit}>
            <div className={cx('formGroup')}>
              <label>Loại đặt lịch:</label>
              <select onChange={(e) => {
                const val = e.target.value;
                setIsForSelf(val === 'self');
                setAddingNew(false);
                setSelectedPatientId('');
              }}>
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
                <div className={cx('formGroup')}>
                  <label>Chọn hồ sơ bệnh nhân cũ:</label>
                  <select value={selectedPatientId} onChange={e => {
                    setSelectedPatientId(e.target.value);
                    setAddingNew(false);
                  }}>
                    <option value="">-- Chọn bệnh nhân --</option>
                    {savedPatients.map(p => (
                      <option key={p.id} value={p.id}>{p.name} - {p.phone}</option>
                    ))}
                  </select>
                  <button type="button" className={cx('addNewButton')} onClick={() => {
                    setAddingNew(true);
                    setSelectedPatientId('');
                  }}>+ Thêm người mới</button>
                </div>
                {addingNew && (
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
                )}
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
        </div>
      )}
    </div>
  );
};

Form.propTypes = {
  onClose: PropTypes.func.isRequired,
  service: PropTypes.object.isRequired,
  date: PropTypes.object,
  time: PropTypes.string,
  appointmentType: PropTypes.string,
};

export default Form;
