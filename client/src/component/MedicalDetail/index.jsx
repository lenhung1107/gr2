import classNames from "classnames/bind";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MedicalDetail.module.scss";
import useFetchData from "../../CustomHook/useFetchData";
const cx = classNames.bind(styles);

function MedicalDetail({ user, onCancel }) {
  const apiUrl = `http://localhost:4000/appointment/getAppointmentsByPatientId/${user._id}`;
  const { data: historyData, loading, error } = useFetchData(apiUrl);
  console.log(historyData);
  console.log(user._id);
  const [activeTab, setActiveTab] = useState("info");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const finalHistoryData = Array.isArray(historyData) && historyData.length > 0 ? historyData : [];
  if (loading) return <p style={{ fontSize: "1.6rem", color: "#000" }}>Đang tải đơn thuốc...</p>;
  if (error) return <p style={{ fontSize: "1.6rem", color: "red" }}>{error}</p>;
  return (
    <div className={cx("popupEdit")}>
      <div className={cx("popupContent-Edit")}>
        <div className={cx("form")}>
          <div className={cx("menu")}>
            <button className={cx("tab", { active: activeTab === "info" })} onClick={() => setActiveTab("info")}>
              Thông Tin Cơ Bản
            </button>
            <button className={cx("tab", { active: activeTab === "history" })} onClick={() => setActiveTab("history")}>
              Lịch sử Khám Bệnh
            </button>
          </div>
          <div className={cx("content")}>
            {activeTab === "info" && (
              <div className={cx("infoContent")}>
                <img src="/doctor.jpg" alt="Avatar bệnh nhân" />
                <div className={cx("infoText")}>
                  <h2>{user.name}</h2>
                  <p><strong>Giới tính: </strong> {user.gender}</p>
                  <p><strong>Ngày sinh: </strong>{user.age} </p>
                  <p><strong>Nghề nghiệp: </strong></p>
                  <p><strong>Địa chỉ: </strong>{user.address}</p>
                  <p><strong>Ghi chú: </strong> Bệnh nhân thường xuyên bị chảy máu cam</p>
                  <p><strong>Liên hệ: </strong> {user.email}</p>
                  <p><strong>Số điện thoại liên hệ: </strong>{user.phone}</p>
                </div>
                <span><strong>{user.patient_code}</strong></span>
              </div>
            )}

            {activeTab === "history" && (
              <div className={cx("historyContent")}>
                <h2>Lịch sử khám bệnh</h2>
                <table className={cx("table")}>
                  <thead>
                    <tr className={cx("tableHeader")}>
                      <th>Ngày khám</th>
                      <th>Bác sĩ/Gói khám</th>
                      <th>Triệu chứng</th>
                      <th>Xem chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalHistoryData.length === 0 ? (
                      <tr>
                        <td colSpan="4" style={{ textAlign: "center", fontSize: "1.6rem", padding: "1rem" }}>
                          Chưa có lịch sử khám bệnh
                        </td>
                      </tr>
                    ) : (
                      finalHistoryData.map((item) => (
                        <tr key={item.id} className={cx("tableRow")}>
                          <td>{new Date(item.date).toLocaleDateString('vi-VN')}</td>
                          <td>{item.service}</td>
                          <td>{item.symptoms}</td>
                          <td>
                            <button className={cx("viewButton")} onClick={() => setSelectedAppointment(item)}>
                              Xem
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>

                {selectedAppointment && (
                  <div className={cx("detailContainer")}>

                    <div className={cx('medicalDetail')}>
                      <button className={cx("closeButton")} onClick={() => setSelectedAppointment(null)}>
                        x
                      </button>
                      <h3 className={cx("detailTitle")}>Chi tiết lần khám</h3>
                      <p><strong>Ngày khám:</strong> {new Date(selectedAppointment.date).toLocaleDateString('vi-VN')}</p>
                      <p><strong>Giờ khám: </strong>{selectedAppointment.hour}</p>
                      <p><strong>Bác sĩ:</strong> {selectedAppointment.service}</p>
                      <p><strong>Chẩn đoán:</strong> {selectedAppointment.diagnosis}</p>
                      <p><strong>Ghi chú:</strong> {selectedAppointment.note}</p>
                      {selectedAppointment.prescription.length > 0 && (
                        <div className={cx("prescriptionContainer")}>
                          <h4 className={cx("prescriptionTitle")}>Đơn thuốc: </h4>
                          <ul className={cx("prescriptionList")}>
                            {selectedAppointment.prescription.map((med, index) => (
                              <div key={index}>
                                💊 Thuốc: {med.name}<br />
                                🧪 Liều lượng: {med.quantity} {med.unit} <br />
                                📋 Hướng dẫn sử dụng:{med.dosage}
                                <br />
                              </div>
                            ))}
                          </ul>
                          <p className={cx("remindText")}><em>🔔Lưu ý: Hãy tuân thủ theo chỉ dẫn của bác sĩ để đảm bảo hiệu quả điều trị.</em></p>
                        </div>
                      )}

                    </div>



                  </div>
                )}
              </div>
            )}
          </div>
          <button className={cx('buttonClose')} onClick={onCancel}>
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

MedicalDetail.propTypes = {

  user: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    patient_code: PropTypes.string
  }),
  historyData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      date: PropTypes.string,
      doctor: PropTypes.string,
      symptoms: PropTypes.string,
      diagnosis: PropTypes.string,
      note: PropTypes.string,
      prescription: PropTypes.arrayOf(
        PropTypes.shape({
          medicine: PropTypes.string,
          dosage: PropTypes.string,
          instructions: PropTypes.string,
        })
      ),
    })
  ),
  onCancel: PropTypes.func.isRequired,
};

export default MedicalDetail;
