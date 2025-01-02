import classNames from "classnames/bind";

import styles from "./ListOrderPack.module.scss";

import Search from "../../component/Layout/DefaultLayout/Search"
import OrderByPack from "../../component/Pack"
import packData from "../../data/packData";
const cx = classNames.bind(styles);

function ListOrder() {
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
                        <OrderByPack packData={packData} />
                        
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ListOrder