import { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './Paginations.module.scss'; // Tùy chỉnh CSS cho phân trang

const cx = classNames.bind(styles);
const Pagination = ({ totalPages, paginate, currentPage }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      <ul className={cx('pagination')}>
        <li>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number} className={cx({ active: number === currentPage })}>
            <button onClick={() => paginate(number)}>{number}</button>
          </li>
        ))}
        <li>
          <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
      <p>Trang hiện tại: {currentPage}</p>
    </nav>
  );
};
Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};
const Paginations = ({ data, renderItems, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={cx('App')}>
      {/* Render các mục theo kiểu người dùng truyền vào */}
      <div className={cx('content')}>
        {renderItems(currentItems)}

      </div>

      <div className={cx('paginate')}> <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} /></div>
    </div>
  );
};

Paginations.propTypes = {
  data: PropTypes.array.isRequired,         // Dữ liệu cần phân trang
  renderItems: PropTypes.func.isRequired,   // Hàm để render từng mục dữ liệu
  itemsPerPage: PropTypes.number            // Số mục mỗi trang (mặc định 5)
};

export default Paginations;