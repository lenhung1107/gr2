import { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../CustomHook/useFetchData";
import PrescriptionCreat from "../PrescriptionCreat";
import styles from "./ManagePatients.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function ManagePatients() {
  const { id } = useParams();
  const apiUrl = `https://gr2-3t8u.onrender.com/appointment/getAppoinmentByDoctorId/${id}`;
  const { data: patientsDataRaw, loading, error } = useFetchData(apiUrl);
  const patientsData = useMemo(() => patientsDataRaw || [], [patientsDataRaw]);

  // States
  const [selectedDate, setSelectedDate] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showModal, setShowModal] = useState({ type: null, patient: null });
  const [selectedTestPack, setSelectedTestPack] = useState([]);
  const [testPacks, setTestPacks] = useState([]);

  // Effects
  useEffect(() => {
    if (patientsData.length > 0) {
      setFilteredPatients(patientsData);
    }
  }, [patientsData]);

  useEffect(() => {
    const fetchTestPacks = async () => {
      try {
        const res = await fetch("https://gr2-3t8u.onrender.com/test/getAll");
        const data = await res.json();
        setTestPacks(data);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách gói xét nghiệm: ", error);
      }
    };
    fetchTestPacks();
  }, []);

  // Handlers
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    const filtered = patientsData.filter((patient) => patient.date === date);
    setFilteredPatients(filtered);
  };

  const openModal = (type, patient) => {
    setShowModal({ type, patient });
  };

  const closeModal = () => {
    setShowModal({ type: null, patient: null });
    setSelectedTestPack([]);
  };

  const handleCheckboxChange = (packId) => {
    setSelectedTestPack(prev =>
      prev.includes(packId)
        ? prev.filter(id => id !== packId)
        : [...prev, packId]
    );
  };

  const handleConfirmAppointment = async () => {
    try {
      const response = await fetch(`https://gr2-3t8u.onrender.com/appointment/confirmByDoctor/${showModal.patient._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
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
    closeModal();
  };

  const handleSendTestOrder = async () => {
    if (selectedTestPack.length === 0) {
      alert("Vui lòng chọn gói xét nghiệm");
      return;
    }

    try {
      const response = await fetch("https://gr2-3t8u.onrender.com/testOrder/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: showModal.patient._id,
          doctor_id: id,
          pack_ids: selectedTestPack,
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
    closeModal();
  };

  const getStatusClass = (status) => {
    const statusMap = {
      "Đang chờ xác nhận": "waiting",
      "Đang chờ khám":"accept",
      "Đang khám": "examining",
      "Chờ kết quả xét nghiệm": "pending",
      "Có kết quả xét nghiệm": "ready",
      "Đã khám": "completed",
      "Đã hủy":"cancel",
    };
    return cx("status", statusMap[status]);
  };

  const renderActionButtons = (patient) => {
    const { status } = patient;
    
    if (status === "Đang chờ khám") {
      return (
        <button
          className={cx("btn", "btn-primary")}
          onClick={() => openModal("confirm", patient)}
        >
          Xác nhận
        </button>
      );
    }
    
    if (status === "Đang khám") {
      return (
        <div className={cx("btn-group")}>
          <button
            className={cx("btn", "btn-secondary")}
            onClick={() => openModal("prescription", patient)}
          >
            Ghi chú
          </button>
          <button
            className={cx("btn", "btn-info")}
            onClick={() => openModal("test", patient)}
          >
            Xét nghiệm
          </button>
        </div>
      );
    }
    
    if (status === "Có kết quả xét nghiệm") {
      return (
        <div className={cx("btn-group")}>
          <a
            href={patient.result_file}
            target="_blank"
            rel="noopener noreferrer"
            className={cx("btn", "btn-info")}
          >
            Xem kết quả
          </a>
          <button
            className={cx("btn", "btn-secondary")}
            onClick={() => openModal("prescription", patient)}
          >
            Ghi chú
          </button>
        </div>
      );
    }
    
    if (status === "Đã khám" && patient.hasPrescription) {
      return <span className={cx("completed-text")}>Đã gửi đơn thuốc</span>;
    }
    
    return null;
  };

  const renderModal = () => {
    if (!showModal.type) return null;

    const modalConfigs = {
      confirm: {
        title: "Xác nhận cuộc hẹn",
        content: "Bạn có chắc chắn muốn xác nhận cuộc hẹn này không?",
        onConfirm: handleConfirmAppointment
      },
      test: {
        title: "Chọn gói xét nghiệm",
        content: (
          <div className={cx("checkbox-group")}>
            {testPacks.map((pack) => (
              <label key={pack._id} className={cx("checkbox-item")}>
                <input
                  type="checkbox"
                  value={pack._id}
                  checked={selectedTestPack.includes(pack._id)}
                  onChange={() => handleCheckboxChange(pack._id)}
                />
                <span>{pack.name} - {pack.room}</span>
              </label>
            ))}
          </div>
        ),
        onConfirm: handleSendTestOrder
      }
    };

    const config = modalConfigs[showModal.type];
    if (!config) return null;

    return (
      <div className={cx("modal-overlay")} onClick={closeModal}>
        <div className={cx("modal")} onClick={e => e.stopPropagation()}>
          <div className={cx("modal-header")}>
            <h3>{config.title}</h3>
            <button className={cx("close-btn")} onClick={closeModal}>×</button>
          </div>
          <div className={cx("modal-body")}>
            {typeof config.content === 'string' ? <p>{config.content}</p> : config.content}
          </div>
          <div className={cx("modal-footer")}>
            <button className={cx("btn", "btn-primary")} onClick={config.onConfirm}>
              {showModal.type === 'test' ? 'Gửi chỉ định' : 'Xác nhận'}
            </button>
            <button className={cx("btn", "btn-cancel")} onClick={closeModal}>
              Hủy
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className={cx("loading")}>Đang tải dữ liệu...</div>;
  if (error) return <div className={cx("error")}>Lỗi: {error}</div>;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("header")}>
        <h1 className={cx("title")}>Quản Lý Bệnh Nhân</h1>
        <div className={cx("date-picker")}>
          <label htmlFor="date-select">Chọn ngày khám:</label>
          <input
            id="date-select"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      </div>

      <div className={cx("table-wrapper")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Ngày khám</th>
              <th>Giờ</th>
              <th>Tên bệnh nhân</th>
              <th>SĐT</th>
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
                    {renderActionButtons(patient)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className={cx("no-data")}>
                  Không có bệnh nhân nào trong ngày này
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Prescription Modal */}
      {showModal.type === "prescription" && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal-container")}>
            <PrescriptionCreat
              patient={showModal.patient}
              medicines={[]}
              onClose={closeModal}
            />
          </div>
        </div>
      )}

      {renderModal()}
    </div>
  );
}

export default ManagePatients;