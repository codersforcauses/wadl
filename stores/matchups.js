import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";

export const useMatchupStore = defineStore("matchup", {
  state: () => {
    return {
      junior: [],
      senior: [],
      novice: [],
      pendingMatchups: [],
    };
  },
  actions: {
    async sortPendingMatchups() {
      this.pendingMatchups = [];
      const jun = this.junior[0].filter(
        (matchup) => matchup.adminSignoff === false
      );
      if (jun.length > 0) {
        this.pendingMatchups.push({ level: "junior", junior: jun });
      }
      const sen = this.senior[0].filter(
        (matchup) => matchup.adminSignoff === false
      );
      if (sen.length > 0) {
        this.pendingMatchups.push({ level: "senior", senior: sen });
      }
      const nov = this.novice[0].filter(
        (matchup) => matchup.adminSignoff === false
      );
      if (nov.length > 0) {
        this.pendingMatchups.push({ level: "novice", novice: nov });
      }
    },
    async getMatchups(torniID) {
      this.junior.pop();
      this.senior.pop();
      this.novice.pop();
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
          result.forEach((matchup) => {
            matchup.id = uuidv4();
          });
          sen = [...result];
        } else if (fileName.includes("junior")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          result.forEach((matchup) => {
            matchup.id = uuidv4();
          });
          jun = [...result];
        } else if (fileName.includes("novice")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          result.forEach((matchup) => {
            matchup.id = uuidv4();
          });
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
      for (let i = 0; i < this[lvl][0].length; i++) {
        if (this[lvl][0][i].id === matchup.id) {
          this[lvl][0][i].scoresheet = { ...scoresheet };
          this[lvl][0][i].adminSignoff = false;
          break;
        }
      }
      await updateDoc(ref, {
        junior: this.junior[0],
        senior: this.senior[0],
        novice: this.novice[0],
      });
    },
    async updateCollection(matchup, tournamentID) {
      console.log(matchup + tournamentID);
    },
    async apporveMatchup(matchup, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = matchup.level;

      for (let i = 0; i < this[lvl][0].length; i++) {
        if (this[lvl][0][i].id === matchup.id) {
          this[lvl][0][i] = { ...matchup };
          break;
        }
      }
      await updateDoc(ref, {
        junior: this.junior[0],
        senior: this.senior[0],
        novice: this.novice[0],
      });
    },

    async updateMatchups(level, matchup, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = level.toLowerCase();
      for (let i = 0; i < this[lvl].length; i++) {
        if (this[lvl][0][i].id === matchup.id) {
          this[lvl][0][i] = { ...matchup };
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
