import { defineStore } from "pinia";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { useNuxtApp } from "#imports";

const cleanUpError = (error) => {
  switch (error.code) {
    case "auth/user-not-found":
      return "Account not found, try again with a new account";
    case "auth/email-already-in-use":
      return "E-mail already in use";
    case "auth/network-request-failed":
      return "Network Failed, Please try again";
    case "auth/internal-error":
      if (error.message.indexOf("Requesting state is true") !== -1) {
        return "Need approval from admin to gain access";
      } else if (
        error.message.indexOf(
          "Account not found, please register an account"
        ) !== -1
      ) {
        return "Account not found, please register an account";
      }
  }

  return 'Encountered an error';
};

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
      errorCode: "",
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
        const { $db, $auth } = useNuxtApp();
        const authUser = await createUserWithEmailAndPassword(
          $auth,
          user.email,
          user.password
        );

        await setDoc(doc($db, "users", authUser.user.uid), {
          role: user.role,
          requesting: true,
          firstName: user.firstName,
          lastName: user.lastName,
          phoneNumber: user.phoneNumber,
          email: user.email,
        });
      } catch (err) {
        this.errorCode = cleanUpError(err);
      }
    },

    loginUser(user) {
      try {
        const { $auth } = useNuxtApp();
        signInWithEmailAndPassword(
          $auth,
          user.email,
          user.password
        );
      } catch (err) {
        this.errorCode = cleanUpError(err);
      }
    },

    async setUser(user) {
      if (user !== null) {
        try {
          const { $db } = useNuxtApp();
          const docRef = doc($db, "users", user.uid);

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
          this.errorCode = null;
        } catch (error) {
          this.errorCode = cleanUpError(err);
        }
      }
    },

    async clearStore() {
      try {
        const { $auth } = useNuxtApp();
        await signOut($auth);
        this.auth = null;
        this.firstName = null;
        this.lastName = null;
        this.email = null;
        this.phoneNumber = null;
        this.role = null;
        this.errorCode = null;
        this.requesting = null;
      } catch {
        this.errorCode = cleanUpError(err);
      }
    },
  },
});
