import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const useAdminStore = defineStore("admin", {
  state() {
    return {
      requestingUsers: [],
    };
  },

  getters: {},

  actions: {
    async createAdmin(user) {
      const { $clientAuth } = useNuxtApp();
      const adminToken = await $clientAuth.currentUser.getIdToken();

      // @es-lint ignore
      await $fetch("/api/create-admin", {
        method: "post",
        body: {
          adminToken,
          newUser: user,
        },
      });
    },

    async fetchUsers() {
      const { $clientFirestore } = useNuxtApp();
      const snap = await getDocs(collection($clientFirestore, "users"));
      this.requestingUsers = snap.docs
        .map((doc) => {
          const user = doc.data();

          return {
            email: user.email,
            id: doc.id,
            firstName: user.firstName,
            lastName: user.lastName,
            institutions: user.institutions,
            requesting: user.requesting,
            role: user.role,
          };
        })
        .filter((user) => {
          return user.requesting;
        });
    },

    async acceptUser(user) {
      const { $clientFirestore } = useNuxtApp();
      updateDoc(doc($clientFirestore, "users", user.id), {
        requesting: false,
        role: user.role,
      }).then(() => {
        this.requestingUsers = this.requestingUsers.filter(
          (u) => u.id !== user.id
        );
      });
    },

    async denyUser(user) {
      const { $clientFirestore } = useNuxtApp();
      deleteDoc(doc($clientFirestore, "users", user.id), {
        requesting: null,
        role: user.role,
      }).then(() => {
        this.requestingUsers = this.requestingUsers.filter(
          (u) => u.id !== user.id
        );
      });
    },
    async clearStore() {
      this.searchTerm = "";
      this.requestingUsers = [];
    },
  },
});
