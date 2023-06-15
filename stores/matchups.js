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
      // todo refactor this so it not only works with no entries but fix the admin approve as well
      this.pendingMatchups.pop();
      const jun = this.junior[0].filter(
        (matchup) => matchup.adminSignoff === false
      );
      if (jun.length > 0) {
        this.pendingMatchups.push(jun);
      } else {
        console.log("junior is empty");
      }
      const sen = this.senior[0].filter(
        (matchup) => matchup.adminSignoff === false
      );
      if (sen.length > 0) {
        this.pendingMatchups.push(sen);
      } else {
        console.log("sen is empty");
      }
      const nov = this.novice[0].filter(
        (matchup) => matchup.adminSignoff === false
      );
      if (nov.length > 0) {
        this.pendingMatchups.push(nov);
      } else {
        console.log("nov is empty");
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
            console.log(matchup);
          });
          sen = [...result];
        } else if (fileName.includes("junior")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          result.forEach((matchup) => {
            matchup.id = uuidv4();
            console.log(matchup);
          });
          jun = [...result];
        } else if (fileName.includes("novice")) {
          const json = await Papa.parse(file.fileData, { header: true }).data;
          const result = JSON.parse(JSON.stringify(json));
          result.forEach((matchup) => {
            matchup.id = uuidv4();
            console.log(matchup);
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
      console.log(matchup);
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = matchup.level;
      console.log(this[lvl][0].length, lvl);
      for (let i = 0; i < this[lvl][0].length; i++) {
        if (this[lvl][0][i].id === matchup.id) {
          console.log(this[lvl][0][i].id, "match", matchup.id);
          this[lvl][0][i].scoresheet = { ...scoresheet };
          this[lvl][0][i].adminSignoff = false;
          break;
        } else {
          console.log("didnt work");
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
      console.log("APPROVE:", matchup);
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = matchup.level;

      for (let i = 0; i < this[lvl][0].length; i++) {
        if (this[lvl][0][i].id === matchup.id) {
          this[lvl][0][i] = { ...matchup };
          break;
        } else {
          console.log("didnt work");
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
