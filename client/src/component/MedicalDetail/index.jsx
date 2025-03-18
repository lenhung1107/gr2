import classNames from "classnames/bind";
import { useState } from "react";
import PropTypes from "prop-types";
import styles from "./MedicalDetail.module.scss";

const cx = classNames.bind(styles);

function MedicalDetail({ user, onCancel }) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className={cx("popupEdit")}>

      <div className={cx("popupContent-Edit")}>
        <div className={cx("form")}>
          <div className={cx("menu")}>
            <button
              className={cx("tab", { active: activeTab === "info" })}
              onClick={() => setActiveTab("info")}
            >
              Thông Tin Cơ Bản
            </button>
            <button
              className={cx("tab", { active: activeTab === "history" })}
              onClick={() => setActiveTab("history")}
            >
              Lịch sử Khám Bệnh
            </button>
            <button
              className={cx("tab", { active: activeTab === "treatment" })}
              onClick={() => setActiveTab("treatment")}
            >
              Điều trị
            </button>
          </div>
          <div className={cx("content")}>
            {activeTab === "info" && (
              <div className={cx("infoContent")}>
                <img src="/doctor.jpg" alt="Avatar bệnh nhân" />
                <div className={cx("infoText")}>
                  <h2>{user.name}</h2>
                  <p><strong>Giới tính:</strong> {user.gender}</p>
                  <p><strong>Ngày sinh:</strong>{user.age} </p>
                  <p><strong>Nghề nghiệp:</strong></p>
                  <p><strong>Địa chỉ:</strong>{user.address}</p>
                  <p><strong>Ghi chú:</strong> Bệnh nhân thường xuyên bị chảy máu cam</p>
                  <p><strong>Liên hệ:</strong> {user.email}</p>
                  <p><strong>Số điện thoại liên hệ:</strong>{user.phone}</p>
                </div>
                <span><strong>Mã: #P14000010</strong></span>
              </div>
            )}

            {activeTab === "history" && (
              <div className={cx("historyContent")}>
                <h2>Lịch sử khám bệnh</h2>
                <p>Chưa có dữ liệu...</p>
              </div>
            )}

            {activeTab === "treatment" && (
              <div className={cx("treatmentContent")}>
                <h2>Thông tin điều trị</h2>
                <p>Chưa có dữ liệu...</p>
              </div>
            )}
          </div>
        </div>
        <button className={cx('buttonClose')} onClick={onCancel}>
          Đóng
        </button>
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
  }),
  onCancel: PropTypes.func.isRequired,
};

export default MedicalDetail;
