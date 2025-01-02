
import classNames from "classnames/bind";
import styles from "./Popper.module.scss";
import PropTypes from "prop-types";
const cx = classNames.bind(styles);
function Wrapper({children}) {
    return ( 
        <div className={cx('wrapper')}>
            {children}
        </div>
     );
}
Wrapper.propTypes = {
    children: PropTypes.node.isRequired, // Xác định `children` là bắt buộc và có thể là bất kỳ nội dung React nào
};
export default Wrapper;