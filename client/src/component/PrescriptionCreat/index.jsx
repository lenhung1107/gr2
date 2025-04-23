import classNames from "classnames/bind";
import axios from "axios";
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
    const [note, setNote] = useState("");
    const [diagnosis, setDiagnosis] = useState("");
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

    const handleSubmitPrescription = async () => {
        try {
            const response = await axios.post("http://localhost:3000/prescription/createPrescription", {
                appointment_id: patient._id, // Đảm bảo bạn truyền được prop này từ cha
                medicines: medicineList,
                note: note,
                diagnosis: diagnosis
            });
            if (response.status === 201) {
                alert("Đơn thuốc đã được gửi thành công!");
                onClose();
            } else {
                alert("Gửi đơn thuốc thất bại. Vui lòng thử lại!");
            }
        } catch (error) {
            console.error("Lỗi khi gửi đơn thuốc:", error);
            alert("Có lỗi khi gửi đơn thuốc!");
        }
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
                    <p style={{ fontSize: '1.6rem' }}>{patient.symptoms}</p>
                    {/* <input type="text" value={patient.symptoms} readOnly /> */}
                </div>
            </div>
            <div className={cx("diagnosis")}>
                <div className={cx("diagnosis-section")}>
                    <label>Chuẩn đoán của bác sĩ:</label>
                    <textarea
                        placeholder="Chuấn đoán bệnh"
                        value={diagnosis}
                        onChange={(e) => setDiagnosis(e.target.value)}
    
                    />
                </div>
            </div>
            {/* Danh sách thuốc */}
            <div className={cx("medicine-list")}>
                <p>Thêm thuốc cho bệnh nhân</p>
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
                <div className={cx("note-section")}>
                    <label>Ghi chú của bác sĩ:</label>
                    <textarea
                        placeholder="Ghi chú chung cho đơn thuốc"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}

                    />
                </div>

            </div>
            <div className={cx("btn-submit")}>
                <button onClick={handleSubmitPrescription}>
                    Gửi đơn thuốc
                </button>
            </div>
        </div>
    );
}

PrescriptionCreate.propTypes = {
    patient: PropTypes.shape({
        _id: PropTypes.string,
        symptoms: PropTypes.string,
        name: PropTypes.string,
    }),
    medicines: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            dosage: PropTypes.string.isRequired,
            note: PropTypes.string
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onDeleteMedicine: PropTypes.func,
};


export default PrescriptionCreate;
