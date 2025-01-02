import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './ProfileEdit.module.scss';

const cx = classNames.bind(styles);

const ProfileForm = ({ user, toggleEdit }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    age: user.age,
    address: user.address,
    phone: user.phone,
    src: user.src,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Updated user data:', formData);
    toggleEdit();
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
        <label htmlFor="phone">Email:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div className={cx('form-group')}>
        <label htmlFor="src">Số điện thoại</label>
        <input
          type="number"
          id="src"
          name="src"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>
      <div className={cx('form-actions')}>
        <button type="submit">Save</button>
        <button type="button" onClick={toggleEdit}>Cancel</button>
      </div>
    </form>
  );
};

ProfileForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    address: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  toggleEdit: PropTypes.func.isRequired,
};

export default ProfileForm;
