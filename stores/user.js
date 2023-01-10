import { defineStore } from "pinia";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNuxtApp } from "#imports";

export const useUserStore = defineStore("user", {
  state() {
    return {
      id: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      role: null,
    };
  },
  getters: {},
  actions: {
    // to view how the data and other stuff happens inside these functions please read the README in the Firebase folder
    async registerUser(user) {
      console.log(user);
      const { $db, $auth } = useNuxtApp();
      createUserWithEmailAndPassword($auth, user.email, user.password)
        .then((userCredential) => {
          // remove this after enough debugging has been done
          console.log(userCredential);
          const person = userCredential.user;
          const usersRef = doc($db, "users", person.uid);
          const data = {
            ID: person.uid,
            role: user.role,
            requesting: true,
            first_name: user.firstName,
            last_name: user.lastName,
            phone_number: user.phoneNumber,
            password: user.password,
            email: user.email,
          };
          setDoc(usersRef, data)
            .then(() => {
              console.log("added");
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorCode, errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + errorMessage);
        });
    },
    async LoginUser(user) {
      const { $auth, $db } = useNuxtApp();
      signInWithEmailAndPassword($auth, user.email, user.password)
        .then((userCredential) => {
          const person = userCredential.user;
          // remove after debug
          console.log("Store - Login User", person.uid);

          const docRef = doc($db, "users", person.uid);
          getDoc(docRef)
            .then((doc) => {
              this.id = doc.data().ID;
              this.firstName = doc.data().first_name;
              this.lastName = doc.data().last_name;
              this.phoneNumber = doc.data().phone_number;
              this.email = doc.data().email;
              this.role = doc.data().role;
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
    clearStore() {
      this.id = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.phoneNumber = null;
      this.role = null;
    },
  },
});
