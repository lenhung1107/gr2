import { useState, useEffect } from "react";

function useFetchData(apiUrl) {
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        let isMounted = true; 
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
            isMounted = false; 
        };
    }, [apiUrl]);

    return { data, loading, error };
}

export default useFetchData;
