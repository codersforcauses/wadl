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
export const useAdminStore = defineStore("admin", {
  state() {
    return {
      requestingUsers: [],
      filteredUsers: [],
      errorCode: null,
    };
  },
  getters: {},
  actions: {
    async addUser(user) {
      const { $db, $auth } = useNuxtApp();
      await createUserWithEmailAndPassword($auth, user.email, user.password)
        .then((userCredential) => {
          const person = userCredential.user;
          const usersRef = doc($db, "users", person.uid);
          const data = {
            id: person.uid,
            role: "Admin",
            requesting: false,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            password: user.password,
            email: user.email,
          };
          setDoc(usersRef, data)
            .then(() => {})
            .catch((error) => {
              this.cleanUpError(error);
            });
          this.errorCode = "";
        })
        .catch((error) => {
          this.handleError(error);
        });
    },
    async getUsers() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "users");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const user = {
          email: doc.data().email,
          id: doc.id,
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
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
        })
        .catch((error) => {
          console.log(error);
        });
    },
    handleError(error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          this.errorCode = "E-mail already in use";
          break;
        case "auth/network-request-failed":
          this.errorCode = "Network Failed, Please try again";
          break;
        default:
          this.errorCode = "Error please try again";
          break;
      }
    },
    async clearStore() {
      this.requestingUsers = [];
    },
  },
});
