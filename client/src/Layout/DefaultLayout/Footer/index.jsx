import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram,faTwitter } from '@fortawesome/free-brands-svg-icons';
import styles from './Footer.module.scss'

const cx = classNames.bind(styles)
function Footer() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('infor')}>
                    <h2>Phòng khám tư nhân ABC</h2>
                    <span><FontAwesomeIcon icon={faLocationDot} className={cx('icon')} /> Tầng 4, số 23 Tạ Quang Bửu, Bách Khoa, Hai Bà Trưng, Hà Nội</span>
                    <span><FontAwesomeIcon icon={faPhone} className={cx('icon')} /> 09762525</span>
                    <span><FontAwesomeIcon icon={faEnvelope} className={cx('icon')} /> Nyungcare@booking.com</span>
                </div>
                <div className={cx('function')}>
                    <p>Các dịch vụ đặt lịch cung cấp </p>
                    <ul>
                        <li>Bác sĩ</li>
                        <li>Cơ sở y tế</li>
                        <li>Chuyên khoa</li>
                    </ul>
                </div>
                <div className={cx('privacy')}>
                    <span>Điều khoản sử dụng</span>
                    <span>Chính sách bảo mật</span>
                    <span>Trung tâm trợ giúp</span>
                </div>
            </div>
            <div className={cx('contact-infor')}>
                <FontAwesomeIcon icon={faFacebook} className={cx('icon1')} />
                <FontAwesomeIcon icon={faEnvelope} className={cx('icon1')} />
                <FontAwesomeIcon icon={faInstagram} className={cx('icon1')} />
                <FontAwesomeIcon icon={faTwitter} className={cx('icon1')} />
            </div>
           
        </div>
    );
}

export default Footer;