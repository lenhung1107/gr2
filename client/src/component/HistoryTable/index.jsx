
import PropTypes from "prop-types";
import styles from "./HistoryTable.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function HistoryTable({ historyData }) {
  return (
    <table className={cx('table')}>
      <thead>
        <tr>
          <th>#</th>
          <th>Ngày khám</th>
          <th>Lý do</th>
          <th>Bác sĩ</th>
          <th>Đơn thuốc</th>
          <th>Lời dặn của bác sĩ</th>
        </tr>
      </thead>
      <tbody>
        {historyData.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.date}</td>
            <td>{item.reason}</td>
            <td>{item.doctor}</td>
            <td>
              {item.medicine.map((med, idx) => (
                <div key={idx}>{med}</div>
              ))}
            </td>
            <td>{item.notes}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

HistoryTable.propTypes = {
  historyData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired, // Ngày khám (bắt buộc)
      reason: PropTypes.string.isRequired, // Lý do khám bệnh (bắt buộc)
      doctor: PropTypes.string.isRequired, // Bác sĩ (bắt buộc)
      medicine: PropTypes.arrayOf(PropTypes.string).isRequired, // Danh sách đơn thuốc (bắt buộc)
      notes: PropTypes.string, // Ghi chú của bác sĩ (không bắt buộc)
      invoiceViewLink: PropTypes.string.isRequired, // Link xem hóa đơn (bắt buộc)
      invoiceDownloadLink: PropTypes.string.isRequired, // Link tải hóa đơn (bắt buộc)
    })
  ).isRequired,
};

HistoryTable.defaultProps = {
  historyData: [], // Mặc định là mảng rỗng nếu không có dữ liệu
};

export default HistoryTable;
