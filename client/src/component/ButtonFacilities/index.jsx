import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import styles from "./ButtonFacilities.module.scss"
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function ButtonFacilities({ to, href, children, onClick }) {
    let Comp = 'button';
    const prop = {
        onClick
    };
    if (to) {
        prop.to = to;
        Comp = Link;
    }
    else if (href) {
        prop.href = href;
        Comp = 'a';
    }
    return (
            <Comp className={cx('wrapper')}{...prop}>
                {children}

            </Comp>
    );
}
ButtonFacilities.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    children: PropTypes.node.isRequired, // Yêu cầu phải có
    onClick: PropTypes.func,
};

export default ButtonFacilities;