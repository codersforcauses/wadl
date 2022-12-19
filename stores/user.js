import { defineStore } from "pinia";
import { doc, setDoc } from "firebase/firestore";
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
      email: null,
      role: null,
    };
  },
  getters: {},
  actions: {
    // to view how the data and other stuff happens inside these functions please read the README in the Firebase folder
    async registerUser(user) {
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
      const { $auth } = useNuxtApp();
      signInWithEmailAndPassword($auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential;
          // remove after debug
          console.log("Store - Login User");
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
  },
});
