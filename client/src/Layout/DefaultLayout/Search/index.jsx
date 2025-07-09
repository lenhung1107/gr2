import classNames from "classnames/bind";
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import styles from "./Search.module.scss";

const cx = classNames.bind(styles);
function Search({ onSearch }) {
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value); // Gửi giá trị lên component cha
  };

  return (
    <aside className={cx("wrapper")}>
      <div className={cx("slogan")}>
        <h1>Đặt khám trước qua Health Care - Online Service</h1>
        <h2>
          Để được đón tiếp ưu tiên tại bệnh viện và được tư vấn bởi bác sĩ giỏi
        </h2>
      </div>

      <div className={cx("search")}>
        <input
          type="text"
          ref={inputRef}
          value={searchValue}
          placeholder="Tìm triệu chứng, chuyên khoa, tên gói khám"
          spellCheck={false}
          onChange={handleInputChange}
        />
        {!!searchValue && (
          <button
            className={cx("clear-btn")}
            onClick={() => {
              setSearchValue("");
              inputRef.current.focus();
              onSearch("");
            }}
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
        )}
        <button className={cx("search-btn")}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>
    </aside>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Search;
