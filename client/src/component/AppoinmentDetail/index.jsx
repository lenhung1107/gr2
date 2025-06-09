import PropTypes from "prop-types";
import styles from "./AppoinmentDetail.module.scss";
import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import axios from "axios";

const cx = classNames.bind(styles);

function AppoinmentDetail({ historyData }) {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const appointmentId = historyData?._id;
  
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await axios.get(`https://gr2-3t8u.onrender.com/prescription/getPrescriptionByAppointmentId/${appointmentId}`);
        setPrescription(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải đơn thuốc.");
      } finally {
        setLoading(false);
      }
    };

    if (appointmentId) {
      fetchPrescription();
    }
  }, [appointmentId]);

  if (loading) {
    return (
      <div className={cx("loading-container")}>
        <div className={cx("loading-spinner")}></div>
        <p className={cx("loading-text")}>Đang tải thông tin đơn thuốc...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className={cx("error-container")}>
        <div className={cx("error-icon")}>⚠️</div>
        <p className={cx("error-text")}>{error}</p>
      </div>
    );
  }
  
  if (!prescription) return null;

  return (
    <div className={cx("prescription-container")}>
      <div className={cx("prescription-header")}>
        <h2 className={cx("title")}>Chi tiết đơn thuốc</h2>
        <div className={cx("appointment-info")}>
          <span className={cx("appointment-date")}>
            Ngày khám: {new Date(prescription.date).toLocaleDateString('vi-VN')}
          </span>
        </div>
      </div>
      <div className={cx("table-container", "desktop-view")}>
        <table className={cx("table")}>
          <thead>
            <tr>
              <th>Ngày khám</th>
              <th>Bác sĩ</th>
              <th>Lý do khám</th>
              <th>Chuẩn đoán</th>
              <th>Kết quả xét nghiệm</th>
              <th>Đơn thuốc</th>
              <th>Lời dặn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{new Date(prescription.date).toLocaleDateString('vi-VN')}</td>
              <td >{prescription.doctor}</td>
              <td>{prescription.reason}</td>
              <td className={cx("diagnosis")}>{prescription.diagnosis}</td>
              <td>
                {prescription.result ? (
                  <a
                    href={prescription.result}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cx("result-link")}
                  >
                      Xem kết quả
                  </a>
                ) : (
                  <span className={cx("no-result")}>Không có</span>
                )}
              </td>
              <td className={cx("medicine-list")}>
                {prescription.medicine.map((med, idx) => (
                  <div key={idx} className={cx("medicine-item")}>
                    💊 {med}
                  </div>
                ))}
              </td>
              <td className={cx("notes")}>{prescription.notes || "Không có lời dặn"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className={cx("mobile-view")}>
        <div className={cx("prescription-card")}>
          <div className={cx("card-section")}>
            <div className={cx("section-header")}>
              <span className={cx("section-icon")}>👨‍⚕️</span>
              <h3>Thông tin bác sĩ</h3>
            </div>
            <div className={cx("section-content")}>
              <p><strong>Bác sĩ:</strong> {prescription.doctor}</p>
              <p><strong>Ngày khám:</strong> {new Date(prescription.date).toLocaleDateString('vi-VN')}</p>
            </div>
          </div>

          <div className={cx("card-section")}>
            <div className={cx("section-header")}>
              <span className={cx("section-icon")}>📝</span>
              <h3>Lý do khám & Chẩn đoán</h3>
            </div>
            <div className={cx("section-content")}>
              <p><strong>Lý do khám:</strong> {prescription.reason}</p>
              <p><strong>Chẩn đoán:</strong> {prescription.diagnosis}</p>
            </div>
          </div>

          {prescription.result && (
            <div className={cx("card-section")}>
              <div className={cx("section-header")}>
                <span className={cx("section-icon")}>📋</span>
                <h3>Kết quả xét nghiệm</h3>
              </div>
              <div className={cx("section-content")}>
                <a
                  href={prescription.result}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cx("result-link", "mobile-link")}
                >
                  📋 Xem kết quả xét nghiệm
                </a>
              </div>
            </div>
          )}

          <div className={cx("card-section")}>
            <div className={cx("section-header")}>
              <span className={cx("section-icon")}>💊</span>
              <h3>Đơn thuốc</h3>
            </div>
            <div className={cx("section-content")}>
              {prescription.medicine.map((med, idx) => (
                <div key={idx} className={cx("medicine-item", "mobile-medicine")}>
                  <span className={cx("medicine-bullet")}>•</span>
                  {med}
                </div>
              ))}
            </div>
          </div>

          {prescription.notes && (
            <div className={cx("card-section")}>
              <div className={cx("section-header")}>
                <span className={cx("section-icon")}>💬</span>
                <h3>Lời dặn của bác sĩ</h3>
              </div>
              <div className={cx("section-content", "notes-content")}>
                <p>{prescription.notes}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

AppoinmentDetail.propTypes = {
  historyData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
};

AppoinmentDetail.defaultProps = {
  historyData: null,
};

export default AppoinmentDetail;