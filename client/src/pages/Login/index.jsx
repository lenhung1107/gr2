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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, errorMessage } = useSelector((state) => state.auth.login);
  const registerSuccess = useSelector((state) => state.auth.register.success);

  useEffect(() => {
    if (registerSuccess) {
      setIsLogin(true);
      navigate("/login"); // Điều hướng sang trang login
      dispatch(registerReset()); // ✅ Reset trạng thái sau khi chuyển trang

    }
  }, [registerSuccess, navigate,dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username,
      password,
    };
    loginUser(newUser, dispatch, (userData) => {
      if (userData?.admin) {
        navigate("/adminpage");
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
        <img src="./login.jpg" alt="Illustration" className={cx("image")} />
      </div>

      <div className={cx("form-section")}>
        <div className={cx("form-card")}>
          <h2 className={cx("title")}>{isLogin ? "Đăng nhập" : "Đăng ký"}</h2>
          <form className={cx("form")}>
            <div className={cx("infor")}>
              {!isLogin && (
                <>
                  <input type="text" placeholder="Tên của bạn" required className={cx("input")} onChange={(e) => setName(e.target.value)} />
                  <input type="number" placeholder="Tuổi" required className={cx("input")} onChange={(e) => setAge(e.target.value)} />
                  <input type="text" placeholder="Số điện thoại" required className={cx("input")} onChange={(e) => setPhone(e.target.value)} />
                  <input type="text" placeholder="Địa chỉ" required className={cx("input")} onChange={(e) => setAddress(e.target.value)} />
                  <input type="email" placeholder="Email" required className={cx("input")} onChange={(e) => setEmail(e.target.value)} />
                  <select className={cx("input")} onChange={(e) => setGender(e.target.value)}>
                    <option value="">Chọn giới tính</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </>
              )}
              <input type="text" placeholder="Tên đăng nhập" required className={cx("input")} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Mật khẩu" required className={cx("input")} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className={cx("error-message")}>{errorMessage}</p>}
            <span>Quên mật khẩu?</span>
            {isLogin ? (
              <button className={cx("button")} onClick={handleLogin}>Đăng nhập</button>
            ) : (
              <button className={cx("button")} onClick={handleRegister}>Đăng ký</button>
            )}
          </form>
          <p className={cx("switch-text")}>
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <span className={cx("switch-link")} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? " Đăng ký ngay" : " Đăng nhập"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
