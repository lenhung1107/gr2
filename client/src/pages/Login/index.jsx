import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { loginUser, registerUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerReset } from "../../redux/authSlice";

const cx = classNames.bind(styles);

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, errorMessage } = useSelector((state) => state.auth.login);
  const registerSuccess = useSelector((state) => state.auth.register.success);

  useEffect(() => {
    if (registerSuccess) {
      setIsLogin(true);
      navigate("/login");
      dispatch(registerReset());
    }
  }, [registerSuccess, navigate, dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };

    loginUser(newUser, dispatch, async (userData) => {
      localStorage.setItem("user", JSON.stringify(userData));
      const userId = userData?._id;
      if ("Notification" in window && navigator.serviceWorker) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === "granted") {
            const { subscribeUserToPush } = await import(
              "../../CustomHook/usePushNotification"
            );
            subscribeUserToPush(userId) 
              .then(() => {
                console.log("✅ Push subscription sent with user ID:", userId);
              })
              .catch((err) => {
                console.error("❌ Lỗi đăng ký push:", err);
              });
          }
        } catch (err) {
          console.error("❌ Lỗi xin quyền thông báo:", err);
        }
      }

      // ✅ Chuyển trang tương ứng
      if (userData?.admin) {
        navigate("/adminpage");
      } else if (userData?.role === 2) {
        navigate(`/doctorpage/${userData._id}`);
      } else if (userData?.role === 4) {
        navigate(`/packManage/${userData._id}`);
      } else {
        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      username,
      password,
      age: Number(age),
      phone,
      address,
      email,
      gender,
    };
    registerUser(newUser, dispatch);
  };

  return (
    <div className={cx("container")}>
      <div className={cx("image-section")}>
        <div className={cx("image-wrapper")}>
          <img src="./login.jpg" alt="Illustration" className={cx("image")} />
        </div>
      </div>
      <div className={cx("form-section")}>
        <div className={cx("form-card")}>
          <div className={cx("header")}>
            <div className={cx("logo")}>
              <div className={cx("logo-icon")}>🏥</div>
            </div>
            <p className={cx("subtitle")}>
              {isLogin ? "Chào mừng bạn trở lại!" : "Tạo tài khoản mới"}
            </p>
          </div>

          <form className={cx("form")}>
            <div className={cx("form-content")}>
              {!isLogin && (
                <div className={cx("register-fields")}>
                  <div className={cx("form-group")}>
                    <label className={cx("label")}>Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Nhập họ và tên"
                      required
                      className={cx("input")}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className={cx("form-row")}>
                    <div className={cx("form-group", "half")}>
                      <label className={cx("label")}>Tuổi</label>
                      <input
                        type="number"
                        placeholder="Tuổi"
                        required
                        className={cx("input")}
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div className={cx("form-group", "half")}>
                      <label className={cx("label")}>Giới tính</label>
                      <select
                        className={cx("input", "select")}
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                      >
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                        <option value="other">Khác</option>
                      </select>
                    </div>
                  </div>

                  <div className={cx("form-group")}>
                    <label className={cx("label")}>Số điện thoại</label>
                    <input
                      type="tel"
                      placeholder="Nhập số điện thoại"
                      required
                      className={cx("input")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className={cx("form-group")}>
                    <label className={cx("label")}>Địa chỉ</label>
                    <input
                      type="text"
                      placeholder="Nhập địa chỉ"
                      required
                      className={cx("input")}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  <div className={cx("form-group")}>
                    <label className={cx("label")}>Email</label>
                    <input
                      type="email"
                      placeholder="Nhập email"
                      required
                      className={cx("input")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Login fields */}
              <div className={cx("form-group")}>
                <label className={cx("label")}>Tên đăng nhập</label>
                <input
                  type="text"
                  placeholder="Nhập tên đăng nhập"
                  required
                  className={cx("input")}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className={cx("form-group")}>
                <label className={cx("label")}>Mật khẩu</label>
                <div className={cx("password-wrapper")}>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    required
                    className={cx("input")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className={cx("password-toggle")}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              {error && <p className={cx("error-message")}>{errorMessage}</p>}

              {isLogin && (
                <div className={cx("forgot-password")}>
                  <a href="#" className={cx("forgot-link")}>
                    Quên mật khẩu?
                  </a>
                </div>
              )}

              <button
                type="submit"
                className={cx("button")}
                onClick={isLogin ? handleLogin : handleRegister}
              >
                {isLogin ? "Đăng nhập" : "Đăng ký"}
              </button>
            </div>
          </form>

          {/* Switch between login/register */}
          <div className={cx("switch-section")}>
            <p className={cx("switch-text")}>
              {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
              <span
                className={cx("switch-link")}
                onClick={() => setIsLogin(!isLogin)}
              >
                {isLogin ? " Đăng ký ngay" : " Đăng nhập"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
