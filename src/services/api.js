import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export async function fetchProductByBarcode(code) {
  try {
    console.log("👉 Request a:", `${API.defaults.baseURL}/by-barcode/${code}`);
    const res = await API.get(`/by-barcode/${encodeURIComponent(code)}`);
    return res.data;
  } catch (err) {
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
}
