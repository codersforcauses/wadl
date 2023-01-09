import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  updateDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";

export const useadminStore = defineStore("admin", {
  state() {
    return {
      requestingUsers: [],
      filteredUsers: [],
    };
  },
  getters: {},
  actions: {
    async getUsers() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "users");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const user = {
          email: doc.data().email,
          id: doc.id,
          firstName: doc.data().first_name,
          lastName: doc.data().surname,
          institutions: doc.data().institutions,
          requesting: doc.data().requesting,
          role: doc.data().role,
        };
        if (user.requesting === true) {
          this.requestingUsers.push(user);
        }
      });
      this.filteredUsers = [...this.requestingUsers];
    },
    async acceptUser(id) {
      const { $db } = useNuxtApp();
      const ref = doc($db, "users", id.id);
      await updateDoc(ref, { requesting: null, role: id.role })
        .then(() => {
          const indexFilter = this.filteredUsers.indexOf(id);
          this.filteredUsers.splice(indexFilter, 1);
          const indexRequesting = this.requestingUsers.indexOf(id);
          this.requestingUsers.splice(indexRequesting, 1);
          this.requestingUsers = [...this.requestingUsers];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async denyUser(id) {
      const { $db } = useNuxtApp();
      const ref = doc($db, "users", id.id);
      await deleteDoc(ref)
        .then(() => {
          const indexFilter = this.filteredUsers.indexOf(id);
          this.filteredUsers.splice(indexFilter, 1);
          const indexRequesting = this.requestingUsers.indexOf(id);
          this.requestingUsers.splice(indexRequesting, 1);
          this.requestingUsers = [...this.requestingUsers];
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async clearStore() {
      this.requestingUsers = [];
    },
  },
});
