import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell} from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './NotificationBell.module.scss';

const cx = classNames.bind(styles);

function NotificationBell({ userId }) {
  const [notifications, setNotifications] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (userId && show) {
      fetch(`https://gr2-3t8u.onrender.com/notification/${userId}`)
        .then((res) => res.json())
        .then((data) => setNotifications(data))
        .catch((err) => console.error("Lỗi khi fetch thông báo:", err));
    }
  }, [userId, show]);

  return (
    <div className={cx('wrapper')}>
      <FontAwesomeIcon icon={faBell} size={20} onClick={() => setShow(!show)} className={cx('icon')} />

      {show && (
        <div className={cx('dropdown')}>
          {notifications.length === 0 ? (
            <p>Không có thông báo</p>
          ) : (
            <ul>
              {notifications.map((noti) => (
                <li key={noti._id} className={cx('item')}>
                  <strong>{noti.title}</strong>
                  <p>{noti.body}</p>
                  <span>{new Date(noti.createdAt).toLocaleString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
NotificationBell.propTypes = {
  userId: PropTypes.any.isRequired,
};
export default NotificationBell;
