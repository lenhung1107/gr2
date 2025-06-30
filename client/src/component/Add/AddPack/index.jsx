import { useState } from "react";
import styles from "./AddPack.module.scss";
import classNames from "classnames/bind";
import axios from "axios";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);

function AddPack({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: "",
    room: "",
    price: "",
    image: "",
    des: "",
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("https://gr2-3t8u.onrender.com/pack/addPack", formData);
      onAdd(res.data); 
      toast.success("Đã thêm gói khám thành công!");
      onClose();
    } catch (err) {
      toast.error("Lỗi khi thêm gói khám");
      console.error(err);
    }
  };

  return (
    <div className={cx("overlay")}>
      <div className={cx("modal")}>
        <h2>Thêm Gói Dịch vụ</h2>
        <input name="name" placeholder="Tên gói" value={formData.name} onChange={handleChange} />
        <input name="room" placeholder="Phòng khám" value={formData.room} onChange={handleChange} />
        <input name="price" placeholder="Giá" value={formData.price} onChange={handleChange} />
        <input name="image" placeholder="Link ảnh" value={formData.image} onChange={handleChange} />
        <textarea name="des" placeholder="Mô tả" value={formData.des} onChange={handleChange}></textarea>

        <div className={cx("buttons")}>
          <button className={cx("add-btn")} onClick={handleSubmit}>Thêm</button>
          <button className={cx("cancel-btn")} onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}
AddPack.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default AddPack;
