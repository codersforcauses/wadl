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
      token: null,
      institution: "",
    };
  },

  // persist only on client for now.
  persist: {
    key: "pinia-store",
    debug: true,
    persist: true,
    // eslint-disable-next-line no-undef
    storage: persistedState.localStorage,
  },

  getters: {},

  actions: {
    // to view how the data and other stuff happens inside these functions please read the README in the Firebase folder
    async registerUser(user) {
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
    },

    async loginUser(user) {
      const { $clientAuth } = useNuxtApp();
      await signInWithEmailAndPassword($clientAuth, user.email, user.password);
    },

    async setUser(user) {
      if (user !== null) {
        let userDoc;
        if (!process.client) {
          const { $serverFirestore } = useNuxtApp();
          userDoc = await $serverFirestore
            .collection("users")
            .doc(user.uid)
            .get();
        } else {
          const { $clientFirestore } = useNuxtApp();
          const docRef = doc($clientFirestore, "users", user.uid);
          userDoc = await getDoc(docRef);
        }

        if (!userDoc) {
          throw new Error("Could not find user document");
        }

        const userInfo = userDoc.data();
        this.auth = user;
        this.firstName = userInfo.firstName;
        this.lastName = userInfo.lastName;
        this.phoneNumber = userInfo.phoneNumber;
        this.email = userInfo.email;
        this.role = userInfo.requesting ? "" : userInfo.role; // role not tracked if requesting
        this.requesting = userInfo.requesting;
        this.institution = userInfo.institution;
      }
    },

    async clearStore() {
      if (process.client) {
        // no login on server
        const { $clientAuth } = useNuxtApp();
        await signOut($clientAuth);
      }
      this.auth = null;
      this.firstName = null;
      this.lastName = null;
      this.email = null;
      this.phoneNumber = null;
      this.role = null;
      this.requesting = null;
      this.institution = null;
    },
  },
});
