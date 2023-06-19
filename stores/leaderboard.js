import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc } from "firebase/firestore";

export const useLeaderboardStore = defineStore("leaderboard", {
  state: () => {
    return {
      novice: [],
      senior: [],
      junior: [],
    };
  },
  getters: {},
  actions: {
    async getLeaderboard(torniID) {
      this.novice.pop();
      this.senior.pop();
      this.junior.pop();
      //
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "leaderboard", torniID);
      const querySnapshot = await getDoc(ref);
      // console.log(querySnapshot.data().junior);
      // this.leaderboard.push(querySnapshot.data());
      this.junior.push(querySnapshot.data().junior);
      this.senior.push(querySnapshot.data().senior);
      this.novice.push(querySnapshot.data().novice);
    },
  },
});
