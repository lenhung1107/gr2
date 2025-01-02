import classNames from "classnames/bind";
import styles from "./ListDoctor.module.scss";
import Search from "../../component/Layout/DefaultLayout/Search";
import Doctor from "../../component/Doctor";
// import useFetchData from "../../CustomHook/useFetchData";
import doctorData  from "../../data/doctorData"
const cx = classNames.bind(styles);

function ListDoctor() {
    // const apiUrl = "https://api.example.com/doctors"; // URL API khác cho từng trang
    // const { data: doctors, loading, error } = useFetchData(apiUrl);

    return (
        <div className={cx("wrapper")}>
            <Search />
            <div className={cx("brg")}>
                <div className={cx("content")}>
                    <div className={cx("title")}>
                        <span>Chọn bác sĩ đặt khám</span>
                    </div>
                    <div className={cx("menu-doctor")}>
                        {/* {loading && <div>Đang tải danh sách bác sĩ...</div>}
                        {error && <div>Có lỗi xảy ra: {error}</div>}
                        {!loading && !error && doctors && ( */}
                            <Doctor doctors={doctorData} />
                        {/* )} */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListDoctor;
