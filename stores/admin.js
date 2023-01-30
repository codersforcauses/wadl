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
      requestingUsers: [],
      errorCode: null,
    };
  },

  getters: {},

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
      try {
        const { $clientFirestore, $clientAuth } = useNuxtApp();
        const adminToken = await $clientAuth.currentUser.getIdToken();
        const emailContent = {
          subject: "Your account for WADL has been approved",
          text: "This is the plaintext section of the email body.",
        };
        // updateDoc(doc($clientFirestore, "users", user.id), {
        //   requesting: false,
        //   role: user.role,
        // }).then(async () => {
        //   this.requestingUsers = this.requestingUsers.filter(
        //     (u) => u.id !== user.id
        //   );
        await $fetch("/api/send-email", {
          method: "post",
          body: {
            adminToken,
            userInfo: user,
            emailContent,
          },
          // });
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
          this.requestingUsers = this.requestingUsers.filter(
            (u) => u.id !== user.id
          );
        });
      } catch (err) {
        this.errorCode = handleError(err);
      }
    },
    async clearStore() {
      this.searchTerm = "";
      this.requestingUsers = [];
    },
  },
});
