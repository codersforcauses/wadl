import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs } from "firebase/firestore";

export const useMatchupStore = defineStore("matchup", {
  state: () => {
    return {
      matchups: [],
    };
  },
  // todo (may needs this later on)
  // persist: {
  //   key: "matchups",
  //   // eslint-disable-next-line no-undef
  //   storage: persistedState.localStorage,
  // },
  getters: {},
  actions: {
    async getMatchups() {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "matchups");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        this.matchups.push(doc.data());
      });
    },
  },
});
