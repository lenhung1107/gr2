import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Fragment, useEffect } from 'react'
import { publicRouters } from './routes'
import { DefaultLayout } from './Layout'
import { ToastContainer } from 'react-toastify'
import { subscribeUserToPush } from './CustomHook/usePushNotification' // 👈 Đường dẫn đúng nhé
import 'react-toastify/dist/ReactToastify.css'

function App() {
  useEffect(() => {
      console.log("App mounted! Gọi subscribeUserToPush...");
    // 👇 Gọi hàm đăng ký push notification khi app khởi động
    subscribeUserToPush().then(() => {
      console.log("✅ Push notification đã được đăng ký!");
    }).catch(err => {
      console.error("❌ Lỗi khi đăng ký push notification:", err);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          {publicRouters.map((route, index) => {
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            }
            else if (route.layout === null) {
              Layout = Fragment
            }
            const Page = route.component
            return (
              <Route key={index} path={route.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          toastClassName="custom-toast"
        />
      </div>
    </Router>
  )
}

export default App
