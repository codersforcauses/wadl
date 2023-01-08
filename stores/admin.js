import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const useadminStore = defineStore("admin", {
  state: () => {
    return {
      requestingUsers: [],
    };
  },
  getters: {},
  actions: {
    async getUsers() {
      this.requestingUsers = [];
      const { $db } = useNuxtApp();
      const ref = collection($db, "users");
      const q = query(ref, where("requesting", "==", true));
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.requestingUsers.push({ ...doc.data(), id: doc.id });
        });
      });
      console.log(this.requestingUsers);
    },
  },
});
