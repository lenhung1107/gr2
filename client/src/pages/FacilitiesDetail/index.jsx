import classNames from "classnames/bind";

import styles from "./FacilitiesDetail.module.scss";
import Doctor from "../../component/Doctor";
import doctorData from "../../data/doctorData"
const cx = classNames.bind(styles)

function FacilitiesDetail() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail')}>
                    {/* <div className={cx('img')}> */}
                    <img
                        src="XQuang.png" // Thay link này bằng link ảnh của bác sĩ
                        alt="chuyen khoa"
                        className={cx('facilitiesImage')}
                    />
                    {/* </div> */}
                    <div className={cx('descri')}>
                        <h2>Chuyên khoa Cơ xương khớp</h2>
                        <p>Chuyên khoa Cơ xương khớp – Hệ thống Y tế Thu Cúc TCI quy tụ đội ngũ bác sĩ giỏi chuyên môn, nhiều năm kinh nghiệm trực tiếp thăm khám, hệ thống cơ sở vật chất và trang thiết bị máy móc hiện đại, là địa chỉ uy tín trong khám và điều trị các bệnh lý về cơ xương khớp, ngăn ngừa biến chứng, cải thiện chất lượng cuộc sống cho người bệnh.</p>
                    </div>

                </div>
                <div className={cx('listDoctor')}>
                    <h2>Danh sách các bác sĩ trong chuyên khoa</h2>
                    <div className={cx('item')}>
                        <Doctor doctors={doctorData}/>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default FacilitiesDetail;