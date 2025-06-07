import classNames from 'classnames/bind'
import styles from "./Home.module.scss"
import { Link } from "react-router-dom"
import Menu from '../../component/Menu'
import Button from '../../component/Button'
const cx = classNames.bind(styles);

function Home() {
    const menuItems = [
        {
            title: 'Khám Bác sĩ',
            description: 'Đặt khám với bác sĩ có chuyên môn cao',
            linkimg: 'doctor.png',
            route: '/listDoctor',
            color: 'primary'
        },
        {
            title: 'Khám Gói Khám',
            description: 'Đặt khám với các gói khám có sẵn',
            linkimg: 'pack.png',
            route: '/listOrderPack',
            color: 'secondary'
        },
        {
            title: 'Khám phá chuyên khoa',
            description: 'Đa dạng chuyên khoa ',
            linkimg: 'home.png',
            route: '/facilities',
            color: 'tertiary'
        },
        {
            title: 'Hồ sơ sức khỏe',
            description: 'Xem và lưu trữ kết quả khám',
            linkimg: 'profile.png',
            route: '/historypage',
            color: 'quaternary'
        },
    ];

    return (
        <div className={cx('background')}>
            <div className={cx('overlay')}>
                <div className={cx('container')}>
                    <div className={cx('hero-section')}>
                        <h1 className={cx('hero-title')}>
                            Chăm sóc sức khỏe thông minh
                        </h1>
                        <p className={cx('hero-subtitle')}>
                            Đặt lịch khám bệnh dễ dàng, nhanh chóng và tiện lợi
                        </p>
                    </div>
                    
                    <div className={cx('menu-grid')}>
                        {menuItems.map((item, index) => (
                            <div key={index} className={cx('menu-item', item.color)}>
                                <Link to={item.route} className={cx('menu-link')}>
                                    <Button>
                                        <Menu 
                                            title={item.title} 
                                            description={item.description} 
                                            linkimg={item.linkimg} 
                                        />
                                    </Button>
                                </Link>
                            </div>
                        ))}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;