import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageMedicalsByAdmin.module.scss";
import { useState, useEffect } from "react";
import MedicalDetail from "../MedicalDetail";
import axios from "axios";

const cx = classNames.bind(styles);

function ManageMedicalsByAdmin() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [ShowMedical, setShowMedical] = useState(false);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://gr2-3t8u.onrender.com/patient/getAllPatient");
                setUsers(response.data.patients || []);
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(users);
    }, [users]);

    const handleSearch = () => {
        const searchText = searchName.trim().toLowerCase();

        const filtered = users.filter((user) => {
            const name = (user.name || "").toLowerCase();
            const age = (user.age || "").toString();
            const gender = (user.gender || "").toLowerCase();
            const address = (user.address || "").toLowerCase();
            const phone = (user.phone || "");
            const email = (user.email || "").toLowerCase();

            return (
                name.includes(searchText) ||
                age.includes(searchText) ||
                gender.includes(searchText) ||
                address.includes(searchText) ||
                phone.includes(searchText) ||
                email.includes(searchText)
            );
        });

        setFilteredUsers(filtered);
    };

    const handleReset = () => {
        setSearchName("");
        setFilteredUsers(users);
    };

    const handleShowMedical = (user) => {
        setEditUser(user);
        setShowMedical(true);
    };

    return (
        <div className={cx("wrapper")}>
            <h1>Quản lý Hồ sơ khám bệnh</h1>
            <h3>Bộ lọc</h3>
            <div className={cx("filter")}>
                <div className={cx("input")}>
                    <input
                        type="text"
                        placeholder="Nhập vào tìm kiếm"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx("button")}>
                <button type="submit" onClick={handleSearch}>
                    Tìm kiếm
                </button>
                <button type="reset" onClick={handleReset}>
                    Reset
                </button>
            </div>

            <div className={cx("viewInfor")}>
                <table className={cx("table")}>
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
                                    <span>
                                        <FontAwesomeIcon
                                            icon={faCircleInfo}
                                            className={cx("iconEdit")}
                                            title="Xem hồ sơ khám bệnh"
                                            onClick={() => handleShowMedical(item)}
                                        />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {ShowMedical && (
                <MedicalDetail user={editUser} onCancel={() => setShowMedical(false)} />
            )}
        </div>
    );
}

export default ManageMedicalsByAdmin;
