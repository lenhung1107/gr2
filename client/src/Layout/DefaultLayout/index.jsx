import classNames from "classnames/bind";

import Footer from "./Footer";
import Header from "./Header"
import styles from "./DefaultLayout.module.scss";

import PropTypes from "prop-types";

const cx = classNames.bind(styles)
function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('container')} >
                <div className={cx('content')} >
                    {children}
                </div>
                <div className={cx('pagination')}>
                </div>
            </div>
            <div className={cx('footer')}>
                <Footer />
            </div>

        </div>);
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired, // 'node' đại diện cho bất kỳ nội dung nào có thể render
};
export default DefaultLayout;