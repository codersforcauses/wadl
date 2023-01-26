import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const handleError = (error) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "E-mail already in use";
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
        const { $db, $auth } = useNuxtApp();
        const authUser = await createUserWithEmailAndPassword(
          $auth,
          user.email,
          user.password
        );

        await setDoc(doc($db, "users", authUser.user.uid), {
          role: "Admin",
          requesting: false,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
        });
      } catch (err) {
        this.errorCode = handleError(err);
      }
    },

    async fetchUsers() {
      const { $db } = useNuxtApp();
      const snap = await getDocs(collection($db, "users"));
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
        const { $db } = useNuxtApp();
        updateDoc(doc($db, "users", user.id), {
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

    async denyUser(user) {
      try {
        const { $db } = useNuxtApp();
        deleteDoc(doc($db, "users", user.id), {
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
