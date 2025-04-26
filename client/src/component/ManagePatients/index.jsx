import { useState, useEffect,useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./ManagePatients.module.scss";
import PrescriptionCreat from "../PrescriptionCreat";
// import PrescripList from "../PrescripList"
import { useParams } from "react-router-dom";
import useFetchData from "../../CustomHook/useFetchData";
const cx = classNames.bind(styles);
const medicinesData = [
];
function ManagePatients() {
  const { id } = useParams(); // destructuring để lấy id string
  const apiUrl = `http://localhost:3000/appointment/getAppoinmentByDoctorId/${id}`;
  const { data: patientsDataRaw, loading, error } = useFetchData(apiUrl);
  const patientsData = useMemo(() => patientsDataRaw || [], [patientsDataRaw]);

  const [selectedDate, setSelectedDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showPopupAgree, setShowPopupAgree] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  
  useEffect(() => {
    if (patientsData.length > 0) {
      setFilteredPatients(patientsData);
    }
  }, [patientsData]);
  
  const [prescripCreat, setPrescripCreat] = useState(false);
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
    // setPrescripList(false);
    setSelectedPatient(null); // Xóa thông tin bệnh nhân được chọn
  };
  const handleAgreeClick = (patient) => {
    setSelectedPatient(patient);
    setShowPopupAgree(true);
  };
  const handleConfirmAppointment = async (patient) => {
    try {
      const response = await fetch(`http://localhost:3000/appointment/confirmByDoctor/${patient._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const updated = await response.json();
        alert(updated.message);
        // Cập nhật lại danh sách nếu cần (có thể gọi lại API hoặc cập nhật state)
        window.location.reload(); // Hoặc gọi lại fetchData nếu bạn muốn tối ưu hơn
      } else {
        alert('Xác nhận thất bại');
      }

    } catch (error) {
      alert('Có lỗi xảy ra khi xác nhận');
      console.error(error);
    }

    setShowPopupAgree(false);
  };
  if (loading) return <p style={{ color: 'black', fontSize: '1.8rem', fontWeight: '500' }} >Đang tải dữ liệu...</p>;
  if (error) return <p style={{ color: 'red', fontSize: '1.8rem', fontWeight: '500' }}>Lỗi: {error}</p>;
  console.log(patientsData)
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
            <th>Ngày khám</th>
            <th>Giờ khám</th>
            <th>Tên bệnh nhân</th>
            <th>Số điện thoại</th>
            <th>Tuổi</th>
            <th>Lý do khám</th>
            <th>Trạng thái</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((patient, index) => (
              <tr key={index}>
                <td>{index}</td>
                <td>{new Date(patient.date).toLocaleDateString('vi-VN')}</td>
                <td>{patient.hour} </td>
                <td>{patient.name}</td>
                <td>{patient.phone}</td>
                <td>{patient.age}</td>
                <td>{patient.symptoms}</td>
                <td>{patient.status}</td>
                <td>
                  {patient.status === "Đang chờ khám" && (
                    <div onClick={() => handleAgreeClick(patient)}>
                      <button className={cx("confirm-btn")}>Xác nhận</button>
                    </div>
                  )}
                  {patient.status === "Đã khám" && !patient.hasPrescription && (
                    <div onClick={() => handleSendPrescription(patient)}>
                      <button className={cx("confirm-btn")}>Ghi chú</button>
                    </div>
                  )}
                   {patient.status === "Đã khám" && patient.hasPrescription&& (
                    <p style={{fontStyle: 'italic', fontSize:'1.4rem'}}>Đã gửi đơn thuốc</p>
                  )}
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
      {showPopupAgree && (
        <div className={cx("popup-overlay")}>
          <div className={cx("popup")}>
            <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?</p>
            <div className={cx("popup-buttons")}>
              <button onClick={() => handleConfirmAppointment(selectedPatient)} className={cx("confirm-btn")}>Xác nhận</button>
              <button onClick={() => setShowPopupAgree(false)} className={cx("cancel-btn")}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagePatients;
