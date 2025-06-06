import classNames from "classnames/bind";
import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./PrescriptionCreat.module.scss";

const cx = classNames.bind(styles);

function PrescriptionCreate({ patient, medicines, onClose }) {
    const [medicineList, setMedicineList] = useState(medicines || []);
    const [newMedicine, setNewMedicine] = useState({
        name: "",
        unit: "",
        quantity: "",
        dosage: "",
    });
    const [note, setNote] = useState("");
    const [diagnosis, setDiagnosis] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMedicine({ ...newMedicine, [name]: value });
    };

    const handleAddMedicine = () => {
        if (newMedicine.name && newMedicine.unit && newMedicine.quantity && newMedicine.dosage) {
            setMedicineList([...medicineList, newMedicine]);
            setNewMedicine({ name: "", unit: "", quantity: "", dosage: "" });
        } else {
            alert("Vui lòng nhập đầy đủ thông tin thuốc!");
        }
    };

    const handleDeleteMedicine = (index) => {
        const updatedList = medicineList.filter((_, i) => i !== index);
        setMedicineList(updatedList);
    };

    const handleSubmitPrescription = async () => {
        try {
            const response = await axios.post("http://localhost:4000/prescription/createPrescription", {
                appointment_id: patient._id,
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
        <div className={cx("modal-overlay")}>
            <div className={cx("prescription-modal")}>
                {/* Header */}
                <div className={cx("modal-header")}>
                    <div className={cx("header-content")}>
                        <div className={cx("header-icon")}>📋</div>
                        <h2 className={cx("modal-title")}>Tạo Đơn Thuốc</h2>
                    </div>
                    <button className={cx("close-button")} onClick={onClose}>
                        ✕
                    </button>
                </div>

                <div className={cx("modal-body")}>
                    {/* Patient Information */}
                    <div className={cx("section", "patient-section")}>
                        <div className={cx("section-header")}>
                            <div className={cx("section-icon")}>👤</div>
                            <h3 className={cx("section-title")}>Thông Tin Bệnh Nhân</h3>
                        </div>
                        <div className={cx("patient-info")}>
                            <div className={cx("info-field")}>
                                <label>Tên bệnh nhân:</label>
                                <input type="text" value={patient?.name || ""} readOnly />
                            </div>
                            <div className={cx("info-field")}>
                                <label>Lý do khám bệnh:</label>
                                <div className={cx("symptoms-display")}>
                                    {patient?.symptoms || ""}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Diagnosis */}
                    <div className={cx("section", "diagnosis-section")}>
                        <div className={cx("section-header")}>
                            <div className={cx("section-icon")}>🩺</div>
                            <h3 className={cx("section-title")}>Chuẩn Đoán Của Bác Sĩ</h3>
                        </div>
                        <textarea
                            className={cx("diagnosis-input")}
                            placeholder="Nhập chuẩn đoán của bác sĩ..."
                            value={diagnosis}
                            onChange={(e) => setDiagnosis(e.target.value)}
                            rows="3"
                        />
                    </div>

                    {/* Medicine Section */}
                    <div className={cx("section", "medicine-section")}>
                        <div className={cx("section-header")}>
                            <div className={cx("section-icon")}>💊</div>
                            <h3 className={cx("section-title")}>Danh Sách Thuốc</h3>
                        </div>

                        {/* Medicine List */}
                        {medicineList.length > 0 && (
                            <div className={cx("medicine-list")}>
                                {medicineList.map((medicine, index) => (
                                    <div key={index} className={cx("medicine-item")}>
                                        <div className={cx("medicine-info")}>
                                            <div className={cx("medicine-field")}>
                                                <label>Tên thuốc</label>
                                                <input type="text" value={medicine.name} readOnly />
                                            </div>
                                            <div className={cx("medicine-field")}>
                                                <label>Đơn vị</label>
                                                <input type="text" value={medicine.unit} readOnly />
                                            </div>
                                            <div className={cx("medicine-field")}>
                                                <label>Số lượng</label>
                                                <input type="number" value={medicine.quantity} readOnly />
                                            </div>
                                            <div className={cx("medicine-field")}>
                                                <label>Liều lượng</label>
                                                <input type="text" value={medicine.dosage} readOnly />
                                            </div>
                                        </div>
                                        <button 
                                            className={cx("delete-button")}
                                            onClick={() => handleDeleteMedicine(index)}
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Add Medicine Form */}
                        <div className={cx("add-medicine-form")}>
                            <h4 className={cx("form-title")}>Thêm thuốc mới</h4>
                            <div className={cx("form-fields")}>
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
                                    placeholder="Đơn vị (viên, ml...)"
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
                            </div>
                            <button className={cx("add-button")} onClick={handleAddMedicine}>
                                <span className={cx("add-icon")}>+</span>
                                Thêm thuốc
                            </button>
                        </div>
                    </div>

                    {/* Notes Section */}
                    <div className={cx("section", "note-section")}>
                        <div className={cx("section-header")}>
                            <div className={cx("section-icon")}>📝</div>
                            <h3 className={cx("section-title")}>Ghi Chú Của Bác Sĩ</h3>
                        </div>
                        <textarea
                            className={cx("note-input")}
                            placeholder="Nhập ghi chú chung cho đơn thuốc..."
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            rows="3"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className={cx("modal-footer")}>
                    <button className={cx("submit-button")} onClick={handleSubmitPrescription}>
                        <span className={cx("submit-icon")}>📤</span>
                        Gửi Đơn Thuốc
                    </button>
                </div>
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
    ),
    onClose: PropTypes.func.isRequired,
};

export default PrescriptionCreate;