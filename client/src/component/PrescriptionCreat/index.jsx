import classNames from "classnames/bind";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PrescriptionCreat.module.scss";
const cx = classNames.bind(styles);

function PrescriptionCreate({ patient, medicines, onClose }) {
    const [medicineList, setMedicineList] = useState(medicines || []); // Khởi tạo state từ prop
    const [newMedicine, setNewMedicine] = useState({
        name: "",
        unit: "",
        quantity: "",
        dosage: "",
    });

    // Hàm xử lý nhập liệu
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedicine({ ...newMedicine, [name]: value });
    };

    // Hàm thêm thuốc mới vào danh sách
    const handleAddMedicine = () => {
        if (newMedicine.name && newMedicine.unit && newMedicine.quantity && newMedicine.dosage) {
            setMedicineList([...medicineList, newMedicine]); // Cập nhật state
            setNewMedicine({ name: "", unit: "", quantity: "", dosage: "" }); // Reset input
        } else {
            alert("Vui lòng nhập đầy đủ thông tin thuốc!");
        }
    };

    // Hàm xóa thuốc khỏi danh sách
    const handleDeleteMedicine = (index) => {
        const updatedList = medicineList.filter((_, i) => i !== index);
        setMedicineList(updatedList); // Cập nhật state
    };

    return (
        <div className={cx("prescription-modal")}>
            <h3>Tạo đơn thuốc</h3>
            <div className={cx("closeButton")} onClick={onClose}>X</div>            <div className={cx("patient-info")}>
                <div>
                    <label>Tên bệnh nhân:</label>
                    <input type="text" value={patient?.name} readOnly />
                </div>
                <div>
                    <label>Lý do khám bệnh:</label>
                    <input type="text" value={patient?.reason} readOnly />
                </div>
            </div>

            {/* Danh sách thuốc */}
            <div className={cx("medicine-list")}>
                {medicineList.map((medicine, index) => (
                    <div key={index} className={cx("medicine-item")}>
                        <input type="text" value={medicine.name} readOnly placeholder="Tên thuốc" />
                        <input type="text" value={medicine.unit} readOnly placeholder="Đơn vị" />
                        <input type="number" value={medicine.quantity} readOnly placeholder="Số lượng" />
                        <input type="text" value={medicine.dosage} readOnly placeholder="Liều lượng" />
                        <button onClick={() => handleDeleteMedicine(index)}>&#128465;</button>
                    </div>
                ))}
                {/* Form thêm thuốc */}
                <div className={cx("add-medicine-form")}>
                   
                    <input
                        type="text"
                        name="name"
                        placeholder="Tên thuốc"
                        value={newMedicine.name}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="unit"
                        placeholder="Đơn vị"
                        value={newMedicine.unit}
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="quantity"
                        placeholder="Số lượng"
                        value={newMedicine.quantity}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="dosage"
                        placeholder="Liều lượng"
                        value={newMedicine.dosage}
                        onChange={handleInputChange}
                    />
                    <button className={cx("btn-add")} onClick={handleAddMedicine}>
                        Thêm thuốc
                    </button>
                </div>
            </div>
        </div>
    );
}

PrescriptionCreate.propTypes = {
    patient: PropTypes.shape({
        reason: PropTypes.string,
        name: PropTypes.string,
    }),
    medicines: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            dosage: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onDeleteMedicine: PropTypes.func,
};


export default PrescriptionCreate;
