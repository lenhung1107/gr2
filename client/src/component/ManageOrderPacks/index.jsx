import { useState, useEffect, useMemo } from "react";
import styles from "./ManageOrderPacks.module.scss";
import useFetchData from "../../CustomHook/useFetchData";
import axios from "axios";

function ManageOrderPacks() {
  const apiUrl = `http://localhost:4000/appointment/getAllPackAppointment`;
  const { data: patientsDataRaw, loading, error } = useFetchData(apiUrl);
  const patientsData = useMemo(() => patientsDataRaw || [], [patientsDataRaw]);
  console.log(patientsData)
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
      await axios.patch(`http://localhost:4000/appointment/updateStatus/${selectedAppointment._id}`, {
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
        `http://localhost:4000/appointment/uploadResult/${selectedAppointment._id}`,
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
    return <div className={styles.loadingContainer}><p>Đang tải dữ liệu...</p></div>;
  if (error)
    return <div className={styles.errorContainer}><p>Lỗi: {error}</p></div>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>QUẢN LÝ CA KHÁM</h3>
      </div>
      
      <div className={styles.contentContainer}>
        <form className={styles.filterForm}>
          <div className={styles.dateSelector}>
            <label>Chọn ngày khám</label>
            <input type="date" value={selectedDate} onChange={handleDateChange} required />
          </div>
        </form>

        <div className={styles.tableContainer}>
          <table className={styles.patientTable}>
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
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{new Date(patient.date).toLocaleDateString("vi-VN")}</td>
                    <td>{patient.hour}</td>
                    <td>{patient.name}</td>
                    <td>{patient.phone}</td>
                    <td>{patient.age}</td>
                    <td>{patient.symptoms}</td>
                    <td>
                      <span className={`${styles.status} ${styles[patient.status.replace(/\s+/g, '')]}`}>
                        {patient.status}
                      </span>
                    </td>
                    <td >
                      {patient.status === "Đang chờ khám" && (
                        <button className={styles.confirmBtn} onClick={() => handleAgreeClick(patient)}>
                          Xác nhận
                        </button>
                      )}
                      {patient.status === "Đã khám" && !patient.result_file && (
                        <button className={styles.uploadBtn} onClick={() => handleSendResult(patient)}>
                          Upload kết quả
                        </button>
                      )}

                      {patient.status === "Đã khám" && patient.result_file && (
                        <a
                          href={patient.result_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.resultLink}
                        >
                          Xem kết quả
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className={styles.noData}>
                    Không có bệnh nhân nào trong ngày này.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showPopupAgree && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h4>Xác nhận ca khám</h4>
            <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?</p>
            <div className={styles.popupButtons}>
              <button className={styles.confirmBtn} onClick={handleConfirmAppointment}>
                Xác nhận
              </button>
              <button onClick={() => setShowPopupAgree(false)} className={styles.cancelBtn}>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}
      
      {showPopupSendResult && selectedAppointment && (
        <div className={styles.popupOverlay}>
          <div className={styles.popup}>
            <h4>Upload kết quả</h4>
            <p>
              Vui lòng upload kết quả khám cho bệnh nhân{" "}
              <strong>{selectedAppointment.name}</strong>:
            </p>
            <div className={styles.uploadSection}>
              <input type="file" accept="image/*,.pdf" onChange={handleFileChange} />
              <div className={styles.popupButtons}>
                <button className={styles.uploadBtn} onClick={handleUpload} disabled={!uploadFile}>
                  Gửi file
                </button>
                <button
                  className={styles.cancelBtn}
                  onClick={() => {
                    setShowPopupSendResult(false);
                    setUploadFile(null);
                  }}
                >
                  Hủy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageOrderPacks;