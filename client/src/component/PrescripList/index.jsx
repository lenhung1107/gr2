import classNames from "classnames/bind";
import PropTypes from "prop-types";
import styles from "./PrescripList.module.scss";
const cx = classNames.bind(styles);

function PrescripList({ patient, medicines, onClose }) {
    return (
        <div className={cx("prescription-modal")}>
            <h3>Xem đơn thuốc</h3>
            <div className={cx('closeButton')} onClick={onClose}>X</div>
            <div className={cx("patient-info")}>
                <div>
                    <label>Tên bệnh nhân:</label>
                    <input type="email" value={patient?.name} readOnly />
                </div>
                <div>
                    <label>Lý do khám bệnh:</label>
                    <input type="text" value={patient?.reason} readOnly />
                </div>
            </div>
            <div className={cx("medicine-list")}>
                {medicines.map((medicine, index) => (
                    <div key={index} className={cx("medicine-item")}>
                        <input type="text" value={medicine.name} placeholder="Tên thuốc" readOnly />
                        <input type="text" value={medicine.unit} placeholder="unit" readOnly />
                        <input type="number" value={medicine.quantity} readOnly />
                        <input type="text" value={medicine.dosage} placeholder="Liều lượng" readOnly />
                    </div>
                ))}
            </div>
            <button className={cx("btn-add")} >
                Gửi đơn thuốc
            </button>

        </div>
    );
}

PrescripList.propTypes = {
    patient: PropTypes.shape({
        reason: PropTypes.string,
        name: PropTypes.string,
    }),
    medicines: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            unit: PropTypes.string.isRequired,
            quantity: PropTypes.number.isRequired,
            dosage: PropTypes.string.isRequired,
        })
    ).isRequired,
    onClose: PropTypes.func.isRequired,
    onDeleteMedicine: PropTypes.func.isRequired,
};

export default PrescripList;
