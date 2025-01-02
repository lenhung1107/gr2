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
                            <span><FontAwesomeIcon icon={faPenToSquare} className={cx('iconEdit')} /></span>
                            <span><FontAwesomeIcon icon={faTrash} className={cx('iconTrash')} /></span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

    </div>);
}

export default ManageUsers;