import classNames from 'classnames/bind';
import styles from './Form.module.scss';
import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

const Form = ({ onClose, doctor, date, time }) => {
  return (
    <div className={cx('overlay')}>
      <div className={cx('wrapper')}>
        <button className={cx('closeButton')} onClick={onClose}>
          ×
        </button>
        <h2 className={cx('title')}>Thông tin đặt lịch khám bệnh</h2>
        <div className={cx('infoSection')}>
          <img
            src={doctor.image || "doctor.png"} // Sử dụng ảnh từ doctor hoặc fallback
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
        <form className={cx('form')}>
          <div className={cx('formRow')}>
            <div className={cx('formGroup')}>
              <label htmlFor="name">Tên bệnh nhân:</label>
              <input type="text" id="name" name="name" required />
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
          <div className={cx('actions')}>
            <button type="submit" className={cx('submitButton')}>Xác nhận</button>
            <button type="button" className={cx('cancelButton')} onClick={onClose}>Hủy</button>
          </div>
        </form>
      </div>
    </div>
  );
};

Form.propTypes = {
  onClose: PropTypes.func.isRequired,
  doctor: PropTypes.object.isRequired, // Thông tin bác sĩ
  date: PropTypes.object, // Ngày khám
  time: PropTypes.string, // Giờ khám
};

export default Form;
