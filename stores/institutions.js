import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, doc, updateDoc, getDocs } from "firebase/firestore";

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
      const { $db } = useNuxtApp();
      const ref = doc($db, "institutions", institution.id);
      const sameName = doc($db, "institutions", institution.name);
      console.log(institution);
      console.log(sameName);
      if (!sameName.exists()) {
        await updateDoc(ref, institution)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("institution with same name exists");
      }
    },
  },
});
