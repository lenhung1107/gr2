import classNames from "classnames/bind";

import styles from "./ListOrderPack.module.scss";

import Search from "../../Layout/DefaultLayout/Search"
import OrderByPack from "../../component/Pack"
import useFetchData from "../../CustomHook/useFetchData";

const cx = classNames.bind(styles);

function ListOrder() {
    const apiUrl = "https://gr2-3t8u.onrender.com/pack/getAll"; 
    const { data: packs, loading, error } = useFetchData(apiUrl);
    return (

        <div className={cx('wrapper')}>
            <Search />

            <div className={cx('brg')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <span>
                            Chọn dịch vụ đặt khám
                        </span>
                    </div>
                    <div className={cx('menu-pack')}>
                        {loading && <div>Đang tải danh sách bác sĩ...</div>}
                        {error && <div>Có lỗi xảy ra: {error}</div>}
                        {!loading && !error && packs && (
                            <OrderByPack packData={packs} /> 
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ListOrder