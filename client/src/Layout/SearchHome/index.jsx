import classNames from "classnames/bind";
// import Tippy from '@tippyjs/react';
import Tippy from '@tippyjs/react/headless';
import { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import styles from "./SearchHome.module.scss";
import{ Wrapper as PopperWrapper } from "../../component/Popper"

const cx = classNames.bind(styles)
function SearchHome() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult]=useState(false);

    const inputRef= useRef()


    useEffect(() => {
        setTimeout(() => {
            setSearchResult([1, 2, 3, 4]);
        }, 0)
    }, [])
  const handleHideResult =()=>{
    setShowResult(false)

  }
    return <aside className={cx('wrapper')}>
        <div className={cx('slogan')}>
            <h1>Đặt khám trước qua Health Care - Online Service</h1>
            <h2>Để được đón tiếp ưu tiên tại bệnh biện và được tư vấn bởi bác sĩ giỏi</h2>

        </div>
        <Tippy
            interactive
            visible={showResult && searchResult.length > 0}
            render={attrs => (

                <div className={cx('search-result')} tabIndex="-1" {...attrs}>

                    <PopperWrapper>
                        <div className={cx('search-text')}>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Dau bung, hoa mat</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Bac si Le Hong Anh</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Dau bung, hoa mat</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Chong ma</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Dau bung, hoa mat</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Dau bung, hoa mat</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Dau bung, hoa mat</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Buon non</span>
                            <span>  <FontAwesomeIcon icon={faCircleXmark} className={cx('icon')} />Buon non</span>

                        </div>
                    </PopperWrapper>
                </div>

            )}
            onClickOutside={ handleHideResult}
        >

            <div className={cx('search')}>

                <input type="text" name="query"
                ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm triệu chứng, chuyên khoa, tên bác sĩ "
                    spellCheck={false}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onFocus={()=>setShowResult(true)}
                />
                {!!searchValue && (
                    <button className={cx('clear-btn')} 
                    onClick={()=>{
                        setSearchValue('');
                        inputRef.current.focus();
                        setShowResult(false)
                        
                    }} >
                        <FontAwesomeIcon icon={faCircleXmark} />
                        {/* {cleart} */}
                    </button>
                )}

                {/* {loading} */}

                <button className={cx('search-btn')}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

            </div>
        </Tippy>



    </aside >
}

export default SearchHome;