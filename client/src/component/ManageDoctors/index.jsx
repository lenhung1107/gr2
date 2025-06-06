import classNames from "classnames/bind";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageDoctors.module.scss";
import EditForm from "../Edit/EditForm";
import { useState, useEffect} from "react";
import axios from "axios";
const cx = classNames.bind(styles);

function ManageDoctors() {
    const [doctorData, setDoctorData]= useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:4000/doctor", {
                });
                setDoctorData(response.data); // Cập nhật danh sách ban đầu
                setFilteredDoctors(response.data); // C)
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        };
        fetchUsers();
        
    }, []); 
    const [searchName, setSearchName] = useState("");
    const [selectBio, setSelectBio] = useState("");
    const [filteredDoctors, setFilteredDoctors] = useState([]); // Lưu danh sách bác sĩ được lọc
    const [showConfirmDelete, setshowConfirmDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const handleSearch = () => {
        const filtered = doctorData.filter((doctor) => {
            const matchesName = searchName === "" || doctor.name.toLowerCase().includes(searchName.toLowerCase());
            const matchesBio = selectBio === "" || doctor.bio === selectBio;
            return matchesName && matchesBio;
        })
        setFilteredDoctors(filtered); 

    }
    const handleReset = () => {
        setSearchName(""); 
        setSelectBio(""); 
        setFilteredDoctors(doctorData); 
    }
    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setshowConfirmDelete(true); 
    };
    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/adminpage/deleteDoctor/${userToDelete._id}`);
            const updatedUsers = doctorData.filter((u) => u._id !== userToDelete._id);
            setDoctorData(updatedUsers);
            setFilteredDoctors(updatedUsers);
         
            setUserToDelete(null);
            setshowConfirmDelete(false);
  
            toast.success("Xóa bác sĩ thành công!");

        } catch (error) {
            console.error("Lỗi khi xóa bác sĩ:", error);
            alert("Không thể xóa bác sĩ!");
        }
    };
    const handleEditClick = (user) => {
        setEditUser(user);
        setShowEditForm(true);
    };
    const handleEditChange = (e) => {
        setEditUser({ ...editUser, [e.target.name]: e.target.value });
    };
    const handleSaveEdit = () => {
        setShowEditForm(false);
        setEditUser(null);
    };
    return (<div className={cx('wrapper')}>
        <h1>Quản lý bác sĩ</h1>
        <h3>Bộ lọc </h3>
        <div className={cx('filter')}>

            <div className={cx('input')}>
                <input type="text" placeholder="Họ và tên"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
            </div>
            <div className={cx('select')}>
                <select name="bio" id="bio"
                    value={selectBio}
                    onChange={(e) => setSelectBio(e.target.value)}
                >
                    <option value="" disabled>Chọn chức danh</option>
                    <option value="Phó giáo sư tiến sĩ">Phó giáo sư tiến sĩ</option>
                    <option value="Bác sĩ">Bác sĩ</option>
                    <option value="Y tá">Y tá</option>
                    <option value="Trưởng khoa">Trưởng khoa</option>
                </select>

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
                    <th>Hình ảnh</th>
                    <th>Họ và tên</th>
                    <th>Chức vị</th>
                    <th>Chuyên khoa</th>

                    <th></th>
                </tr>
            </thead>
            <tbody>
                {filteredDoctors.map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={item.image} height={50} width={50} /></td>
                        <td>{item.name}</td>
                        <td>{item.bio}</td>
                        <td>{item.specialty}</td>
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
            <EditForm
                user={editUser}
                onChange={handleEditChange}
                onSave={handleSaveEdit}
                onCancel={() => setShowEditForm(false)}
            />
        )}
        <ToastContainer />
    </div>);
}

export default ManageDoctors;