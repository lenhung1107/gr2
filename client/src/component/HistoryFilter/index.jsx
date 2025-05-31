import PropTypes from "prop-types";
import styles from "./HistoryFilter.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
function HistoryFilter({ onFilter }) {
  const handleFilter = (e) => {
    e.preventDefault();
    const fromDate = e.target.fromDate.value;
    const toDate = e.target.toDate.value;
    onFilter({ fromDate, toDate });
  };

  return (
    <form className={cx('filter')} onSubmit={handleFilter}>
      <div>
        <label>Từ ngày</label>
        <input type="date" name="fromDate" required />
      </div>
      <div>
        <label>Đến ngày</label>
        <input type="date" name="toDate" required />
      </div>
      <button type="submit">Tìm kiếm</button>
      <button type="reset">Reset</button>
    </form>
  );
}

HistoryFilter.propTypes = {
  onFilter: PropTypes.func.isRequired, 
};

export default HistoryFilter;
