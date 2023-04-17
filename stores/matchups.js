import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import novice from "~/data/noviceDraw.json";
import junior from "~/data/juniorDraw.json";
import senior from "~/data/seniorDraw.json";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const useMatchupStore = defineStore("matchup", {
  state: () => {
    return {
      data: [],
      lastUpdated: null,
    };
  },
  persist: {
    key: "matchups",
    // eslint-disable-next-line no-undef
    storage: persistedState.localStorage,
  },
  getters: {},
  actions: {
    async getMatchups() {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "matchups");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
      });
      //   if (localStorage.getItem("matchups") === null) {
      //     // ! problems we are facing, the amount of data is so great that the reads will become insane
      //     const ref = collection($clientFirestore, "matchups");
      //     const querySnapshot = await getDocs(ref);
      //     querySnapshot.forEach((doc) => {
      //       this.data = doc.data();
      //     });
      //   } else {
      //     const data = JSON.parse(localStorage.getItem("matchups")).data;
      //     console.log(Date.now());
      // ! keeping this here for uploading the data to the proper database
      //   const ref = collection($clientFirestore, "matchups");
      //   await addDoc(ref, {
      //     noviceMatchups: novice,
      //     juniorMatchups: junior,
      //     seniorMatchups: senior,
      //   });
    },
  },
});
