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
  console.log(historyData)
  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/prescription/getPrescriptionByAppointmentId/${appointmentId}`);
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

  if (loading) return <p style={{ fontSize: "1.6rem", color: "#000" }}>Đang tải đơn thuốc...</p>;
  if (error) return <p style={{ fontSize: "1.6rem", color: "red" }}>{error}</p>;
  if (!prescription) return null;
  console.log(prescription);
  return (

    <table className={cx("table")}>
      <thead>
        <tr>
          <th>#</th>
          <th>Ngày khám</th>
          <th>Bác sĩ</th>
          <th>Lý do</th>
          <th>Chuẩn đoán của bác sĩ</th>
          <th>Kết quả xét nghiệm(nếu có)</th>
          <th>Đơn thuốc</th>
          <th>Lời dặn của bác sĩ</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td data-label="#">1</td>
          <td data-label="Ngày khám">{new Date(prescription.date).toLocaleDateString('vi-VN')}</td>
          <td data-label="Bác sĩ">{prescription.doctor}</td>
          <td data-label="Lý do">{prescription.reason}</td>
          <td data-label="Chuẩn đoán">{prescription.diagnosis}</td>
          <td data-label="Kết quả xét nghiệm">
            <a
              href={prescription.result}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.resultLink}
            >
              Xem kết quả
            </a>
          </td>
          <td data-label="Đơn thuốc">
            {prescription.medicine.map((med, idx) => (
              <div key={idx}>{med}</div>
            ))}
          </td>
          <td data-label="Lời dặn">{prescription.notes || "Không có"}</td>
        </tr>
      </tbody>

    </table>
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
