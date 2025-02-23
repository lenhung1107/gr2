import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from "./Pack.module.scss";
import Paginations from '../Pagination';
const cx = classNames.bind(styles);

function OrderByPack({ packData }) {
    const navigate = useNavigate(); // Hook để điều hướng

    const handlePackClick = (id) => {
        navigate(`/orderPack/${id}`); // Điều hướng đến URL tương ứng
    };

    const renderPacks = (currentItems) => (
        <div className={cx('pack-list')}>
            {currentItems.map((pack) => (
                <Link to={`/orderPack/${pack.id}`} key={pack.id}>
                    <div
                        className={cx('grid-container')}
                        onClick={() => handlePackClick(pack.id)} // Xử lý khi click
                    >
                        <div className={cx('image')}>
                            <img src={pack.image} height={100} width={200} alt="Logo" />
                        </div>
                        <div className={cx('info')}>
                            <h2>{pack.name}</h2>
                            <p>{pack.room}</p>
                            <p style={{ color: 'rgb(75, 192, 140)' }}>{pack.price}</p>
                        </div>
                    </div>
                </Link>

            ))}
        </div>
    );
    return (
        <Paginations
            data={packData}
            renderItems={renderPacks}
            itemsPerPage={6}
        />
    )
}

OrderByPack.propTypes = {
    packData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            room: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default OrderByPack;
