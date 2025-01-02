import classNames from 'classnames/bind'
import styles from "./Home.module.scss"

import { Link } from "react-router-dom";

import Menu from '../../component/Menu';
import Button from '../../component/Button';

// import Search from '../../component/Layout/DefaultLayout/Search';
const cx = classNames.bind(styles);
function Home() {
    return (
        <div className={cx('background')}>
            <div className={cx('wrapper')}>
                <div className="item">
                    <Link to={'/doctorItem'}>
                        <Button>
                            <Menu title={'Khám Online'} description={'Khám từ xa với bác sĩ qua video call'} linkimg={'doctor.png'} />
                        </Button>
                    </Link>
                    <Link to={'/listOrder'}>
                        <Button>
                            <Menu title={'Khám Gói Khám'} description={'Đặt khám với các gói khám có sẵn '} linkimg={'pack.png'} />
                        </Button>
                    </Link>
                    <Link to={'/facilities'}>
                        <Button>
                            <Menu title={'Khám Tại CSYT'} description={'Đặt khám ưu tiên tại bệnh viện'} linkimg={'home.png'} />
                        </Button>
                    </Link>
                    <Link>
                        <Button>
                            <Menu title={'Hồ sơ sức khỏe'} description={'Xem và lưu trữ kết quả khám'} linkimg={'profile.png'} />
                        </Button>
                    </Link>
                    <Link>
                        <Button>
                            <Menu title={'Tư vấn sức khỏe'} description={'Tham khảo tư vấn của bác sĩ'} linkimg={'doctor.png'} />
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Home;