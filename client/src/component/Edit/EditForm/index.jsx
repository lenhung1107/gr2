import PropTypes from "prop-types"; // Import prop-types
import classNames from "classnames/bind";
import styles from "./EditForm.module.scss";

const cx = classNames.bind(styles);

const EditForm = ({ user, onChange, onSave, onCancel }) => {
  if (!user) return null;

  return (
    <div className={cx("popupEdit")}>
      <div className={cx("popupContent-Edit")}>
        <h3>Chỉnh sửa thông tin</h3>

        <label>Họ và tên:</label>
        <input
          type="text"
          name="name"
          value={user.name || ""}
          onChange={onChange}
        />
        <label>Tuổi:</label>
        <input
          type="number"
          name="age"
          value={user.age || ""}
          onChange={onChange}
        />

        <label>Giới tính:</label>
        <select name="gender" value={user.gender || ""} onChange={onChange}>
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </select>

        <label>Địa chỉ:</label>
        <input
          type="text"
          name="address"
          value={user.address || ""}
          onChange={onChange}
        />

        <label>Số điện thoại:</label>
        <input
          type="text"
          name="phone"
          value={user.phone || ""}
          onChange={onChange}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={user.email || ""}
          onChange={onChange}
        />
        <div className={cx("popupButtons")}>
          <button onClick={onSave}>Lưu</button>
          <button onClick={onCancel}>Hủy</button>
        </div>
      </div>
    </div>
  );
};

EditForm.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    age: PropTypes.number,
    gender: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditForm;
