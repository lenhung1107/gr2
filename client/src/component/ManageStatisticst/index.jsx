import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import axios from "axios";
import styles from "./ManageStatisticst.module.scss";

const cx = classNames.bind(styles);

function ManageStatisticst() {
  const [type, setType] = useState("month");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStatistics = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://gr2-3t8u.onrender.com/statistics/appointments?type=${type}`);
        setData(res.data.data);
      } catch (error) {
        console.error("Lỗi khi fetch thống kê:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStatistics();
  }, [type]);

  const getDateTypeLabel = () => {
    switch (type) {
      case "day":
        return "Ngày";
      case "month":
        return "Tháng";
      case "year":
        return "Năm";
      default:
        return "Thời gian";
    }
  };

  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h2 className={cx("title")}>Thống kê lượt đặt khám</h2>
        <div className={cx("filter")}>
          <label>Thống kê theo: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="day">Ngày</option>
            <option value="month">Tháng</option>
            <option value="year">Năm</option>
          </select>
        </div>
      </div>

      <div className={cx("content")}>
        {loading ? (
          <div className={cx("loading")}>
            <div className={cx("spinner")}></div>
            <p>Đang tải dữ liệu...</p>
          </div>
        ) : (
          <>
            <div className={cx("info-card")}>
              <div className={cx("info-value")}>
                {data.reduce((sum, item) => sum + item.count, 0)}
              </div>
              <div className={cx("info-label")}>Tổng lượt đặt khám</div>
            </div>

            <div className={cx("table-container")}>
              <table className={cx("table")}>
                <thead>
                  <tr>
                    <th>{getDateTypeLabel()}</th>
                    <th>Số lượt đặt khám</th>
                  </tr>
                </thead>
                <tbody>
                  {data.length > 0 ? (
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>{item.label}</td>
                        <td>
                          <div className={cx("count-wrapper")}>
                            <span>{item.count}</span>
                            <div 
                              className={cx("count-bar")} 
                              style={{ 
                                width: `${Math.min(100, (item.count / Math.max(...data.map(d => d.count))) * 100)}%` 
                              }}
                            ></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className={cx("no-data")}>Không có dữ liệu</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ManageStatisticst;