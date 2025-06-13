import classNames from "classnames/bind";
import styles from "./ListDoctor.module.scss";
import Search from "../../Layout/DefaultLayout/Search";
import Doctor from "../../component/Doctor";
import useFetchData from "../../CustomHook/useFetchData";
const cx = classNames.bind(styles);

function ListDoctor() {
    const apiUrl = "https://gr2-3t8u.onrender.com/doctor"; 
    const { data: doctors, loading, error } = useFetchData(apiUrl);

    return (
        <div className={cx("wrapper")}>
            <Search />
            <div className={cx("brg")}>
                <div className={cx("content")}>
                    <div className={cx("title")}>
                        <span>Chọn bác sĩ đặt khám</span>
                    </div>
                    <div className={cx("menu-doctor")}>
                        {loading && <div>Đang tải danh sách bác sĩ...</div>}
                        {error && <div>Có lỗi xảy ra: {error}</div>}
                        {!loading && !error && doctors && (
                            <Doctor doctors={doctors} /> 
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListDoctor;
