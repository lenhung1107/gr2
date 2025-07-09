import { useState, useEffect, useMemo } from "react";
import styles from "./ManagePacksAssign.module.scss";
import useFetchData from "../../CustomHook/useFetchData";
import axios from "axios";

function ManagePacksAssign() {
  const apiUrl = `https://gr2-3t8u.onrender.com/testOrder/getAll`;
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
      const filtered = patientsData.filter(
        (patient) => patient.date === selectedDate
      );
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
    console.log("Appointment được chọn:", appointment);
    setSelectedAppointment(appointment);
    setShowPopupAgree(true);
  };

  const handleSendResult = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPopupSendResult(true);
  };

  const handleConfirmAppointment = async () => {
    if (!selectedAppointment || !selectedAppointment._id) {
      alert("Không thể xác nhận: Dữ liệu không hợp lệ.");
      return;
    }

    try {
      await axios.patch(
        `https://gr2-3t8u.onrender.com/testOrder/updateStatus/${selectedAppointment._id}`,
        {
          status: "Đã khám",
        }
      );

      alert("Xác nhận thành công!");
      const updatedPatients = filteredPatients.map((patient) =>
        patient._id === selectedAppointment._id
          ? { ...patient, status: "Đã khám" }
          : patient
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
        `https://gr2-3t8u.onrender.com/testOrder/uploadResult/${selectedAppointment._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Upload response:", response.data);

      console.log(response.data);
      const updatedFileUrl = response.data?.fileUrl;
      const updatedPatients = filteredPatients.map((patient) =>
        patient._id === selectedAppointment._id
          ? {
              ...patient,
              result_file: updatedFileUrl,
              status: "Đã xét nghiệm",
            }
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
    return (
      <div className={styles.loadingContainer}>
        <p>Đang tải dữ liệu...</p>
      </div>
    );
  if (error)
    return (
      <div className={styles.errorContainer}>
        <p>Lỗi: {error}</p>
      </div>
    );
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h3>QUẢN LÝ CA KHÁM ĐƯỢC CHỈ ĐỊNH</h3>
      </div>

      <div className={styles.contentContainer}>
        <form className={styles.filterForm}>
          <div className={styles.dateSelector}>
            <label>Chọn ngày khám</label>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              required
            />
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
                <th>Tên bác sĩ chỉ định</th>
                <th>Trạng thái</th>
                <th>Tên xét nghiệm</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient, index) => {
                  console.log("File URL:", patient.result_file);
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {new Date(patient.date).toLocaleDateString("vi-VN")}
                      </td>
                      <td>{patient.hour}</td>
                      <td>{patient.patientName}</td>
                      <td>{patient.patientPhone}</td>
                      <td>{patient.patientAge}</td>
                      <td>{patient.doctorName}</td>
                      <td>
                        <span
                          className={`${styles.status} ${
                            styles[patient.status.replace(/\s+/g, "")]
                          }`}
                        >
                          {patient.status}
                        </span>
                      </td>
                      <td>
                        <ul>
                          {patient.packNames?.split(",").map((pack, idx) => (
                            <li key={idx}>{pack.trim()}</li>
                          ))}
                        </ul>
                      </td>

                      <td>
                        {patient.status === "Chờ kết quả" && (
                          <button
                            className={styles.confirmBtn}
                            onClick={() => handleAgreeClick(patient)}
                          >
                            Xác nhận
                          </button>
                        )}
                        {patient.status === "Hoàn tất" &&
                          !patient.result_file && (
                            <button
                              className={styles.uploadBtn}
                              onClick={() => handleSendResult(patient)}
                            >
                              Upload kết quả
                            </button>
                          )}
                        {patient.status === "Đã xét nghiệm" && (
                          <>
                            <a
                              href={patient.result_file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={styles.resultLink}
                            >
                              Xem kết quả
                            </a>
                            <button
                              className={styles.uploadBtn}
                              onClick={() => handleSendResult(patient)}
                            >
                              Upload lại
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })
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
              <button
                className={styles.confirmBtn}
                onClick={handleConfirmAppointment}
              >
                Xác nhận
              </button>
              <button
                onClick={() => setShowPopupAgree(false)}
                className={styles.cancelBtn}
              >
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
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
              />
              <div className={styles.popupButtons}>
                <button
                  className={styles.uploadBtn}
                  onClick={handleUpload}
                  disabled={!uploadFile}
                >
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

export default ManagePacksAssign;
