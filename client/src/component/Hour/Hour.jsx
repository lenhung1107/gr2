import classNames from "classnames/bind";

import styles from "./Hour.module.scss";


const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function Hour({ hourText, onClick, isSelected}) {
  return (
    <div className={cx("select")} onClick={() => onClick(hourText)}>
      <div className={cx("hour", { selected: isSelected })}>
        <p>{hourText}</p>
      </div>
    </div>
  );
}

export default Hour;