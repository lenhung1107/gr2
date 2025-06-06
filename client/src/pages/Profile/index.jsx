import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import ProfileForm from '../../component/Edit/ProfileEdit';
import styles from './Profile.module.scss';
import useFetchData from "../../CustomHook/useFetchData";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Profile = () => {
    const { id } = useParams();
    const apiUrl = `http://localhost:4000/user/getUser/${id}`; // URL API khác cho từng trang
    const { data: users, loading, error } = useFetchData(apiUrl);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        if (users) {
            setUserData(users); // Cập nhật userData khi users đã fetch xong
        }
    }, [users]);
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (updatedUser) => {
        setUserData(updatedUser);
        setIsEditing(false);
    };
    if (loading) return <div>Đang tải thông tin bác sĩ...</div>;
    if (error) return <div>Có lỗi xảy ra: {error}</div>;
    return (
        <div className={cx('profile')}>
            <h2>Thông tin cá nhân</h2>
            {isEditing ? (
                <ProfileForm user={userData} toggleEdit={toggleEdit} onSave={handleSave} />
            ) : (
                userData && (
                    <div className={cx('wrapper')}>
                        <div className={cx('form')}>
                            <div className={cx('avt')}>
                                <img src="/doctor.jpg" height={160} width={160} alt="Logo" className={cx('img')} />
                            </div>
                            <button className={cx('change')}
                                onClick={() => document.getElementById('fileInput').click()}
                            >
                                <FontAwesomeIcon icon={faUpload} className={cx('icon')} />
                                Thay đổi ảnh
                            </button>
                            <input
                                type="file"
                                id="fileInput"
                                style={{ display: 'none' }}
                                accept="image/*"
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
                )
            )}
        </div>
    );

}

export default Profile;

