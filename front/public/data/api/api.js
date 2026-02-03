import axios from "axios";

// const apiKey = import.meta.env.VITE_REACT_APP_MOVIE_API_KEY;
const baseApi = axios.create({
  baseURL: "http://localhost:8080/api",
  params: {
    // api_key: apiKey,
    language: "ko-KR",
  },
});

export default baseApi;
