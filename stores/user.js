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
      auth: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      email: null,
      role: null,
      requesting: null,
      institution: "",
      errorCode: "",
      successCode: "",
    };
  },

  persist: {
    key: "pinia-store",
    debug: true,
    persist: true,
    // eslint-disable-next-line no-undef
    storage: persistedState.sessionStorage,
  },

  getters: {},

  actions: {
    // to view how the data and other stuff happens inside these functions please read the README in the Firebase folder
    async registerUser(user) {
      try {
        const { $clientFirestore, $clientAuth } = useNuxtApp();
        const authUser = await createUserWithEmailAndPassword(
          $clientAuth,
          user.email,
          user.password
        );

        await setDoc(doc($clientFirestore, "users", authUser.user.uid), {
          role: user.role,
          requesting: true,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
        });
        this.successCode =
          "Please wait for approval from admin before logging in.";
      } catch (err) {
        this.cleanUpError(err);
      }
    },

    loginUser(user) {
      try {
        const { $clientAuth } = useNuxtApp();
        signInWithEmailAndPassword(
          $clientAuth,
          user.email,
          user.password
        ).catch((error) => {
          this.cleanUpError(error);
        });
      } catch (err) {
        this.cleanUpError(err);
      }
    },

    async setUser(user) {
      if (user !== null) {
        try {
          const { $clientFirestore } = useNuxtApp();
          const docRef = doc($clientFirestore, "users", user.uid);

          const userDoc = await getDoc(docRef);
          if (!userDoc.exists()) {
            throw new Error("Could not find user document");
          }

          const userInfo = userDoc.data();
          this.auth = user;
          this.firstName = userInfo.firstName;
          this.lastName = userInfo.lastName;
          this.phoneNumber = userInfo.phoneNumber;
          this.email = userInfo.email;
          this.role = userInfo.role;
          this.requesting = userInfo.requesting;
          this.institution = userInfo.institution;
          this.errorCode = null;
        } catch (err) {
          this.cleanUpError(err);
        }
      }
    },
    async resetPassword(email) {
      console.log(email);
      const template = {
        name: "resetPassword",
        data: {
          userEmail: email,
        },
      };
      await $fetch("/api/send-email", {
        method: "post",
        body: {
          userInfo: email,
          emailStructure: template,
        },
      }).catch((error) => {
        console.log(error.message);
        if (
          error.message.includes(
            "There is no user record corresponding to the provided email."
          )
        ) {
          this.errorCode = "There is no user that has this email assigned.";
        }
      });
    },
    async clearStore() {
      try {
        const { $clientAuth } = useNuxtApp();
        await signOut($clientAuth);
        this.auth = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.phoneNumber = null;
        this.role = null;
        this.errorCode = null;
        this.requesting = null;
        this.successCode = null;
        this.institution = null;
      } catch (err) {
        this.cleanUpError(err);
      }
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
        case "auth/wrong-password":
          this.errorCode = "Incorrect Password or Email";
          break;
        default:
          this.errorCode = "Encountered an error";
          break;
      }
    },
  },
});
