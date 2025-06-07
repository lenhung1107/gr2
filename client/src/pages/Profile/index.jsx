import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import ProfileForm from '../../component/Edit/ProfileEdit';
import styles from './Profile.module.scss';
import useFetchData from "../../CustomHook/useFetchData";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faUser, faEnvelope, faPhone, faVenusMars, faCalendarAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

const Profile = () => {
    const { id } = useParams();
    const apiUrl = `https://gr2-3t8u.onrender.com/user/getUser/${id}`;
    const { data: users, loading, error } = useFetchData(apiUrl);
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        if (users) {
            setUserData(users);
        }
    }, [users]);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleSave = (updatedUser) => {
        setUserData(updatedUser);
        setIsEditing(false);
    };

    if (loading) return (
        <div className={cx('loading-container')}>
            <div className={cx('loading-spinner')}></div>
            <div className={cx('loading-text')}>Đang tải thông tin...</div>
        </div>
    );

    if (error) return (
        <div className={cx('error-container')}>
            <div className={cx('error-text')}>Có lỗi xảy ra: {error}</div>
        </div>
    );

    return (
        <div className={cx('profile')}>
            <div className={cx('header')}>
                <h1 className={cx('title')}>Thông tin cá nhân</h1>
                <div className={cx('title-underline')}></div>
            </div>

            {isEditing ? (
                <ProfileForm user={userData} toggleEdit={toggleEdit} onSave={handleSave} />
            ) : (
                userData && (
                    <div className={cx('wrapper')}>
                        {/* Profile Header Section */}
                        <div className={cx('profile-header')}>
                            <div className={cx('avatar-section')}>
                                <div className={cx('avatar-wrapper')}>
                                    <img 
                                        src="/doctor.jpg" 
                                        height={120} 
                                        width={120} 
                                        alt="Profile" 
                                        className={cx('avatar-img')} 
                                    />
                                    <button 
                                        className={cx('upload-btn')}
                                        onClick={() => document.getElementById('fileInput').click()}
                                    >
                                        <FontAwesomeIcon icon={faUpload} />
                                    </button>
                                </div>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                />
                            </div>
                            
                            <div className={cx('basic-info')}>
                                <h2 className={cx('user-name')}>{userData.name}</h2>
                                <div className={cx('user-role')}>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span>{userData.username}</span>
                                </div>
                                <div className={cx('quick-info')}>
                                    <span className={cx('age-info')}>
                                        <FontAwesomeIcon icon={faCalendarAlt} />
                                        {userData.age} tuổi
                                    </span>
                                    <span className={cx('gender-info')}>
                                        <FontAwesomeIcon icon={faVenusMars} />
                                        {userData.gender}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Profile Content */}
                        <div className={cx('profile-content')}>
                            <div className={cx('info-grid')}>
                                {/* Contact Information */}
                                <div className={cx('info-section')}>
                                    <h3 className={cx('section-title')}>Thông tin liên hệ</h3>
                                    
                                    <div className={cx('field-group')}>
                                        <div className={cx('field', 'email-field')}>
                                            <div className={cx('field-header')}>
                                                <div className={cx('field-icon', 'email-icon')}>
                                                    <FontAwesomeIcon icon={faEnvelope} />
                                                </div>
                                                <label className={cx('field-label')}>Địa chỉ email</label>
                                            </div>
                                            <p className={cx('field-value')}>{userData.email}</p>
                                        </div>

                                        <div className={cx('field', 'phone-field')}>
                                            <div className={cx('field-header')}>
                                                <div className={cx('field-icon', 'phone-icon')}>
                                                    <FontAwesomeIcon icon={faPhone} />
                                                </div>
                                                <label className={cx('field-label')}>Số điện thoại</label>
                                            </div>
                                            <p className={cx('field-value')}>{userData.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Information */}
                                <div className={cx('info-section')}>
                                    <h3 className={cx('section-title')}>Thông tin cá nhân</h3>
                                    
                                    <div className={cx('field-group')}>
                                        <div className={cx('field', 'name-field')}>
                                            <div className={cx('field-header')}>
                                                <div className={cx('field-icon', 'name-icon')}>
                                                    <FontAwesomeIcon icon={faUser} />
                                                </div>
                                                <label className={cx('field-label')}>Họ và tên</label>
                                            </div>
                                            <p className={cx('field-value')}>{userData.name}</p>
                                        </div>

                                        <div className={cx('field', 'age-field')}>
                                            <div className={cx('field-header')}>
                                                <div className={cx('field-icon', 'age-icon')}>
                                                    <FontAwesomeIcon icon={faCalendarAlt} />
                                                </div>
                                                <label className={cx('field-label')}>Địa chỉ</label>
                                            </div>
                                            <p className={cx('field-value')}>{userData.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Edit Button */}
                            <div className={cx('action-section')}>
                                <button onClick={toggleEdit} className={cx('edit-button')}>
                                    <FontAwesomeIcon icon={faEdit} />
                                    <span>Chỉnh sửa thông tin</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
};

export default Profile;