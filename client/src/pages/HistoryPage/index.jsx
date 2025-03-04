import { useState } from "react";
import classNames from "classnames/bind";
import HistoryFilter from "../../component/HistoryFilter"
import HistoryTable from "../../component/HistoryTable";
import styles from "./HistoryPage.module.scss";
const cx = classNames.bind(styles);
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
    {
        "date": "2024-12-20",
        "reason": "Cảm cúm",
        "doctor": "Trần Văn B - Tai Mũi Họng",
        "medicine": ["Thuốc A | 10 viên | Ngày 2 viên", "Thuốc B | 5 gói | Ngày 1 gói"],
        "notes": "Uống nhiều nước và nghỉ ngơi",
        "invoiceViewLink": "/view/2",
        "invoiceDownloadLink": "/download/2"
    },
    {
        "date": "2024-11-30",
        "reason": "Đau đầu",
        "doctor": "Lê Hoàng C - Nội Thần Kinh",
        "medicine": ["Thuốc E | 15 viên | Ngày 2 viên", "Thuốc F | 10 viên | Ngày 1 viên"],
        "notes": "Hạn chế thức khuya",
        "invoiceViewLink": "/view/3",
        "invoiceDownloadLink": "/download/3"
    },
    {
        "date": "2024-11-20",
        "reason": "Viêm họng",
        "doctor": "Nguyễn Thị D - Tai Mũi Họng",
        "medicine": ["Thuốc G | 20 viên | Ngày 3 viên", "Thuốc H | 6 gói | Ngày 2 gói"],
        "notes": "Không uống nước lạnh",
        "invoiceViewLink": "/view/4",
        "invoiceDownloadLink": "/download/4"
    },
    {
        "date": "2024-10-15",
        "reason": "Đau lưng",
        "doctor": "Phạm Văn E - Cơ Xương Khớp",
        "medicine": ["Thuốc I | 10 viên | Ngày 1 viên", "Thuốc J | 8 gói | Ngày 2 gói"],
        "notes": "Tập thể dục nhẹ nhàng",
        "invoiceViewLink": "/view/5",
        "invoiceDownloadLink": "/download/5"
    },
    {
        "date": "2024-09-10",
        "reason": "Đau dạ dày",
        "doctor": "Lý Văn F - Tiêu Hóa",
        "medicine": ["Thuốc K | 14 viên | Ngày 2 viên", "Thuốc L | 5 gói | Ngày 1 gói"],
        "notes": "Không ăn đồ cay nóng",
        "invoiceViewLink": "/view/6",
        "invoiceDownloadLink": "/download/6"
    },
    {
        "date": "2024-08-05",
        "reason": "Đau khớp gối",
        "doctor": "Đỗ Hoài G - Cơ Xương Khớp",
        "medicine": ["Thuốc M | 12 viên | Ngày 2 viên", "Thuốc N | 4 gói | Ngày 1 gói"],
        "notes": "Hạn chế vận động mạnh",
        "invoiceViewLink": "/view/7",
        "invoiceDownloadLink": "/download/7"
    },
    {
        "date": "2024-07-25",
        "reason": "Sốt cao",
        "doctor": "Bùi Quang H - Nhi Khoa",
        "medicine": ["Thuốc O | 16 viên | Ngày 2 viên", "Thuốc P | 6 gói | Ngày 1 gói"],
        "notes": "Theo dõi nhiệt độ cơ thể",
        "invoiceViewLink": "/view/8",
        "invoiceDownloadLink": "/download/8"
    },
    {
        "date": "2024-06-18",
        "reason": "Ho kéo dài",
        "doctor": "Trương Thị I - Phổi",
        "medicine": ["Thuốc Q | 18 viên | Ngày 3 viên", "Thuốc R | 7 gói | Ngày 2 gói"],
        "notes": "Tránh tiếp xúc với khói bụi",
        "invoiceViewLink": "/view/9",
        "invoiceDownloadLink": "/download/9"
    },
    {
        "date": "2024-05-12",
        "reason": "Mất ngủ",
        "doctor": "Cao Minh J - Tâm Thần",
        "medicine": ["Thuốc S | 10 viên | Ngày 1 viên", "Thuốc T | 3 gói | Ngày 1 gói"],
        "notes": "Giữ tinh thần thoải mái",
        "invoiceViewLink": "/view/10",
        "invoiceDownloadLink": "/download/10"
    }
];
function HistoryPage() {
    const [historyData, setHistoryData] = useState(mockData);

    const handleFilter = ({ fromDate, toDate }) => {
        // Giả sử fetch dữ liệu từ server hoặc filter data
        const filteredData = mockData.filter(
            (item) => item.date >= fromDate && item.date <= toDate
        );
        setHistoryData(filteredData);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('brg')}>
                <div className={cx('content')}>
                    <h1>Lịch sử khám bệnh</h1>
                    <div className={cx('filter-container')}>
                        <HistoryFilter onFilter={handleFilter} />
                    </div>

                    <HistoryTable historyData={historyData} />
                </div>

            </div>

        </div>
    );
}

export default HistoryPage;
