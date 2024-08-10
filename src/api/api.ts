import axios from "axios";

const api = axios.create({
  baseURL: "https://lostlhost:5000/api/",
});

export default api;
