import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import Papa from "papaparse";
// import { v4 as uuidv4 } from "uuid";

export const useMatchupStore = defineStore("matchup", {
  state: () => {
    return {
      junior: [],
      senior: [],
      novice: [],
      levelSelected: "",
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
    async getMatchups(torniID) {
      this.matchups = [];
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", torniID);
      const querySnapshot = await getDoc(ref);
      this.junior.push(querySnapshot.data().junior);
      this.senior.push(querySnapshot.data().senior);
      this.novice.push(querySnapshot.data().novice);
    },
    async uploadMatchups(files, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      let jun = [];
      let sen = [];
      let nov = [];
      await files.forEach(async (file) => {
        const fileName = file.fileMetaData.name.toLowerCase();
        if (fileName.includes("senior")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          sen = [...result];
        } else if (fileName.includes("junior")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          jun = [...result];
        } else if (fileName.includes("novice")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          nov = [...result];
        } else {
          throw new Error("Invalid file name");
        }
      });
      await setDoc(ref, {
        novice: nov,
        junior: jun,
        senior: sen,
      });
    },
    async addScoreSheet(scoresheet, matchup, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = matchup.level;
      for (let i = 0; i < this[lvl].length; i++) {
        if (this[lvl][0][i].id === matchup.id) {
          this[lvl][0][i].scoresheet = { ...scoresheet };
          break;
        }
      }
      await updateDoc(ref, {
        junior: this.junior[0],
        senior: this.senior[0],
        novice: this.novice[0],
      });
    },
  },
});
