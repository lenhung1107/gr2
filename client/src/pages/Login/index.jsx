import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import { loginUser, registerUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
const cx = classNames.bind(styles);

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, errorMessage } = useSelector((state) => state.auth.login);
  const registerSuccess = useSelector((state) => state.auth.register.success);
  useEffect(() => {
    if (registerSuccess) {
      setIsLogin(true);
    }
  }, [registerSuccess]);
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password
    };
    loginUser(newUser, dispatch, (userData)=>{
      if (userData?.admin) {
        navigate("/adminpage"); // Nếu là admin thì chuyển đến trang admin
      } else {
        navigate("/"); // Nếu không phải admin thì về trang chính
      }
    });
  };
  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      name: name,
      username: username,
      password: password
    }
    registerUser(newUser, dispatch, navigate);
  }
  return (
    <div className={cx("container")}>
      {/* Ảnh bên trái */}
      <div className={cx("image-section")}>
        <img
          src="./login.jpg"
          alt="Illustration"
          className={cx("image")}
        />
      </div>

      {/* Form bên phải */}
      <div className={cx("form-section")}>
        <div className={cx("form-card")}>
          <h2 className={cx("title")}>
            {isLogin ? "Đăng nhập" : "Đăng ký"}
          </h2>
          <form className={cx("form")} >
            <div className={cx("infor")}>
              {!isLogin && (
                <input type="text" placeholder="Tên của bạn" required className={cx("input")} onChange={(e) => setName(e.target.value)} />
              )}
              <input type="text" placeholder="Tên đăng nhập" required className={cx("input")} onChange={(e) => setUsername(e.target.value)} />
              <input type="password" placeholder="Mật khẩu" required className={cx("input")} onChange={(e) => setPassword(e.target.value)} />
            </div>
            {error && <p className={cx("error-message")}>{errorMessage}</p>}
            <span>Quên mật khẩu?</span>


            {isLogin ? <button className={cx("button")} onClick={handleLogin}>Đăng nhập</button> :
              <button className={cx("button")} onClick={handleRegister}>Đăng ký</button>}
          </form>
          <p className={cx("switch-text")}>
            {isLogin ? "Chưa có tài khoản?" : "Đã có tài khoản?"}
            <span
              className={cx("switch-link")}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? " Đăng ký ngay" : " Đăng nhập"}
            </span>
            <br />

          </p>
        </div>
      </div>
    </div>
  );
}
