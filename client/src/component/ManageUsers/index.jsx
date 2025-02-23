import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageUsers.module.scss";
import users from "../../data/userData";
import { useState } from "react";
const cx = classNames.bind(styles);


function ManageUsers() {
    const [searchName, setSearchName] = useState("");

    const [filteredUsers, setFilteredUsers] = useState(users); // Lưu danh sách bác sĩ được lọc
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
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

            // Trả về true nếu tìm thấy ở bất kỳ trường nào
            return matchesName || matchesAge || matchesGender || matchesAddress || matchesPhone || matchesEmail;
        });

        setFilteredUsers(filtered); // Cập nhật danh sách đã lọc
    };

    const handleReset = () => {
        setSearchName(""); // Xóa giá trị tìm kiếm theo tên
        setFilteredUsers(users); // Hiển thị lại toàn bộ dữ liệu
    }
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setshowConfirmDelete(true); // Hiện popup xác nhận
    };

    const confirmDelete = () => {
        setFilteredUsers(filteredUsers.filter((u) => u !== userToDelete));
        setshowConfirmDelete(false);
        setUserToDelete(null);
    };
    const handleEditClick = (user) => {
        setEditUser(user);
        setShowEditForm(true);
    };
    const handleEditChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };

    const handleSaveEdit = () => {
        setFilteredUsers(
            filteredUsers.map((user) => (user === editUser ? editUser : user))
        );
        setShowEditForm(false);
        setEditUser(null);
    };
    return (<div className={cx('wrapper')}>
        <h1>Quản lý Người dùng</h1>
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

                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredUsers.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.age}</td>
                        <td>{item.gender}</td>
                        <td>{item.address}</td>
                        <td>{item.phone}</td>
                        <td>{item.phone}</td>
                        <td>
                            <span><FontAwesomeIcon icon={faPenToSquare} className={cx('iconEdit')} onClick={() => handleEditClick(item)} /></span>
                            <span><FontAwesomeIcon icon={faTrash} className={cx('iconTrash')} onClick={() => { handleDeleteClick(item) }} /></span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {showConfirmDelete && (
            <div className={cx("popup")}>
                <div className={cx("popupContent")}>
                    <p>Bạn có chắc chắn muốn xóa <strong>{userToDelete?.name}</strong>  không?</p>
                    <div className={cx("popupButtons")}>
                        <button onClick={confirmDelete}>Có</button>
                        <button onClick={() => setshowConfirmDelete(false)}>Không</button>
                    </div>
                </div>
            </div>
        )}
        {showEditForm && (
            <div className={cx("popupEdit")}>
                <div className={cx("popupContent-Edit")}>
                    <h3>Chỉnh sửa thông tin</h3>
                    <label>Họ và tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={editUser?.name || ""}
                        onChange={handleEditChange}
                    />

                    <label>Tuổi:</label>
                    <input
                        type="number"
                        name="age"
                        value={editUser?.age || ""}
                        onChange={handleEditChange}
                    />

                    <label>Giới tính:</label>
                    <select
                        name="gender"
                        value={editUser?.gender || ""}
                        onChange={handleEditChange}
                    >
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                    </select>

                    <label>Địa chỉ:</label>
                    <input
                        type="text"
                        name="address"
                        value={editUser?.address || ""}
                        onChange={handleEditChange}
                    />

                    <label>Số điện thoại:</label>
                    <input
                        type="text"
                        name="phone"
                        value={editUser?.phone || ""}
                        onChange={handleEditChange}
                    />

                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={editUser?.email || ""}
                        onChange={handleEditChange}
                    />

                    <div className={cx("popupButtons")}>
                        <button onClick={handleSaveEdit}>Lưu</button>
                        <button onClick={() => setShowEditForm(false)}>
                            Hủy
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>);
}

export default ManageUsers;