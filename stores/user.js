import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      role: null,
    };
  },
  getters: {},
  actions: {
    async registerUser(user) {
      console.log("Store - Register User", user);
    },
    async LoginUser(user) {
      console.log("Store - Login User", user);
    },
  },
});
