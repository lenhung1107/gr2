import {HomeLayout} from "../component/Layout"
import Home from "../pages/Home"
import ListDoctor from "../pages/ListDoctor"
import ListOrderPack from "../pages/ListOrderPack"
import Facilities from "../pages/Facilities"
import OrderDoctorDetail from "../pages/OrderDoctorDetail"
import OrderPackDetail from "../pages/OrderPackDetail"
import FacilitiesDetail from "../pages/FacilitiesDetail"
import HistoryPage from "../pages/HistoryPage"
import Profile from "../pages/Profile"
import DoctorPage from "../pages/DoctorPage"
import AdminPage from "../pages/AdminPage"
const publicRouters=[
    {path:'/', component :Home, layout :HomeLayout},
    {path:'/listDoctor', component :ListDoctor},
    {path:'/listOrderPack', component :ListOrderPack,},
    {path:'/facilities', component :Facilities},
    {path:'/orderDoctor/:id', component :OrderDoctorDetail},
    {path:'/orderPack/:id', component :OrderPackDetail},
    {path:'/facilitiesDetail', component :FacilitiesDetail},
    {path:'/profile', component :Profile},
    {path:'/historypage', component :HistoryPage},
    {path:'/doctorpage', component :DoctorPage, layout:null},
    {path:'/adminpage', component :AdminPage, layout:null},
]
const privateRouters=[

]
export {publicRouters,privateRouters}