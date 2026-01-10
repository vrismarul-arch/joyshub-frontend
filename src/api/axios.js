import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================= ADMIN LOGIN ================= */
export const adminLogin = async (email, password) => {
  const res = await api.post("/admin/login", {
    email,
    password,
  });
  return res.data;
};

/* ================= REGISTRATIONS (ADMIN) ================= */

export const fetchRegistrations = async (token) => {
  const res = await api.get("/registrations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateRegistration = async (id, data, token) => {
  const res = await api.put(`/registrations/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteRegistration = async (id, token) => {
  const res = await api.delete(`/registrations/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export default api;
