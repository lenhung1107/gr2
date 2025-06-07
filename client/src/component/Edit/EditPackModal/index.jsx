import { useState, useEffect } from "react";
import styles from "./EditPackModal.module.scss";
import classNames from "classnames/bind";
import { toast } from 'react-toastify';
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function EditPackModal({ pack, onClose, onSave }) {
    const [formData, setFormData] = useState({ ...pack });
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(pack.image);

    useEffect(() => {
        setFormData({ ...pack });
        setPreview(pack.image);
    }, [pack]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Cập nhật preview hình ảnh khi URL thay đổi
        if (name === "image") {
            setPreview(value);
        }
    };

    const formatCurrency = (value) => {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };

    const handlePriceChange = (e) => {
        // Chỉ cho phép nhập số
        const value = e.target.value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, price: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch(`https://gr2-3t8u.onrender.com/pack/updatePack/${formData._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('✅ Cập nhật thành công!');
                const updatedPack = await response.json();
                onSave(updatedPack);
                onClose();
            } else {
                toast.error('❌ Cập nhật thất bại!');

                alert("Cập nhật thất bại. Vui lòng thử lại sau.");
            }
        } catch (err) {
            console.error(err);
            alert("Đã xảy ra lỗi khi cập nhật gói dịch vụ.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={cx("overlay")} onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className={cx("modal")}>
                <div className={cx("header")}>
                    <h2>Chỉnh sửa Gói Dịch vụ</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className={cx("close-btn")}
                        aria-label="Đóng"
                    >×</button>
                </div>
                <form className={cx("body")} onSubmit={handleSubmit}>
                    <div className={cx("form-group")}>
                        <label htmlFor="name">Tên gói:</label>
                        <input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Nhập tên gói dịch vụ"
                        />
                    </div>

                    <div className={cx("form-group")}>
                        <label htmlFor="room">Phòng khám:</label>
                        <input
                            id="room"
                            name="room"
                            value={formData.room}
                            onChange={handleChange}
                            required
                            placeholder="Nhập tên phòng khám"
                        />
                    </div>

                    <div className={cx("form-group")}>
                        <label htmlFor="price">Giá (VNĐ):</label>
                        <input
                            id="price"
                            name="price"
                            value={formData.price ? formatCurrency(formData.price) : ""}
                            onChange={handlePriceChange}
                            required
                            placeholder="Nhập giá dịch vụ"
                        />
                    </div>

                    <div className={cx("form-group")}>
                        <label htmlFor="image">Link ảnh:</label>
                        <div className={cx("image-input-container")}>
                            <input
                                id="image"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Nhập URL hình ảnh"
                            />
                            {preview && (
                                <div className={cx("image-preview")}>
                                    <img src={preview} alt="Preview" onError={() => setPreview("")} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cx("form-group")}>
                        <label htmlFor="des">Mô tả:</label>
                        <textarea
                            id="des"
                            name="des"
                            value={formData.des}
                            onChange={handleChange}
                            placeholder="Nhập mô tả chi tiết về gói dịch vụ"
                        />
                    </div>

                    <div className={cx("actions")}>
                        <button type="button" onClick={onClose}>Hủy</button>
                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Đang lưu..." : "Lưu thay đổi"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

EditPackModal.propTypes = {
    pack: PropTypes.shape({
        name: PropTypes.string,
        room: PropTypes.string,
        price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image: PropTypes.string,
        des: PropTypes.string,
        _id: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
};

export default EditPackModal;