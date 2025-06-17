import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faTimes } from "@fortawesome/free-solid-svg-icons";
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

  // Đóng dropdown khi click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (show && !event.target.closest(`.${cx("wrapper")}`)) {
        setShow(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show]);

  const handleToggleDropdown = () => {
    setShow((prev) => !prev);
  };

  const unreadCount = notifications.filter(noti => !noti.isRead).length;

  return (
    <div className={cx("wrapper")}>
      <div className={cx("bell-container")} onClick={handleToggleDropdown}>
        <FontAwesomeIcon
          icon={faBell}
          size="lg"
          className={cx("icon")}
        />
        {unreadCount > 0 && (
          <span className={cx("badge")}>{unreadCount > 99 ? '99+' : unreadCount}</span>
        )}
      </div>

      {show && (
        <div className={cx("dropdown")}>
          <div className={cx("header")}>
            <h3>Thông báo</h3>
            <FontAwesomeIcon
              icon={faTimes}
              className={cx("close-btn")}
              onClick={() => setShow(false)}
            />
          </div>

          <div className={cx("content")}>
            {loading ? (
              <div className={cx("loading")}>
                <div className={cx("spinner")}></div>
                <p>Đang tải thông báo...</p>
              </div>
            ) : notifications.length > 0 ? (
              <div className={cx("notification-list")}>
                {notifications.map((noti) => (
                  <div 
                    key={noti._id || Math.random()} 
                    className={cx("item", { unread: !noti.isRead })}
                  >
                    <div className={cx("item-content")}>
                      <div className={cx("title")}>{noti.title}</div>
                      <div className={cx("body")}>{noti.body}</div>
                      <div className={cx("time")}>
                        {new Date(noti.createdAt).toLocaleString('vi-VN', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </div>
                    {!noti.isRead && <div className={cx("unread-dot")}></div>}
                  </div>
                ))}
              </div>
            ) : (
              <div className={cx("empty")}>
                <FontAwesomeIcon icon={faBell} className={cx("empty-icon")} />
                <p>Không có thông báo nào</p>
              </div>
            )}
          </div>

          {notifications.length > 0 && (
            <div className={cx("footer")}>
              <button className={cx("view-all-btn")}>
                Xem tất cả thông báo
              </button>
            </div>
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