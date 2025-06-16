import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import classNames from "classnames/bind";
import styles from "./NotificationBell.module.scss";

const cx = classNames.bind(styles);

function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!userId || !show) return;

      setLoading(true);
      try {
        const res = await fetch(`https://gr2-3t8u.onrender.com/notification/${userId}`);
        if (!res.ok) {
          throw new Error("Lỗi server: " + res.status);
        }
        const data = await res.json();

        if (Array.isArray(data)) {
          setNotifications(data);
        } else {
          console.warn("Dữ liệu không phải array:", data);
          setNotifications([]);
        }
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
        setNotifications([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId, show]);

  const handleToggleDropdown = () => {
    setShow((prev) => !prev);
  };

  return (
    <div className={cx("wrapper")}>
      <FontAwesomeIcon
        icon={faBell}
        size="lg"
        onClick={handleToggleDropdown}
        className={cx("icon")}
      />

      {show && (
        <div className={cx("dropdown")}>
          {loading ? (
            <p>Đang tải thông báo...</p>
          ) : notifications.length > 0 ? (
            <ul>
              {notifications.map((noti) => (
                <li key={noti._id || Math.random()} className={cx("item")}>
                  <strong>{noti.title}</strong>
                  <p>{noti.body}</p>
                  <span>{new Date(noti.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>Không có thông báo</p>
          )}
        </div>
      )}
    </div>
  );
}

NotificationBell.propTypes = {
  userId: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
};

export default NotificationBell;
