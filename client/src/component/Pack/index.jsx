import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classNames from "classnames/bind";
import styles from "./Pack.module.scss";
import Paginations from '../Pagination';
const cx = classNames.bind(styles);

function OrderByPack({ packData }) {
    const navigate = useNavigate(); 

    const handlePackClick = (_id) => {
        navigate(`/orderPack/${_id}`); 
    };

    const renderPacks = (currentItems) => (
        <div className={cx('pack-list')}>
            {currentItems.map((pack) => (
                <Link 
                    to={`/orderPack/${pack._id}`} 
                    key={pack._id} 
                    className={cx('pack-link')}
                >
                    <div
                        className={cx('grid-container')}
                        onClick={() => handlePackClick(pack._id)} 
                    >
                        <div className={cx('image')}>
                            <img src={pack.image} alt={pack.name} />
                        </div>
                        <div className={cx('info')}>
                            <h2 className={cx('pack-name')}>{pack.name}</h2>
                            <p className={cx('pack-room')}>{pack.room}</p>
                            <p className={cx('pack-price')}>{pack.price}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
    
    return (
        <div className={cx('order-pack-wrapper')}>
            <Paginations
                data={packData}
                renderItems={renderPacks}
                itemsPerPage={6}
            />
        </div>
    )
}

OrderByPack.propTypes = {
    packData: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            room: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired,
            price: PropTypes.string.isRequired,
        })
    ).isRequired,
};

export default OrderByPack;