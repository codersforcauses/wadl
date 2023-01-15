import { defineStore } from "pinia";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
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
      requesting: null,
      errorCode: "",
    };
  },
  persist: {
    key: "pinia-store",
    afterRestore: (ctx) => {
      // console.log(ctx.pinia.state.value);
    },
    debug: true,
    persist: true,
    // eslint-disable-next-line no-undef
    storage: persistedState.sessionStorage,
  },
  getters: {},
  actions: {
    // to view how the data and other stuff happens inside these functions please read the README in the Firebase folder
    async registerUser(user) {
      const { $db, $auth } = useNuxtApp();
      await createUserWithEmailAndPassword($auth, user.email, user.password)
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
      await signInWithEmailAndPassword($auth, user.email, user.password)
        .then((userCredential) => {
          const person = userCredential.user;
          this.SetUser(person);
        })
        .catch((error) => {
          this.cleanUpError(error);
        });
    },
    cleanUpError(error) {
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
        case "auth/internal-error":
          if (error.message.indexOf("Requesting state is true") !== -1) {
            this.errorCode = "Need approval from admin to gain access";
          } else if (
            error.message.indexOf(
              "Account not found, please register an account"
            ) !== -1
          ) {
            this.errorCode = "Account not found, please register an account";
          }
          break;
        default:
          this.errorCode = "Error please try again";
          break;
      }
    },
    async SetUser(user) {
      if (user !== null) {
        const { $db } = useNuxtApp();
        const docRef = doc($db, "users", user.uid);
        await getDoc(docRef)
          .then((doc) => {
            this.id = doc.data().ID;
            this.firstName = doc.data().first_name;
            this.lastName = doc.data().last_name;
            this.phoneNumber = doc.data().phone_number;
            this.email = doc.data().email;
            this.role = doc.data().role;
            this.requesting = doc.data().requesting;
          })
          .catch((error) => {
            this.cleanUpError(error);
          });
      }
    },
    async clearStore() {
      const { $auth } = useNuxtApp();
      await signOut($auth)
        .then(() => {
          this.id = null;
          this.firstName = null;
          this.lastName = null;
          this.email = null;
          this.phoneNumber = null;
          this.role = null;
          this.errorCode = null;
          this.requesting = null;
          console.log("Sign out successful");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
});
