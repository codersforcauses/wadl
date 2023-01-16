import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
    };
  },
  getters: {},
  actions: {
    async createInstitution(institution) {
      this.institutions.push({
        ...institution,
        id: this.institutions.length + 1,
      });
    },
    async editInstitution(institution) {
      this.institutions.forEach((inst) => {
        if (inst.id === institution.id) {
          Object.assign(inst, institution);
        }
      });
    },
    async getInstitutions() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.data().id,
          name: doc.data().name,
          phoneNumber: doc.data().phone_number,
          email: doc.data().email,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        this.institutions.push(data);
      });
    },
    async checkInstitution(institution) {
      console.log("done");
    },
    async updateProfile(institution) {
      console.log(institution);
      const { $db, $auth } = useNuxtApp();
      const ref = doc($db, "users", $auth.currentUser.uid);
      await updateDoc(ref, { institutions: institution.id });
    },
    async clearStore() {
      this.institutions = [];
    },
  },
});
