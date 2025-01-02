import Footer from "../DefaultLayout/Footer";
import Header from "../DefaultLayout/Header";
import DoctorItem from "../../DoctorItem";
import SearchHome from "../SearchHome";
import doctorList from "../../../data/doctorData";
import  "./Home.module.scss";
import PropTypes from "prop-types";
function HomeLayout({ children }) {
    return (<div>
        <Header />
        
        <div>
            <div >
                {children}
            </div>
        </div>
        <SearchHome/>
        <h1>Bác sĩ nổi bật</h1>
        <DoctorItem doctors={doctorList} />
        <Footer/>
        
    </div>);
}
HomeLayout.propTypes = {
    children: PropTypes.node.isRequired, // 'node' đại diện cho bất kỳ nội dung nào có thể render
  };
export default HomeLayout;