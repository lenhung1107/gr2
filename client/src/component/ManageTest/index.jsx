import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faSearch, faTimes, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./ManageTest.module.scss";
import useFetchData from "../../CustomHook/useFetchData";

const cx = classNames.bind(styles);

function ManageTest() {
    const apiUrl = "http://localhost:4000/test/getAll";
    const { data: data, loading, error } = useFetchData(apiUrl);
    const [tests, setTests] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTest, setSelectedTest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState("add"); // add, edit, view
    useEffect(() => {
        if (data) {
            setTests(data);
        }
    }, [data]);
    // Lọc các xét nghiệm theo từ khóa tìm kiếm
    const filteredTests = tests.filter(
        (test) =>
            test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            test.room.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Xử lý thêm xét nghiệm mới
    const handleAddTest = () => {
        setSelectedTest({
            name: "",
            room: ""
        });
        setModalMode("add");
        setIsModalOpen(true);
    };

    // Xử lý chỉnh sửa xét nghiệm
    const handleEditTest = (test) => {
        setSelectedTest(test);
        setModalMode("edit");
        setIsModalOpen(true);
    };
    const handleSaveTest = async () => {
        if (modalMode === "add") {
            try {
                const response = await fetch("http://localhost:4000/test/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: selectedTest.name,
                        room: selectedTest.room,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Thêm xét nghiệm thất bại");
                }
                const newTest = await response.json();
                toast.success("Thêm xét nghiệm thành công!");
                setTests([...tests, newTest]);
                setIsModalOpen(false);
            } catch (error) {
                console.error("Lỗi khi thêm xét nghiệm:", error);
                toast.error("Không thể thêm xét nghiệm.");
            }

        } else if (modalMode === "edit") {
            try {
                // Gọi API để cập nhật thông tin xét nghiệm
                const response = await fetch(`http://localhost:4000/test/update/${selectedTest._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: selectedTest.name,
                        room: selectedTest.room,
                    }),
                });

                if (!response.ok) throw new Error("Cập nhật thất bại");
                toast.success("Cập nhật thông tin xét nghiệm thành công!");
                const updatedTest = await response.json();
                // Cập nhật lại danh sách hiển thị
                const updatedTests = tests.map((test) =>
                    test._id === updatedTest._id ? updatedTest : test
                );
                setTests(updatedTests);
                setIsModalOpen(false);
            } catch (err) {
                console.error("Lỗi cập nhật xét nghiệm:", err);
                alert("Cập nhật xét nghiệm thất bại!");
            }
        }
    };

    // Xử lý xóa xét nghiệm
    const handleDeleteTest = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa xét nghiệm này?")) {
            try {
                const response = await fetch(`http://localhost:4000/test/delete/${id}`, {
                    method: "DELETE",
                });

                if (!response.ok) {
                    throw new Error("Xóa xét nghiệm thất bại.");
                }

                toast.success("Xét nghiệm đã được xóa thành công!");
                const updatedTests = tests.filter((test) => test._id !== id);
                setTests(updatedTests);
            } catch (error) {
                console.error("Lỗi khi xóa:", error);
                toast.error("Không thể xóa xét nghiệm.");
            }
        }
    };


    // Xử lý xem chi tiết xét nghiệm
    if (loading) return <p style={{ fontSize: "1.6rem", color: "#000" }}>Đang tải gói khám...</p>;
    if (error) return <p style={{ fontSize: "1.6rem", color: "red" }}>{error}</p>;
    return (
        <div className={cx("container")}>
            <div className={cx("header")}>
                <h1>Quản lý xét nghiệm</h1>
                <div className={cx("actions")}>
                    <div className={cx("search-box")}>
                        <input
                            type="text"
                            placeholder="Tìm kiếm xét nghiệm..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className={cx("search-btn")}>
                            <span> <FontAwesomeIcon icon={faSearch} /></span>

                        </button>
                    </div>
                    <button className={cx("add-btn")} onClick={handleAddTest}>
                        <span> <FontAwesomeIcon icon={faPlus} />Thêm xét nghiệm</span>
                    </button>
                </div>
            </div>

            <div className={cx("content")}>
                <table className={cx("test-table")}>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên xét nghiệm</th>
                            <th>Phòng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTests.length > 0 ? (
                            filteredTests.map((test, index) => (
                                <tr key={test._id}>
                                    <td>{index + 1}</td>
                                    <td>{test.name}</td>
                                    <td>Phòng {test.room}</td>
                                    <td className={cx("actions-cell")}>
                                        <button
                                            className={cx("edit-btn")}
                                            onClick={() => handleEditTest(test)}
                                        >
                                            <span> <FontAwesomeIcon icon={faEdit} /></span>

                                        </button>
                                        <button
                                            className={cx("delete-btn")}
                                            onClick={() => handleDeleteTest(test._id)}
                                        >
                                            <span> <FontAwesomeIcon icon={faTrashAlt} /></span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className={cx("no-data")}>
                                    Không tìm thấy xét nghiệm nào
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className={cx("modal-overlay")}>
                    <div className={cx("modal")}>
                        <div className={cx("modal-header")}>
                            <h2>
                                {modalMode === "add"
                                    ? "Thêm xét nghiệm mới"
                                    : modalMode === "edit"
                                        ? "Chỉnh sửa xét nghiệm"
                                        : "Chi tiết xét nghiệm"}
                            </h2>
                            <button
                                className={cx("close-btn")}
                                onClick={() => setIsModalOpen(false)}
                            >
                                <span> <FontAwesomeIcon icon={faTimes} /></span>

                            </button>
                        </div>
                        <div className={cx("modal-body")}>
                            <div className={cx("form-group")}>
                                <label>Tên xét nghiệm</label>
                                <input
                                    type="text"
                                    value={selectedTest?.name || ""}
                                    onChange={(e) =>
                                        setSelectedTest({ ...selectedTest, name: e.target.value })
                                    }
                                    disabled={modalMode === "view"}
                                />
                            </div>
                            <div className={cx("form-group")}>
                                <label>Phòng xét nghiệm</label>
                                <input
                                    type="text"
                                    value={selectedTest?.room || ""}
                                    onChange={(e) =>
                                        setSelectedTest({ ...selectedTest, room: e.target.value })
                                    }
                                    disabled={modalMode === "view"}
                                />
                            </div>
                        </div>
                        <div className={cx("modal-footer")}>
                            {modalMode !== "view" && (
                                <button
                                    className={cx("save-btn")}
                                    onClick={handleSaveTest}
                                >
                                    {modalMode === "add" ? "Thêm" : "Lưu"}
                                </button>
                            )}
                            <button
                                className={cx("cancel-btn")}
                                onClick={() => setIsModalOpen(false)}
                            >
                                {modalMode === "view" ? "Đóng" : "Hủy"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageTest;