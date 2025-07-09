import { useState, useMemo } from "react";
import classNames from "classnames/bind";
import styles from "./ListOrderPack.module.scss";
import Search from "../../Layout/DefaultLayout/Search";
import OrderByPack from "../../component/Pack";
import useFetchData from "../../CustomHook/useFetchData";

const cx = classNames.bind(styles);

function ListOrder() {
    const apiUrl = "https://gr2-3t8u.onrender.com/pack/getAll";
    const { data: packs, loading, error } = useFetchData(apiUrl);
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (value) => {
        setSearchTerm(value.toLowerCase());
    };

    // Lọc dữ liệu theo tên / mô tả / phòng khám
    const filteredPacks = useMemo(() => {
        if (!packs || !Array.isArray(packs)) return [];
        return packs.filter((pack) => {
            const searchStr = `${pack.name} ${pack.des || ''} ${pack.room}`.toLowerCase();
            return searchStr.includes(searchTerm);
        });
    }, [packs, searchTerm]);

    return (
        <div className={cx('wrapper')}>
            <Search onSearch={handleSearch} />
            <div className={cx('brg')}>
                <div className={cx('content')}>
                    <div className={cx('title')}>
                        <span>Chọn dịch vụ đặt khám</span>
                    </div>
                    <div className={cx('menu-pack')}>
                        {loading && <div>Đang tải danh sách gói khám...</div>}
                        {error && <div>Có lỗi xảy ra: {error}</div>}
                        {!loading && !error && (
                            <OrderByPack packData={filteredPacks} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ListOrder;
