import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export const useadminStore = defineStore("admin", {
  state: () => {
    return {
      requestingUsers: [],
    };
  },
  getters: {},
  actions: {
    async getUsers() {
      this.requestingUsers.length = 0;
      const { $db } = useNuxtApp();
      const ref = collection($db, "users");
      // const q = query(ref, where("requesting", "==", true));
      onSnapshot(ref, (snapshot) => {
        snapshot.docs.forEach((doc) => {
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
            console.log(person.requesting);
            this.requestingUsers.push(person);
          }
        });
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
    },
    async denyUser(id) {
      const { $db } = useNuxtApp();

      const ref = doc($db, "users", id.id);
      await deleteDoc(ref);
    },
  },
});
