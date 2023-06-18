import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc } from "firebase/firestore";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => {
    return {
      leaderboard: [],
    };
  },
  getters: {},
  actions: {
    async getLeaderboard(torniID) {
      this.leaderboard.pop();
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "leaderboard", torniID);
      const querySnapshot = await getDoc(ref);
      this.leaderboard.push(querySnapshot.data());
    },
  },
});
