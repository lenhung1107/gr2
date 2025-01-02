import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ManagePatients.module.scss";
import PrescriptionCreat from "../PrescriptionCreat";
import PrescripList from "../PrescripList"
const cx = classNames.bind(styles);

function ManagePatients() {
  // Dữ liệu giả lập danh sách bệnh nhân
  const patientsData = [
    {
      id: 1,
      date: "2024-12-21",
      time: "9:00 - 10:00",
      name: "Đỗ Thúy Hằng",
      address: "Tân Dân, An Lão, Hải Phòng",
      phone: "0946961811",
      gender: "Nữ",
      reason: "Đau đầu",
      prescription: "Xem",
    },
    {
      id: 2,
      date: "2024-12-21",
      time: "10:00 - 11:00",
      name: "Lê Thị Nhung",
      address: "Phủ Lý, Hà Nam",
      phone: "0971623546",
      gender: "Nữ",
      reason: "Đau đầu",
      prescription: "Xem",
    },
    {
      id: 3,
      date: "2024-12-22",
      time: "10:00 - 11:00",
      name: "Nguyễn Văn A",
      address: "Hà Nội",
      phone: "0987654321",
      gender: "Nam",
      reason: "Sốt cao",
      prescription: "Xem",
    },
  ];

  // Dữ liệu giả lập đơn thuốc
  const medicinesData = [
    { name: "Thuốc C", unit: "Viên", quantity: 10, dosage: "2 viên 1 ngày sáng, tối" },
    { name: "Thuốc D", unit: "Gói", quantity: 5, dosage: "1 gói 1 ngày sáng" },
  ];

  const [selectedDate, setSelectedDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [prescripCreat, setPrescripCreat] = useState(false);
  const [prescripList, setPrescripList] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null); // Lưu bệnh nhân được chọn

  // Xử lý tìm kiếm bệnh nhân theo ngày
  const handleDateChange = (e) => {
    const date = e.target.value; // Lấy ngày từ ô input
    setSelectedDate(date);
    const filtered = patientsData.filter((patient) => patient.date === date);
    setFilteredPatients(filtered);
  };

  const handleSendPrescription = (patient) => {
    setSelectedPatient(patient); // Lưu thông tin bệnh nhân
    setPrescripCreat(true); // Hiển thị PrescriptionCreat
  };

  const handleClosePrescription = () => {
    setPrescripCreat(false); // Ẩn PrescriptionCreat
    setPrescripList(false);
    setSelectedPatient(null); // Xóa thông tin bệnh nhân được chọn
  };
  const handlePrescripList = (patient) => {
    setPrescripList(true);
    setSelectedPatient(patient); // Lưu thông tin bệnh nhân
  }

  return (
    <div className={cx("wrapper")}>
      <h3>QUẢN LÝ BỆNH NHÂN</h3>
      <form className={cx("filter")}>
        <div className={cx("select-date")}>
          <label>Chọn ngày khám </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </div>
      </form>

      {/* Hiển thị bảng danh sách bệnh nhân */}
      <table className={cx("patient-table")}>
        <thead>
          <tr>
            <th>#</th>
            <th>Thời gian khám</th>
            <th>Tên bệnh nhân</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Giới tính</th>
            <th>Lý do khám</th>
            <th>Đơn thuốc</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient) => (
              <tr key={patient.id}>
                <td>{patient.id}</td>
                <td>{patient.time}</td>
                <td>{patient.name}</td>
                <td>{patient.address}</td>
                <td>{patient.phone}</td>
                <td>{patient.gender}</td>
                <td>{patient.reason}</td>
                <td>{patient.prescription}</td>
                <td>
                  <button className={cx("btn", "btn-send")}
                    onClick={()=> handlePrescripList(patient)}
                  >Xem đơn thuốc</button>
                  <button
                    className={cx("btn", "btn-create")}
                    onClick={() => handleSendPrescription(patient)}
                  >
                    Tạo đơn thuốc
                  </button>
                  <button className={cx("btn", "btn-cancel")}>Hủy</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                Không có bệnh nhân nào trong ngày này.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {prescripCreat && (
        <>
          <div className={cx("prescription-overlay")}></div>
          <PrescriptionCreat
            patient={selectedPatient}
            medicines={medicinesData} // Truyền dữ liệu medicines
            onClose={handleClosePrescription}
          />
        </>
      )}
      {prescripList && (
        <>
          <div className={cx("prescription-overlay")} ></div>
          <PrescripList
            patient={selectedPatient}
            medicines={medicinesData} // Truyền dữ liệu medicines
            onClose={handleClosePrescription}
          />
        </>
      )}
    </div>
  );
}

export default ManagePatients;
