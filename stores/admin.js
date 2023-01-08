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
    };
  },
  getters: {},
  actions: {
    async getUsers() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "users");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const person = {
          email: doc.data().email,
          id: doc.id,
          firstName: doc.data().first_name,
          lastName: doc.data().surname,
          institutions: doc.data().institutions,
          requesting: doc.data().requesting,
          role: doc.data().role,
        };
        if (person.requesting === true) {
          this.requestingUsers.push(person);
        }
      });
    },
    async acceptUser(id) {
      const { $db } = useNuxtApp();
      const ref = doc($db, "users", id.id);
      await updateDoc(ref, { requesting: null, role: id.role }).catch(
        (error) => {
          console.log(error);
        }
      );
      const index = this.requestingUsers.indexOf(id);
      this.requestingUsers.splice(index, 1);
    },
    async denyUser(id) {
      const { $db } = useNuxtApp();
      const ref = doc($db, "users", id.id);
      await deleteDoc(ref);
      const index = this.requestingUsers.indexOf(id);
      this.requestingUsers.splice(index, 1);
    },
  },
});
