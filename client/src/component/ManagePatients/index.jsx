import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../CustomHook/useFetchData";
import PrescriptionCreat from "../PrescriptionCreat";
import styles from "./ManagePatients.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const medicinesData = [];

function ManagePatients() {
  const { id } = useParams();
  const apiUrl = `http://localhost:3000/appointment/getAppoinmentByDoctorId/${id}`;
  const { data: patientsDataRaw, loading, error } = useFetchData(apiUrl);
  const patientsData = useMemo(() => patientsDataRaw || [], [patientsDataRaw]);

  const [selectedDate, setSelectedDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showPopupAgree, setShowPopupAgree] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [showTestOrderPopup, setShowTestOrderPopup] = useState(false);
  const [selectedTestPack, setSelectedTestPack] = useState("");
  const [prescripCreat, setPrescripCreat] = useState(false);
  const [testPacks, setTestPacks] = useState([]);

  useEffect(() => {
    if (patientsData.length > 0) {
      setFilteredPatients(patientsData);
    }
  }, [patientsData]);

  useEffect(() => {
    const fetchTestPacks = async () => {
      try {
        const res = await fetch("http://localhost:3000/pack/getAll");
        const data = await res.json();
        setTestPacks(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói xét nghiệm:", error);
      }
    };
    fetchTestPacks();
  }, []);

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const filtered = patientsData.filter((patient) => patient.date === date);
    setFilteredPatients(filtered);
  };

  const handleSendPrescription = (patient) => {
    setSelectedPatient(patient);
    setPrescripCreat(true);
  };

  const handleClosePrescription = () => {
    setPrescripCreat(false);
    setSelectedPatient(null);
  };

  const handleAgreeClick = (patient) => {
    setSelectedPatient(patient);
    setShowPopupAgree(true);
  };

  const handleTestOrderClick = (patient) => {
    setSelectedPatient(patient);
    setShowTestOrderPopup(true);
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
        window.location.reload();
      } else {
        alert('Xác nhận thất bại');
      }
    } catch (error) {
      alert('Có lỗi xảy ra khi xác nhận');
      console.error(error);
    }

    setShowPopupAgree(false);
  };

  const handleSendTestOrder = async () => {
    if (!selectedTestPack) {
      alert("Vui lòng chọn gói xét nghiệm");
      return;
    }
    console.log(selectedPatient.id);
    try {
      const response = await fetch("http://localhost:3000/testOrder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: selectedPatient._id,
          doctor_id: id,
          pack_id: selectedTestPack,
          note: "Chỉ định từ bác sĩ",
        }),
      });
      if (response.ok) {
        const result = await response.json();
        alert(result.message);
        window.location.reload();
      } else {
        const err = await response.json();
        alert("Thất bại: " + err.message);
      }
    } catch (error) {
      console.error("Lỗi gửi chỉ định xét nghiệm", error);
      alert("Lỗi gửi chỉ định xét nghiệm!");
    }

    setShowTestOrderPopup(false);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Đang chờ xác nhận": return cx("status", "waiting");
      case "Đang khám": return cx("status", "in-progress");
      case "Chờ kết quả xét nghiệm": return cx("status", "pending-result");
      case "Có kết quả xét nghiệm": return cx("status", "result-ready");
      case "Đã khám": return cx("status", "completed");
      default: return cx("status");
    }
  };

  if (loading) return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  if (error) return <div className={cx("error")}>Lỗi: {error}</div>;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>Quản Lý Bệnh Nhân</h1>
        <div className={cx("date-picker")}>
          <label htmlFor="date-select">Chọn ngày khám</label>
          <input
            id="date-select"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            required
          />
        </div>
      </div>

      <div className={cx("table-container")}>
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
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatients.length > 0 ? (
              filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{new Date(patient.date).toLocaleDateString('vi-VN')}</td>
                  <td>{patient.hour}</td>
                  <td className={cx("patient-name")}>{patient.name}</td>
                  <td>{patient.phone}</td>
                  <td>{patient.age}</td>
                  <td className={cx("symptoms")}>{patient.symptoms}</td>
                  <td>
                    <span className={getStatusClass(patient.status)}>
                      {patient.status}
                    </span>
                  </td>
                  <td className={cx("actions")}>
                    {patient.status === "Đang chờ khám" && (
                      <button
                        className={cx("button", "primary")}
                        onClick={() => handleAgreeClick(patient)}
                      >
                        Xác nhận
                      </button>
                    )}
                    {patient.status === "Đang khám" && (
                      <div className={cx("action-buttons")}>
                        <button
                          className={cx("button", "secondary")}
                          onClick={() => handleSendPrescription(patient)}
                        >
                          Ghi chú
                        </button>
                        <button
                          className={cx("button", "secondary")}
                          onClick={() => handleTestOrderClick(patient)}
                        >
                          Xét nghiệm
                        </button>
                      </div>
                    )}
                    {patient.status === "Có kết quả xét nghiệm" && (
                      <div className="flex gap-4 mt-4">
                        <a
                          href={patient.result_file}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          Xem kết quả
                        </a>
                        <button
                          className={cx("button", "secondary")}
                          onClick={() => handleSendPrescription(patient)}
                        >
                          Ghi chú
                        </button>
                      </div>
                    )}

                    {patient.status === "Đã khám" && patient.hasPrescription && (
                      <div className={cx("prescription-sent")}>
                        Đã gửi đơn thuốc
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr className={cx("no-data")}>
                <td colSpan="9">
                  Không có bệnh nhân nào trong ngày này
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {prescripCreat && (
        <>
          <div className={cx("modal-overlay")}></div>
          <div className={cx("modal-container")}>
            <PrescriptionCreat
              patient={selectedPatient}
              medicines={medicinesData}
              onClose={handleClosePrescription}
            />
          </div>
        </>
      )}

      {showPopupAgree && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal")}>
            <div className={cx("modal-header")}>
              <h4>Xác nhận cuộc hẹn</h4>
            </div>
            <div className={cx("modal-body")}>
              <p>Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?</p>
            </div>
            <div className={cx("modal-footer")}>
              <button
                className={cx("button", "primary")}
                onClick={() => handleConfirmAppointment(selectedPatient)}
              >
                Xác nhận
              </button>
              <button
                className={cx("button", "cancel")}
                onClick={() => setShowPopupAgree(false)}
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {showTestOrderPopup && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal")}>
            <div className={cx("modal-header")}>
              <h4>Chọn gói xét nghiệm</h4>
            </div>
            <div className={cx("modal-body")}>
              <div className={cx("form-group")}>
                <select
                  className={cx("select")}
                  value={selectedTestPack}
                  onChange={(e) => setSelectedTestPack(e.target.value)}
                >
                  <option value="">-- Chọn gói --</option>
                  {testPacks.map((pack) => (
                    <option key={pack._id} value={pack._id}>
                      {pack.name} - {pack.price}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className={cx("modal-footer")}>
              <button
                className={cx("button", "primary")}
                onClick={handleSendTestOrder}
              >
                Gửi chỉ định
              </button>
              <button
                className={cx("button", "cancel")}
                onClick={() => setShowTestOrderPopup(false)}
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

export default ManagePatients;