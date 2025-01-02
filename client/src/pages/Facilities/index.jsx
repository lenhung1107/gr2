import classNames from "classnames/bind";

import styles from "./Facilities.module.scss";
import Search from "../../component/Layout/DefaultLayout/Search";
import FacilitiesItem from "../../component/FacilitiesItem"
import Button from "../../component/Button";
const cx = classNames.bind(styles);

function Facilities() {
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

                        <Button to={'/facilitiesDetail'}>
                            <FacilitiesItem />
                        </Button>
                        <Button to={'/facilitiesDetail'}>
                            <FacilitiesItem />
                        </Button>
                        <Button to={'/facilitiesDetail'}>
                            <FacilitiesItem />
                        </Button>
                        <Button to={'/facilitiesDetail'}>
                            <FacilitiesItem />
                        </Button>
                        <Button to={'/facilitiesDetail'}>
                            <FacilitiesItem />
                        </Button>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Facilities;