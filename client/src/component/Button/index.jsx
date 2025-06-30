import classNames from "classnames/bind";
import { Link } from 'react-router-dom';
import styles from "./Button.module.scss"
import PropTypes from 'prop-types';
const cx = classNames.bind(styles);

function Button({ to, href, children, onClick }) {
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
Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    children: PropTypes.node.isRequired, 
    onClick: PropTypes.func,
};

export default Button;