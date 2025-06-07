import classNames from "classnames/bind";
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageUsers.module.scss";
import { useState, useEffect } from "react";

import EditForm from "../Edit/EditForm";
import axios from "axios";

const cx = classNames.bind(styles);

function ManageUsers() {
    const [users, setUsers] = useState([]);  // Danh sách tất cả người dùng
    const [filteredUsers, setFilteredUsers] = useState([]); // Danh sách lọc theo tìm kiếm
    const [searchName, setSearchName] = useState("");

    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editUser, setEditUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("https://gr2-3t8u.onrender.com/adminpage/getUser", {
                });
                setUsers(response.data);
                setFilteredUsers(response.data); // Cập nhật danh sách ban đầu
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        };
        fetchUsers();
    }, []);

    const handleSearch = () => {
        const searchText = searchName.toLowerCase();
        const filtered = users.filter((user) =>
            user.name.toLowerCase().includes(searchText) ||
            user.age.toString().includes(searchText) ||
            user.gender.toLowerCase().includes(searchText) ||
            user.address.toLowerCase().includes(searchText) ||
            user.phone.includes(searchText) ||
            user.email.toLowerCase().includes(searchText)
        );
        setFilteredUsers(filtered);
    };

    // Reset danh sách về ban đầu
    const handleReset = () => {
        setSearchName("");
        setFilteredUsers(users);
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setshowConfirmDelete(true);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`https://gr2-3t8u.onrender.com/adminpage/deleteUser/${userToDelete._id}`);

            const updatedUsers = users.filter((u) => u._id !== userToDelete._id);
            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            setUserToDelete(null);
            setshowConfirmDelete(false);
            toast.success("Xóa người dùng thành công!");

        } catch (error) {
            console.error("Lỗi khi xóa người dùng:", error);
            alert("Không thể xóa người dùng!");
        }
    };


    const handleEditClick = (user) => {
        setEditUser(user);
        setShowEditForm(true);
    };

    const handleEditChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(
                `https://gr2-3t8u.onrender.com/user/editUser/${editUser._id}`,
                editUser
            );

            const updatedUser = response.data;

            const updatedUsers = users.map(user =>
                user._id === updatedUser._id ? updatedUser : user
            );

            setUsers(updatedUsers);
            setFilteredUsers(updatedUsers);
            setShowEditForm(false);
            setEditUser(null);
            toast.success("Cập nhật người dùng thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật người dùng:", error);
            toast.error("Cập nhật thất bại!");
        }
    };


    return (
        <div className={cx('wrapper')}>
            <h1>Quản lý Người dùng</h1>
            <h3>Bộ lọc</h3>
            <div className={cx('filter')}>
                <div className={cx('input')}>
                    <input
                        type="text"
                        placeholder="Nhập vào tìm kiếm"
                        value={searchName}
                        onChange={(e) => setSearchName(e.target.value)}
                    />
                </div>
            </div>
            <div className={cx('button')}>
                <button type="submit" onClick={handleSearch}>Tìm kiếm</button>
                <button type="reset" onClick={handleReset}>Reset</button>
            </div>

            <table className={cx('table')}>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Họ và tên</th>
                        <th>Tuổi</th>
                        <th>Giới tính</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsers.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.age}</td>
                            <td>{item.gender}</td>
                            <td>{item.address}</td>
                            <td>{item.phone}</td>
                            <td>{item.email}</td>
                            <td>
                                <span><FontAwesomeIcon icon={faPenToSquare} className={cx('iconEdit')} onClick={() => handleEditClick(item)} /></span>
                                <span><FontAwesomeIcon icon={faTrash} className={cx('iconTrash')} onClick={() => handleDeleteClick(item)} /></span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showConfirmDelete && (
                <div className={cx("popup")}>
                    <div className={cx("popupContent")}>
                        <p>Bạn có chắc chắn muốn xóa <strong>{userToDelete?.name}</strong> không?</p>
                        <div className={cx("popupButtons")}>
                            <button onClick={confirmDelete}>Có</button>
                            <button onClick={() => setshowConfirmDelete(false)}>Không</button>
                        </div>
                    </div>
                </div>
            )}

            {showEditForm && (
                <EditForm
                    user={editUser}
                    onChange={handleEditChange}
                    onSave={handleSaveEdit}
                    onCancel={() => setShowEditForm(false)}
                />
            )}
        </div>
    );
}

export default ManageUsers;
