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
      users: [],
    };
  },

  getters: {
    getRequestingUsers() {
      return this.users.filter((user) => user.requesting === true);
    },
    getApprovedUsers() {
      return this.users.filter((user) => user.requesting === false);
    },
  },

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
      this.users = snap.docs.map((doc) => {
        const user = doc.data();

        return {
          email: user.email,
          id: doc.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          institutions: user.institutions,
          requesting: user.requesting,
          role: user.role,
        };
      });
    },

    async acceptUser(user) {
      try {
        const { $clientFirestore } = useNuxtApp();
        const template = {
          name: "approveUser",
          data: {
            name: user.firstName,
            role: user.role,
          },
        };
        updateDoc(doc($clientFirestore, "users", user.id), {
          requesting: false,
          role: user.role,
        }).then(async () => {
          this.requestingUsers = this.requestingUsers.filter(
            (u) => u.id !== user.id
          );
          await $fetch("/api/send-email", {
            method: "post",
            body: {
              userInfo: user,
              emailStructure: template,
            },
          });
        });
      } catch (err) {
        this.errorCode = handleError(err);
      }
    },

    async denyUser(user) {
      const { $clientFirestore } = useNuxtApp();
      deleteDoc(doc($clientFirestore, "users", user.id), {
        requesting: null,
        role: user.role,
      }).then(() => {
        this.users = this.users.filter((u) => u.id !== user.id);
      });
    },
    async clearStore() {
      this.searchTerm = "";
      this.users = [];
    },
  },
});
