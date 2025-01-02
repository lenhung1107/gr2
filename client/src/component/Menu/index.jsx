import classNames from "classnames/bind";

import styles from "./Menu.module.scss";


const cx=classNames.bind(styles);

function menu({title,description,linkimg}) {
    return (  
        <div className={cx('item-menu')}>
            <div className={cx('img')}>
                <img src={linkimg} height={70} width={90} alt="Logo" />
            </div>
            <h3 className={cx('title-menu')}>{title}</h3>
            <div className={cx('descrip')}>
                {description}
            </div>


        </div>
    );
}

export default menu;