import classNames from "classnames/bind";

import styles from "./Facilities.module.scss";
import Search from "../../Layout/DefaultLayout/Search";
import FacilitiesItem from "../../component/FacilitiesItem";
import useFetchData from "../../CustomHook/useFetchData";
import Button from "../../component/Button";
const cx = classNames.bind(styles);

function Facilities() {
    const apiUrl = "http://localhost:4000/specialties"; // URL API khác cho từng trang
    const { data: facilities, loading, error } = useFetchData(apiUrl);
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Có lỗi xảy ra!</p>;
    return (
        <div className={cx('wrapper')}>
            <Search />

            <div className={cx('brg')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <span>
                            Các chuyên khoa ở phòng khám
                        </span>
                    </div>
                    <div className={cx('menu-facilities')}>
                        {facilities && facilities.map((facility) => (
                            <Button key={facility._id} to={`/facilitiesDetail/${facility._id}`}>
                                <FacilitiesItem facility={facility} />
                            </Button>
                        ))}
                    </div>


                </div>
            </div>
        </div>
    )
}

export default Facilities;