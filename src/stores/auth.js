import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || "",
    user: JSON.parse(localStorage.getItem("user") || "null"),
  }),
  actions: {
    init() {
      if (this.token) {
        axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      }
    },
    async login(email, password) {
      const { data } = await axios.post("/api/auth/login", { email, password });
      this.token = data.data.token || data.token;
      this.user = data.data?.data || data.data?.user || data.user || data.data;
      axios.defaults.headers.common.Authorization = `Bearer ${this.token}`;
      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    async logout() {
      try {
        await axios.get("/api/auth/logout");
      } catch (error) {
        // Ignorar errores de logout
        console.log("Logout error ignored:", error);
      }
      this.token = "";
      this.user = null;
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
