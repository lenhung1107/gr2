import { useEffect, useState } from "react";
import styles from "./HotNew.module.scss";
import classNames from "classnames/bind";
import axios from "axios";

const cx = classNames.bind(styles);

function HotNew() {
  const [newsList, setNewsList] = useState([]);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await axios.get("https://gr2-3t8u.onrender.com/hotnew");
        setNewsList(res.data.articles);
      } catch (error) {
        console.error("Lỗi khi lấy tin tức:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className={cx("health-news")}>
      <h2>Tin tức y tế nổi bật</h2>
      <ul>
        {newsList.map((news, index) => (
          <li key={index} className={cx("news-item")}>
            {news.urlToImage && (
              <img
                src={news.urlToImage}
                alt={news.title}
                className={cx("news-image")}
              />
            )}
            <div className={cx("news-content")}>
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                Xem chi tiết
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default HotNew;
