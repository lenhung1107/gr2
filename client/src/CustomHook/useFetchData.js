import { useState, useEffect } from "react";

function useFetchData(apiUrl) {
    const [data, setData] = useState(null); // Dữ liệu từ API
    const [loading, setLoading] = useState(true); // Trạng thái đang tải
    const [error, setError] = useState(null); // Lỗi khi gọi API

    useEffect(() => {
        let isMounted = true; // Đảm bảo component chưa bị unmount
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const result = await response.json();
                if (isMounted) {
                    setData(result);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false; // Cleanup khi component unmount
        };
    }, [apiUrl]);

    return { data, loading, error };
}

export default useFetchData;
