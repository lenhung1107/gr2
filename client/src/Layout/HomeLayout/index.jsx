import Footer from "../DefaultLayout/Footer";
import Header from "../DefaultLayout/Header";
import DoctorItem from "../../component/DoctorItem";
import SearchHome from "../../Layout/SearchHome";
import styles from "./HomeLayout.module.scss";
import HotNew from "../../component/HotNew";
import useFetchData from "../../CustomHook/useFetchData";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

const cx = classNames.bind(styles);

function HomeLayout({ children }) {
  const apiUrl = "https://gr2-3t8u.onrender.com/doctor/top"; 
    const { data: doctorList, loading, error } = useFetchData(apiUrl);
    if (loading) return <p style={{ fontSize: "1.6rem", color: "#000" }}>Đang tải nội dung..</p>;
    if (error) return <p style={{ fontSize: "1.6rem", color: "red" }}>{error}</p>;
  return (
    <div className={cx("layout-wrapper")}>
      <Header />

      <main className={cx("main-content")}>
        <section className={cx("hero-section")}>{children}</section>

        <section className={cx("search-section")}>
          <SearchHome />
        </section>

        <section className={cx("doctors-section")}>
          <div className={cx("container")}>
            <h2 className={cx("section-title")}>
              <span className={cx("title-icon")}>👨‍⚕️</span>
              Bác sĩ nổi bật
            </h2>
            <DoctorItem doctors={doctorList} />
          </div>
        </section>

        <section className={cx("about-section")}>
          <div className={cx("container")}>
            <div className={cx("about-content")}>
              <div className={cx("about-header")}>
                <h2 className={cx("about-title")}>
                  BookingHealthCare – Đặt lịch khám bệnh
                </h2>
                <div className={cx("title-underline")}></div>
              </div>
              <div className={cx("about-intro")}>
                <p className={cx("intro-text")}>
                  <strong>BookingHealthCare</strong> là ứng dụng chăm sóc sức
                  khỏe trực tuyến 24/7 được thiết kế riêng cho phòng khám cá
                  nhân, giúp kết nối nhanh chóng và thuận tiện giữa bệnh nhân và
                  bác sĩ. Ứng dụng mang đến trải nghiệm đặt lịch khám hiện đại,
                  tiết kiệm thời gian và nâng cao chất lượng chăm sóc y tế.
                </p>
              </div>

              <div className={cx("features-section")}>
                <h3 className={cx("features-title")}>
                  <span className={cx("star-icon")}>⭐</span>
                  Tính năng nổi bật
                </h3>

                <div className={cx("features-grid")}>
                  <div className={cx("feature-card")}>
                    <div className={cx("feature-icon")}>🕒</div>
                    <h4 className={cx("feature-title")}>
                      Đặt lịch khám mọi lúc, mọi nơi
                    </h4>
                    <p className={cx("feature-description")}>
                      Bệnh nhân có thể đặt lịch khám trực tuyến 24/7 chỉ với vài
                      thao tác đơn giản trên điện thoại hoặc máy tính.
                    </p>
                  </div>

                  <div className={cx("feature-card")}>
                    <div className={cx("feature-icon")}>📅</div>
                    <h4 className={cx("feature-title")}>
                      Theo dõi và quản lý lịch hẹn
                    </h4>
                    <p className={cx("feature-description")}>
                      Giao diện trực quan giúp bệnh nhân dễ dàng theo dõi, xác
                      nhận hoặc thay đổi lịch hẹn khi cần thiết.
                    </p>
                  </div>

                  <div className={cx("feature-card")}>
                    <div className={cx("feature-icon")}>🧪</div>
                    <h4 className={cx("feature-title")}>
                      Hỗ trợ chỉ định xét nghiệm
                    </h4>
                    <p className={cx("feature-description")}>
                      Bác sĩ có thể chỉ định xét nghiệm trong quá trình khám,
                      bệnh nhân nhận kết quả ngay trong ứng dụng.
                    </p>
                  </div>

                  <div className={cx("feature-card")}>
                    <div className={cx("feature-icon")}>👨‍👩‍👧‍👦</div>
                    <h4 className={cx("feature-title")}>
                      Đặt lịch cho người thân
                    </h4>
                    <p className={cx("feature-description")}>
                      Cho phép người dùng đặt lịch khám cho người thân một cách
                      dễ dàng, quản lý nhiều người trong cùng một tài khoản.
                    </p>
                  </div>
                </div>
              </div>

              <div className={cx("conclusion")}>
                <p className={cx("conclusion-text")}>
                  Ứng dụng <strong>BookingHealthCare</strong> không chỉ giúp
                  nâng cao hiệu quả vận hành của phòng khám mà còn mang lại sự
                  tiện lợi và hài lòng tối đa cho người bệnh. Đây là giải pháp
                  công nghệ tối ưu, phù hợp với xu hướng chăm sóc sức khỏe hiện
                  đại.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className={cx("news-section")}>
          <div className={cx("container")}>
            <HotNew />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

HomeLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HomeLayout;
