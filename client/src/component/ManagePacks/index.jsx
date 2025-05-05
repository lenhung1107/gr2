import { useState, useEffect, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./ManagePacks.module.scss";
import useFetchData from "../../CustomHook/useFetchData";
import axios from "axios";

const cx = classNames.bind(styles);

function ManagePacks() {
  const apiUrl = `http://localhost:3000/appointment/getAllPackAppointment`;
  const { data: patientsDataRaw, loading, error } = useFetchData(apiUrl);
  const patientsData = useMemo(() => patientsDataRaw || [], [patientsDataRaw]);

  const [selectedDate, setSelectedDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showPopupAgree, setShowPopupAgree] = useState(false);
  const [showPopupSendResult, setShowPopupSendResult] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  useEffect(() => {
    if (patientsData.length > 0 && selectedDate) {
      const filtered = patientsData.filter((patient) => patient.date === selectedDate);
      setFilteredPatients(filtered);
    } else {
      setFilteredPatients(patientsData);
    }
  }, [patientsData, selectedDate]);


  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const filtered = patientsData.filter((patient) => patient.date === date);
    setFilteredPatients(filtered);
  };

  const handleAgreeClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPopupAgree(true);
  };
  const handleSendResult = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPopupSendResult(true);
  }

  const handleConfirmAppointment = async () => {
    try {
      await axios.patch(`http://localhost:3000/appointment/updateStatus/${selectedAppointment._id}`, {
        status: "Đã khám"
      });

      alert("Xác nhận thành công!");
      const updatedPatients = filteredPatients.map((patient) =>
        patient._id === selectedAppointment._id ? { ...patient, status: "Đã khám" } : patient
      );
      setFilteredPatients(updatedPatients);
      setShowPopupAgree(false);
    } catch (err) {
      console.error(err);
      alert("Xác nhận thất bại");
    }
  };

  const handleFileChange = (e) => {
    setUploadFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!uploadFile || !selectedAppointment) return;
    const formData = new FormData();
    formData.append("resultFile", uploadFile);
    try {
      const response = await axios.post(
        `http://localhost:3000/appointment/uploadResult/${selectedAppointment._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Upload thành công!");
      const updatedFileUrl = response.data?.result_file;
      // Cập nhật lại trạng thái local
      const updatedPatients = filteredPatients.map((patient) =>
        patient._id === selectedAppointment._id
          ? { ...patient, result_file: updatedFileUrl }
          : patient
      );
      setFilteredPatients(updatedPatients);
      setShowPopupAgree(false);
      setUploadFile(null);
      setShowPopupSendResult(false);
      window.location.reload();

    } catch (err) {
      console.error(err);
      alert("Upload thất bại");
    }
  };

  if (loading)
    return <p style={{ color: "black", fontSize: "1.8rem", fontWeight: "500" }}>Đang tải dữ liệu...</p>;
  if (error)
    return <p style={{ color: "red", fontSize: "1.8rem", fontWeight: "500" }}>Lỗi: {error}</p>;

  return (
    <div className={cx("wrapper")}>
      <h3>QUẢN LÝ CA KHÁM</h3>
      <form className={cx("filter")}>
        <div className={cx("select-date")}>
          <label>Chọn ngày khám </label>
          <input type="date" value={selectedDate} onChange={handleDateChange} required />
        </div>
      </form>

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
                <td>{new Date(patient.date).toLocaleDateString("vi-VN")}</td>
                <td>{patient.hour}</td>
                <td>{patient.name}</td>
                <td>{patient.phone}</td>
                <td>{patient.age}</td>
                <td>{patient.symptoms}</td>
                <td>{patient.status}</td>
                <td>
                  {patient.status === "Đang chờ khám" && (
                    <button className={cx("confirm-btn")} onClick={() => handleAgreeClick(patient)}>
                      Xác nhận
                    </button>
                  )}
                  {patient.status === "Đã khám" && !patient.result_file && (
                    <button className={cx("upload-btn")} onClick={() => handleSendResult(patient)}>
                      Upload kết quả
                    </button>
                  )}

                  {patient.status === "Đã khám" && patient.result_file && (
                    <a
                      href={patient.result_file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cx("result-link")}
                    >
                      Kết quả xét nghiệm
                    </a>
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
      {showPopupAgree && (
        <div className={cx("popup-overlay")}>
          <div className={cx("popup")}>
            <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?</p>
            <div className={cx("popup-buttons")}>
              <button className={cx("confirm-btn")} onClick={handleConfirmAppointment}>
                Xác nhận
              </button>
              <button onClick={() => {
                setShowPopupAgree(false);
              }} className={cx("cancel-btn")}>
                Hủy
              </button>
            </div>

          </div>
        </div>
      )}
      {showPopupSendResult && selectedAppointment && (
        <div className={cx("popup-overlay")}>
          <div className={cx("popup")}>
            <p>
              Vui lòng upload kết quả khám cho bệnh nhân{" "}
              <strong>{selectedAppointment.name}</strong>:
            </p>
            <div className={cx("upload-section")}>
              <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
              <button className={cx("upload-btn")} onClick={handleUpload}>
                Gửi file
              </button>
              <button
                className={cx("cancel-btn")}
                onClick={() => {
                  setShowPopupAgree(false);
                  setUploadFile(null);
                  setSelectedAppointment(null);
                }}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default ManagePacks;