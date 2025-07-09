import { useState } from "react";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import useFetchData from "../../CustomHook/useFetchData";
import styles from "./ManagePacks.module.scss";
import EditPackModal from "../Edit/EditPackModal";
import AddPack from "../Add/AddPack";
const cx = classNames.bind(styles);

function ManagePacks() {
  const apiUrl = "https://gr2-3t8u.onrender.com/pack/getAll";
  const { data: data, loading, error } = useFetchData(apiUrl);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPack, setSelectedPack] = useState(null);
  const [editingPack, setEditingPack] = useState(null);
  const [delPopup, setDelPopup] = useState(false);
  const [viewDetail, setViewDetail] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const [packs, setPacks] = useState([]);
  useEffect(() => {
    if (data) {
      setPacks(data);
    }
  }, [data]);
  const filteredPacks = (packs || []).filter(pack =>
    pack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pack.room.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pack.price.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleEdit = (pack) => {
    setEditingPack(pack);
  };
  const handleAddPack = () => {
   setShowAddModal(true);
  };
  const handleSaveEdit = (updatedPack) => {
    setPacks(prev =>
      prev.map(pack => pack._id === updatedPack._id ? updatedPack : pack)
    );
    setEditingPack(null); 
  };
  const handleViewDetails = (pack) => {
    setSelectedPack(pack);
    setViewDetail(true);
  };
  const handleDel = (pack) => {
    setSelectedPack(pack);
    setDelPopup(true);
  };
  const handleCloseDetails = () => {
    setSelectedPack(null);
    setViewDetail(false);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`https://gr2-3t8u.onrender.com/pack/deletePack/${selectedPack._id}`);
      const updatedUsers = filteredPacks.filter((u) => u._id !== selectedPack._id);
      setPacks(updatedUsers);
      setDelPopup(false);
      toast.success("Xóa gói khám!");

    } catch (error) {
      console.error("Lỗi khi xóa bác sĩ:", error);
      toast.error("Lỗi khi xóa bác sĩ");
    }
  };
  if (loading) return <p style={{ fontSize: "1.6rem", color: "#000" }}>Đang tải gói khám...</p>;
  if (error) return <p style={{ fontSize: "1.6rem", color: "red" }}>{error}</p>;
  return (
    <div className={cx("container")}>
      <div className={cx("header")}>
        <h1>Quản lý Gói Dịch vụ Y tế</h1>
        <div className={cx("actions")}>
          <div className={cx("search-bar")}>
            <input
              type="text"
              placeholder="Tìm kiếm gói dịch vụ..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className={cx("search-btn")}>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <button className={cx("add-btn")} onClick={handleAddPack}>
            <span><FontAwesomeIcon icon={faPlus} />Thêm gói dịch vụ mới</span>
            {/* <i className="fas fa-plus"></i> Thêm gói dịch vụ mới */}
          </button>
        </div>
      </div>

      {loading ? (
        <div className={cx("loading")}>Đang tải dữ liệu...</div>
      ) : (
        <div className={cx("pack-grid")}>
          {filteredPacks.length > 0 ? (
            filteredPacks.map((pack) => (
              <div key={pack._id} className={cx("pack-card")}>
                <div className={cx("pack-image")}>
                  <img src={pack.image} alt={pack.name} />
                </div>
                <div className={cx("pack-info")}>
                  <h3>{pack.name}</h3>
                  <p className={cx("pack-room")}>{pack.room}</p>
                  <p className={cx("pack-price")}>{pack.price}</p>
                </div>
                <div className={cx("pack-actions")}>
                  <button className={cx("view-btn")} onClick={() => handleViewDetails(pack)}>
                    Xem chi tiết
                  </button>
                  <button className={cx("edit-btn")} onClick={() => handleEdit(pack)}>
                    <span> <FontAwesomeIcon icon={faEdit} /></span>
                  </button>
                  <button className={cx("delete-btn")} onClick={() => handleDel(pack)}>
                    <span> <FontAwesomeIcon icon={faTrash} /></span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className={cx("no-results")}>Không tìm thấy gói dịch vụ nào.</div>
          )}
        </div>
      )}

      {viewDetail && (
        <div className={cx("modal-overlay")}>
          <div className={cx("modal")}>
            <div className={cx("modal-header")}>
              <h2>{selectedPack.name}</h2>
              <button className={cx("close-btn")} onClick={handleCloseDetails}>
                <span> <FontAwesomeIcon icon={faClose} /></span>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className={cx("modal-body")}>
              <div className={cx("modal-image")}>
                <img src={selectedPack.image} alt={selectedPack.name} />
              </div>
              <div className={cx("modal-details")}>
                <p><strong>Mã gói:</strong> {selectedPack._id}</p>
                <p><strong>Tên gói:</strong> {selectedPack.name}</p>
                <p><strong>Phòng khám:</strong> {selectedPack.room}</p>
                <p><strong>Giá:</strong> {selectedPack.price}</p>
                <p><strong>Mô tả gói:</strong>{selectedPack.des}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {delPopup && (
        <div className={cx("popup")}>
          <div className={cx("popupContent")}>
            <p>Bạn có chắc chắn muốn xóa <strong>{selectedPack?.name}</strong>  không?</p>
            <div className={cx("popupButtons")}>
              <button onClick={confirmDelete}>Có</button>
              <button onClick={() => setDelPopup(false)}>Không</button>
            </div>
          </div>
        </div>
      )}
      {editingPack && (
        <EditPackModal
          pack={editingPack}
          onClose={() => setEditingPack(null)}
          onSave={handleSaveEdit}
        />
      )}
      {showAddModal && (
        <AddPack
          onClose={() => setShowAddModal(false)}
          onAdd={(newPack) => setPacks(prev => [...prev, newPack])}
        />
      )}

      <ToastContainer />
    </div>
  );
}

export default ManagePacks;