import { useState } from "react";
import classNames from "classnames/bind";
import HistoryFilter from "../../component/HistoryFilter"
import HistoryTable from "../../component/HistoryTable";
import styles from "./HistoryPage.module.scss";
const cx = classNames.bind(styles);
function HistoryPage() {
    const [historyData, setHistoryData] = useState([]);

    const handleFilter = ({ fromDate, toDate }) => {
        // Giả sử fetch dữ liệu từ server hoặc filter data
        const filteredData = mockData.filter(
            (item) => item.date >= fromDate && item.date <= toDate
        );
        setHistoryData(filteredData);
    };

    const mockData = [
        {
            date: "2024-12-25",
            reason: "Đau bụng",
            doctor: "NT Quỳnh - Cơ Xương Khớp",
            medicine: ["Thuốc C | 12 viên | Ngày 3 viên", "Thuốc D | 7 gói | Ngày 1 gói"],
            notes: "Nhớ uống thuốc đúng giờ",
            invoiceViewLink: "/view/1",
            invoiceDownloadLink: "/download/1",
        },
        {
            date: "2024-12-24",
            reason: "Đau đầu",
            doctor: "NT Quỳnh - Cơ Xương Khớp",
            medicine: ["Thuốc C | 12 viên", "Thuốc D | 7 gói"],
            notes: "Sử dụng khi đau",
            invoiceViewLink: "/view/2",
            invoiceDownloadLink: "/download/2",
        },
    ];

    return (
        <div className={cx('wrapper')}>
            <h1>Lịch sử khám bệnh</h1>
            <HistoryFilter onFilter={handleFilter} />
            <HistoryTable historyData={historyData} />
        </div>
    );
}

export default HistoryPage;
