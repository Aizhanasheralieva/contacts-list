import axios from "axios";

const axiosAPI = axios.create({
  baseURL:
    "https://aizhana-js26-default-rtdb.europe-west1.firebasedatabase.app/",
});

export default axiosAPI;
