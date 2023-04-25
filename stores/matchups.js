import { defineStore } from "pinia";
// import { useNuxtApp } from "#imports";
// import { collection, getDocs, setDoc, doc } from "firebase/firestore";
// import junior from "~/data/juniorDraw.json";
// import senior from "~/data/seniorDraw.json";
// import novice from "~/data/noviceDraw.json";
// import { v4 as uuidv4 } from "uuid";

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
      // const { $clientFirestore } = useNuxtApp();
      // if (!$clientFirestore) return;
      // const ref = collection($clientFirestore, "matchups");
      // const querySnapshot = await getDocs(ref);
      // querySnapshot.forEach((doc) => {
      //   this.matchups.push(doc.data());
      // });
    },
    async uploadMatchups() {
      // const { $clientFirestore } = useNuxtApp();
      // if (!$clientFirestore) return;
      // let junData = [];
      // junior.forEach((element) => {
      //   const data = {
      //     id: uuidv4(),
      //     affirmativeTeam: element.affirmativeTeam,
      //     date: element.date,
      //     division: element.division,
      //     negativeTeam: element.negativeTeam,
      //     round: element.round,
      //     time: element.time,
      //     venue: element.venue,
      //     topic: element.topic,
      //   };
      //   junData.push(data);
      // });
      // let senData = [];
      // senior.forEach((element) => {
      //   const data = {
      //     id: uuidv4(),
      //     affirmativeTeam: element.affirmativeTeam,
      //     date: element.date,
      //     division: element.division,
      //     negativeTeam: element.negativeTeam,
      //     round: element.round,
      //     time: element.time,
      //     venue: element.venue,
      //     topic: element.topic,
      //   };
      //   senData.push(data);
      // });
      // let novData = [];
      // novice.forEach((element) => {
      //   const data = {
      //     id: uuidv4(),
      //     affirmativeTeam: element.affirmativeTeam,
      //     date: element.date,
      //     division: element.division,
      //     negativeTeam: element.negativeTeam,
      //     round: element.round,
      //     time: element.time,
      //     venue: element.venue,
      //     topic: element.topic,
      //   };
      //   novData.push(data);
      // });
      // const ref = doc($clientFirestore, "matchups", "PljEsUqQlxumed5lCBbK");
      // await setDoc(ref, {
      //   novice: novData,
      //   junior: junData,
      //   senior: senData,
      // });
    },
  },
});
