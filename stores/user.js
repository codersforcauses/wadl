import { defineStore } from "pinia";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
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
      school: null,
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
        school: user.school,
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
        this.role = userInfo.requesting ? "" : userInfo.role;
        this.requesting = userInfo.requesting;
        this.institution = userInfo.institution;
        this.school = userInfo.school;
      }
    },
    async resetPassword(email) {
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
      });
    },
    async updateUser(user) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "users", this.auth.uid);
      await updateDoc(ref, {
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
      });
    },
    async updateuserPassword(password) {
      const { $clientAuth } = useNuxtApp();
      const cred = EmailAuthProvider.credential(
        this.email,
        password.currentPassword
      );
      await reauthenticateWithCredential($clientAuth.currentUser, cred);
      await updatePassword($clientAuth.currentUser, password.password);
    },
    async clearStore() {
      if (process.client) {
        const { $clientAuth } = useNuxtApp();
        if ($clientAuth.currentUser) {
          try {
            await signOut($clientAuth);
          } catch {}
        }
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
