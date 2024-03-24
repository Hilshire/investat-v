import axios from "axios";

axios.interceptors.response.use((res) => {
    try {
        if (res.data.code === 2) {
            location.href = res.data.path || '/login'
        }
    } catch (e) {
        console.error(e);
    }
    return res;
});

export default axios