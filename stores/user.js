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
      const { $db, $auth } = useNuxtApp();

      console.log("Store - Register User", user, $db, $auth);
    },
    async LoginUser(user) {
      const { $db, $auth } = useNuxtApp();

      console.log("Store - Login User", user, $db, $auth);
    },
  },
});
