import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import styles from './ProfileEdit.module.scss';
import axios from 'axios';

const cx = classNames.bind(styles);

const ProfileForm = ({ user, toggleEdit, onSave }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    address: user.address,
    phone: user.phone,
    src: user.src,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.put(`https://gr2-3t8u.onrender.com/user/editUser/${user._id}`, formData);
      onSave(res.data);
      toast.success('✅ Cập nhật thành công!');
      setTimeout(() => {
        toggleEdit();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('❌ Cập nhật thất bại!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cx('profile-form-container')}>
      <div className={cx('profile-form-header')}>
        <h2>Chỉnh sửa thông tin</h2>
        <p>Cập nhật thông tin cá nhân của bạn</p>
      </div>
      
      <form className={cx('profile-form')} onSubmit={handleSubmit}>
        <div className={cx('form-group')}>
          <label htmlFor="name">
            <span className={cx('label-text')}>Họ và tên</span>
            <span className={cx('required')}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nhập họ và tên"
            required
          />
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="age">
            <span className={cx('label-text')}>Tuổi</span>
            <span className={cx('required')}>*</span>
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Nhập tuổi"
            min="1"
            max="150"
            required
          />
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="address">
            <span className={cx('label-text')}>Địa chỉ</span>
            <span className={cx('required')}>*</span>
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ"
            required
          />
        </div>

        <div className={cx('form-group')}>
          <label htmlFor="phone">
            <span className={cx('label-text')}>Số điện thoại</span>
            <span className={cx('required')}>*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            pattern="[0-9]{10,11}"
            required
          />
        </div>

        <div className={cx('form-actions')}>
          <button 
            type="button" 
            className={cx('btn', 'btn-cancel')} 
            onClick={toggleEdit}
            disabled={isLoading}
          >
            Hủy
          </button>
          <button 
            type="submit" 
            className={cx('btn', 'btn-save')}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className={cx('loading-spinner')}></span>
                Đang lưu...
              </>
            ) : (
              'Lưu thay đổi'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired, 
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  toggleEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default ProfileForm;