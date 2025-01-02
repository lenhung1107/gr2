import classNames from "classnames/bind";

import styles from "./Hour.module.scss";


const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function Hour({ hourText, onClick, isSelected, isDisabled ,isInSchedule}) {
  const handleClick = () => {
    if (onClick ) {
      onClick(hourText); // Gửi lại hourText khi click
    }
  };
  return (

    <div className={cx('select')} onClick={handleClick}>
      <div className={cx('hour', {
        selected: isSelected,  // Hiển thị màu xanh nếu được chọn
        disabled: isDisabled,  
        inSchedule: isInSchedule,// Vô hiệu hóa nếu booked
      })}>
        <p>{hourText}</p>
      </div>
    </div>
  );
}

export default Hour;