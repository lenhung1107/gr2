import classNames from "classnames/bind";
import styles from "./Hour.module.scss";

const cx = classNames.bind(styles);

// eslint-disable-next-line react/prop-types
function Hour({ hourText, onClick, isSelected, isDisabled }) {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(hourText);
    }
  };

  return (
    <div className={cx("select")} onClick={handleClick}>
      <div className={cx("hour", { selected: isSelected, disabled: isDisabled })}>
        <p>{hourText}</p>
      </div>
    </div>
  );
}

export default Hour;
