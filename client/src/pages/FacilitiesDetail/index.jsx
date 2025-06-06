import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import useFetchData from "../../CustomHook/useFetchData";
import styles from "./FacilitiesDetail.module.scss";
import Doctor from "../../component/Doctor";
const cx = classNames.bind(styles)

function FacilitiesDetail() {

    const { id } = useParams();
    const apiUrl = `http://localhost:4000/specialties/${id}`;
    const { data: facility, loading, error } = useFetchData(apiUrl);
    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>Có lỗi xảy ra!</p>;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('detail')}>
                    {/* <div className={cx('img')}> */}
                    <img
                        src={facility.image} // Thay link này bằng link ảnh của bác sĩ
                        alt="chuyen khoa"
                        className={cx('facilitiesImage')}
                    />
                    {/* </div> */}
                    <div className={cx('descri')}>
                        <h2>{facility.name}</h2>
                        <p>{facility.description}</p>
                    </div>

                </div>
                <div className={cx('listDoctor')}>
                    <h2>Danh sách các bác sĩ trong chuyên khoa</h2>
                    <div className={cx('item')}>
                        <Doctor doctors={facility.doctors}/>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default FacilitiesDetail;