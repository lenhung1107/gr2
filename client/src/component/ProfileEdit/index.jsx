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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(`http://localhost:3000/user/editUser/${user._id}`, formData); // thay URL nếu khác
      onSave(res.data); // cập nhật lại FE
      toast.success('✅ Cập nhật thành công!');
      setTimeout(() => {
        toggleEdit();
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error('❌ Cập nhật thất bại!');
    }
  };

  return (
    <form className={cx('profile-form')} onSubmit={handleSubmit}>
      <div className={cx('form-group')}>
        <label htmlFor="name">Họ và tên:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className={cx('form-group')}>
        <label htmlFor="age">Tuổi:</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />
      </div>

      <div className={cx('form-group')}>
        <label htmlFor="address">Địa chỉ:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </div>

      <div className={cx('form-group')}>
        <label htmlFor="phone">Số điện thoại:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className={cx('form-actions')}>
        <button type="submit">Lưu</button>
        <button type="button" onClick={toggleEdit}>Hủy</button>
      </div>
    </form>

  );
};

ProfileForm.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired, // bắt buộc để gọi API
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
