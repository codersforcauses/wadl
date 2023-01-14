import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
    };
  },
  getters: {},
  actions: {
    async getInstitutions() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const institution = {
          abbreviation: doc.data().abbreviation,
          code: doc.data().code,
          email: doc.data().email,
          id: doc.id,
          name: doc.data().name,
          number: doc.data().phone_number,
        };
        this.institutions.push(institution);
      });
    },
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
  },
});
