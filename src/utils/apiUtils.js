export const fetchWithHandling = async (url, options = {}) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        } else {
            throw new Error('Unexpected response format: Not JSON');
        }
    } catch (err) {
//        console.error('API Error:', err.message);
        throw err;
    }
};
