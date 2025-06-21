import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  headers: {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJvbGV4QGdtYWlsLmNvbSIsIm5hbWUiOiJvbGV4IiwiY3JlYXRlZEF0IjoiMjAyNS0wNi0yMVQwOToyMToyMS40ODZaIiwidXBkYXRlZEF0IjoiMjAyNS0wNi0yMVQwOToyMToyMS40ODZaIiwiaWF0IjoxNzUwNDk3NjgxfQ.-isMMCi-m61lgEpLlRW-M5Kg4eDk1BrUjFhQefbeZqQ",
  },
  baseURL: API_URL,
});

export default axiosInstance;
