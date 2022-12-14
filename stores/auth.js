import { defineStore } from "pinia";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  AuthErrorCodes,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  signOut,
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
      errorCode: "",
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
            phone_number: user.phoneNumber,
            password: user.password,
            email: user.email,
          };
          setDoc(usersRef, data)
            .then(() => {
              console.log("added");
            })
            .catch((error) => {
              this.cleanUpError(error);
            });
        })
        .catch((error) => {
          this.cleanUpError(error);
        });
    },
    async LoginUser(user) {
      const { $auth } = useNuxtApp();
      const auth = getAuth();
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          console.log(auth.currentUser);
          signInWithEmailAndPassword($auth, user.email, user.password)
            .then((userCredential) => {
              const person = userCredential.user;
              // remove after debug
              console.log("Store - Login User", person.uid);

              this.SetUser(person);
            })
            .catch((error) => {
              this.cleanUpError(error);
            });
        })
        .catch((error) => {
          this.cleanUpError(error);
        });
    },
    async cleanUpError(error) {
      console.log(error);
      console.log(AuthErrorCodes);
      switch (error.code) {
        case "auth/user-not-found":
          this.errorCode = "Account not found, try again with a new account";
          break;
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
    SetUser(user) {
      const { $db } = useNuxtApp();
      const docRef = doc($db, "users", user.uid);
      getDoc(docRef)
        .then((doc) => {
          this.id = doc.data().ID;
          this.firstName = doc.data().first_name;
          this.lastName = doc.data().last_name;
          this.phoneNumber = doc.data().phone_number;
          this.email = doc.data().email;
          this.role = doc.data().role;
        })
        .catch((error) => {
          this.cleanUpError(error);
        });
    },
    clearStore() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.id = null;
          this.firstName = null;
          this.lastName = null;
          this.email = null;
          this.phoneNumber = null;
          this.role = null;
          console.log("Sign out successful");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
