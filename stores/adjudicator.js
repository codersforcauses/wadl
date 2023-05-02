import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, where, getDocs, query } from "firebase/firestore";

export const useAdjudicatorStore = defineStore("adjudicator", {
  state: () => {
    return {
      adjudicators: [],
    };
  },
  getters: {
    getAdjudicators() {
      return this.adjudicators;
    },
  },
  actions: {
    async fetchAdjudicators() {
      const { $clientFirestore } = useNuxtApp();
      const ref = collection($clientFirestore, "users");
      const q = query(ref, where("role", "==", "Adjudicator"));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        const fullName = doc.data().firstName + " " + doc.data().lastName;
        this.adjudicators.push(fullName);
      });
    },
  },
});
