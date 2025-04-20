import classNames from "classnames/bind";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MedicalDetail.module.scss";

const cx = classNames.bind(styles);

function MedicalDetail({ user, historyData = [], onCancel }) {
  const [activeTab, setActiveTab] = useState("info");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // console.log(user.patient_code);
  // Dữ liệu giả định cho lịch sử khám bệnh
  const dummyHistoryData = [
    {
      id: "65fd1a9e9c8b2b001c4f7a01",
      date: "2025-03-01",
      doctor: "Dr. Nguyễn Văn A",
      symptoms: "Đau đầu, chóng mặt",
      diagnosis: "Căng thẳng thần kinh",
      note: "Bệnh nhân cần nghỉ ngơi nhiều hơn",
      prescription: [
        { medicine: "Paracetamol", dosage: "500mg", instructions: "Uống 1 viên sau ăn, ngày 2 lần", remind: "kiêng các loại thịt giàu đạm" },
        { medicine: "Vitamin B1", dosage: "250mg", instructions: "Uống 1 viên mỗi sáng", remind: "kiêng các loại thịt giàu đạm" }
      ],
    },
    {
      id: "65fd1b3a9c8b2b001c4f7a02",
      date: "2025-02-20",
      doctor: "Dr. Trần Thị B",
      symptoms: "Ho kéo dài, sốt nhẹ",
      diagnosis: "Viêm họng cấp",
      note: "Khuyến cáo súc miệng nước muối ấm",
      prescription: [
        { medicine: "Amoxicillin", dosage: "500mg", instructions: "Uống 1 viên mỗi 8 giờ", remind: "kiêng các loại thịt giàu đạm" },
        { medicine: "Acemuc", dosage: "200mg", instructions: "Hòa tan với nước, uống sau ăn", remind: "kiêng các loại thịt giàu đạm" }
      ]
    }
  ];

  // Nếu `historyData` rỗng, dùng dữ liệu giả định
  const finalHistoryData = historyData.length > 0 ? historyData : dummyHistoryData;

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
            {/* <button className={cx("tab", { active: activeTab === "treatment" })} onClick={() => setActiveTab("treatment")}>
              Phiếu xét nghiệm
            </button> */}
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
                      <th>Bác sĩ</th>
                      <th>Triệu chứng</th>
                      <th>Xem chi tiết</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finalHistoryData.map((item) => (
                      <tr key={item.id} className={cx("tableRow")}>
                        <td>{item.date}</td>
                        <td>{item.doctor}</td>
                        <td>{item.symptoms}</td>
                        <td>
                          <button className={cx("viewButton")} onClick={() => setSelectedAppointment(item)}>
                            Xem
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {selectedAppointment && (
                  <div className={cx("detailContainer")}>

                    <div className={cx('medicalDetail')}>
                      <button className={cx("closeButton")} onClick={() => setSelectedAppointment(null)}>
                        x
                      </button>
                      <h3 className={cx("detailTitle")}>Chi tiết lần khám</h3>
                      <p><strong>Ngày khám:</strong> {selectedAppointment.date}</p>
                      <p><strong>Bác sĩ:</strong> {selectedAppointment.doctor}</p>
                      <p><strong>Chẩn đoán:</strong> {selectedAppointment.diagnosis}</p>
                      <p><strong>Ghi chú:</strong> {selectedAppointment.note}</p>
                      {selectedAppointment.prescription.length > 0 && (
                        <div className={cx("prescriptionContainer")}>
                          <h4 className={cx("prescriptionTitle")}>Đơn thuốc</h4>
                          <ul className={cx("prescriptionList")}>
                            {selectedAppointment.prescription.map((med, index) => (
                              <li key={index} className={cx("prescriptionItem")}>
                                {med.medicine} - {med.dosage} ({med.instructions})
                                <br /><em>{med.remind}</em>
                              </li>
                            ))}
                          </ul>
                          <p className={cx("remindText")}><em>Lưu ý: Hãy tuân thủ theo chỉ dẫn của bác sĩ để đảm bảo hiệu quả điều trị.</em></p>
                        </div>
                      )}

                    </div>



                  </div>
                )}
              </div>
            )}

            {/* {activeTab === "treatment" && (
              <div className={cx("treatmentContent")}>
                <h2>Thông tin các phiếu xét nghiệm của bệnh nhân</h2>
                <div className={cx("")}>
                  <p>Phiếu xét nghiệm đang được thiết kế, bạn có thể xem tại đây.</p>

                </div>
              </div>
            )} */}
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
        name: PropTypes.string,
      age: PropTypes.number,
      gender: PropTypes.string,
      address: PropTypes.string,
      phone: PropTypes.string,
      email: PropTypes.string,
      patient_code:PropTypes.string
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
