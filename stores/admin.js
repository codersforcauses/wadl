import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

const handleError = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "E-mail already in use";
    case "auth/email-already-exists":
      return "E-mail already exists";
    case "auth/network-request-failed":
      return "Network Failed, Please try again";
  }

  return "Error please try again";
};

export const useAdminStore = defineStore("admin", {
  state() {
    return {
      users: [],
      errorCode: null,
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
      try {
        const { $clientAuth } = useNuxtApp();
        const adminToken = await $clientAuth.currentUser.getIdToken();

        // @es-lint ignore
        $fetch("/api/create-admin", {
          method: "post",
          body: {
            adminToken,
            newUser: user,
          },
        });
      } catch (err) {
        // BUG: Errors aren't propogating from the fetch
        this.errorCode = handleError(err.data.statusMessage.code);
      }
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
          institutions: user.institutions,
          requesting: user.requesting,
          role: user.role,
        };
      });
    },

    async acceptUser(user) {
      try {
        const { $clientFirestore } = useNuxtApp();
        updateDoc(doc($clientFirestore, "users", user.id), {
          requesting: false,
          role: user.role,
        }).then(() => {
          this.users = this.users.filter((u) => u.id !== user.id);
        });
      } catch (err) {
        this.errorCode = handleError(err);
      }
    },

    async denyUser(user) {
      try {
        const { $clientFirestore } = useNuxtApp();
        deleteDoc(doc($clientFirestore, "users", user.id), {
          requesting: null,
          role: user.role,
        }).then(() => {
          this.users = this.users.filter((u) => u.id !== user.id);
        });
      } catch (err) {
        this.errorCode = handleError(err);
      }
    },
    async clearStore() {
      this.searchTerm = "";
      this.users = [];
    },
  },
});
