import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageMedicalsByAdmin.module.scss";
import { useState, useEffect } from "react";
import MedicalDetail from "../MedicalDetail";
import axios from "axios";

const cx = classNames.bind(styles);


function ManageMedicalsByAdmin() {
    const [users, setUsers] = useState([]);  // Danh sách tất cả người dùng

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3000/patient/getAllPatient", {
                });
                
                setUsers(response.data.patients);       // 👈 chỉ lấy mảng bệnh nhân
                setFilteredUsers(response.data.patients);

            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        };
        fetchUsers();
    }, []);
    const [searchName, setSearchName] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users); // Lưu danh sách bác sĩ được lọc
    const [ShowMedical, setShowMedical] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const handleSearch = () => {
        const filtered = users.filter((user) => {
            // Chuyển chuỗi tìm kiếm về chữ thường
            const searchText = searchName.toLowerCase();

            // Kiểm tra nếu chuỗi tìm kiếm xuất hiện ở bất kỳ trường nào
            const matchesName = user.name.toLowerCase().includes(searchText);
            const matchesAge = user.age.toString().includes(searchText);
            const matchesGender = user.gender.toLowerCase().includes(searchText);
            const matchesAddress = user.address.toLowerCase().includes(searchText);
            const matchesPhone = user.phone.includes(searchText);
            const matchesEmail = user.email.toLowerCase().includes(searchText);

            return matchesName || matchesAge || matchesGender || matchesAddress || matchesPhone || matchesEmail;
        });

        setFilteredUsers(filtered); 
    };

    const handleReset = () => {
        setSearchName(""); 
        setFilteredUsers(users); 
    }
    const handleShowMedical = (user) => {
        setEditUser(user);
        setShowMedical(true);
    };

    return (
    <div className={cx('wrapper')}>
        <h1>Quản lý Hồ sơ khám bệnh</h1>
        <h3>Bộ lọc </h3>
        <div className={cx('filter')}>

            <div className={cx('input')}>
                <input type="text" placeholder="Nhập vào tìm kiếm"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
            </div>

        </div>
        <div className={cx('button')}>
            <button type="submit" onClick={handleSearch} >Tìm kiếm</button>
            <button type="reset" onClick={handleReset}>Reset</button>
        </div>

        <div className={cx('viewInfor')}>
            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Tuổi</th>
                        <th>Số điện thoại</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.phone}</td>
                            <td>
                                <span><FontAwesomeIcon icon={faCircleInfo} className={cx('iconEdit')} title="Xem hồ sơ khám bệnh" onClick={() => handleShowMedical(item)} /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {ShowMedical && (
            <MedicalDetail
                user={editUser}
                onCancel={() => setShowMedical(false)}
            />
        )}
    </div>);
}

export default ManageMedicalsByAdmin;