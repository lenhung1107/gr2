import { useState } from 'react';
import classNames from 'classnames/bind';
import ProfileForm from '../../component/ProfileEdit';
import styles from './Profile.module.scss';
import users from '../../data/userData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(users[0]); // Quản lý dữ liệu người dùng

    // Hàm bật/tắt chế độ chỉnh sửa
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    // Hàm xử lý upload ảnh

    // Hàm xử lý lưu thông tin người dùng sau khi chỉnh sửa
    const handleSave = (updatedUser) => {
        setUserData(updatedUser);
        setIsEditing(false); // Thoát khỏi chế độ chỉnh sửa
    };

    return (
        <div className={cx('profile')}>
            <h2>Thông tin cá nhân</h2>
            {isEditing ? (
                <ProfileForm user={userData} toggleEdit={toggleEdit} onSave={handleSave} />
            ) : (
                <div className={cx('wrapper')}>
                    <div className={cx('form')}>
                        <div className={cx('avt')}>
                            <img src={userData.src} height={160} width={160} alt="Logo" className={cx('img')} />
                        </div>
                        <button className={cx('change')}
                            onClick={() => document.getElementById('fileInput').click()}
                        > <FontAwesomeIcon icon={faUpload} className={cx('icon')} />Thay đổi ảnh</button>
                        <input
                            type="file"
                            id="fileInput"
                            style={{ display: 'none' }} // Ẩn input file
                            accept="image/*"
                            // onChange={handleImageChange} // Khi có file, xử lý
                        />
                        <div className={cx('infor')}>
                            <div className={cx('field')}>
                                <label>Họ và tên</label>
                                <p>{userData.name}</p>
                            </div>
                            <div className={cx('field')}>
                                <label>Tuổi</label>
                                <p>{userData.age}</p>
                            </div>
                            <div className={cx('field')}>
                                <label>Địa chỉ mail</label>
                                <p>{userData.email}</p>
                            </div>
                            <div className={cx('field')}>
                                <label>Giới tính</label>
                                <p>{userData.gender}</p>
                            </div>
                            <div className={cx('field')}>
                                <label>Số điện thoại</label>
                                <p>{userData.phone}</p>
                            </div>
                        </div>
                        <button onClick={toggleEdit} className={cx('edit-button')}>
                            Edit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Profile;

