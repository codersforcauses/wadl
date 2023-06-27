import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { getDoc, doc, updateDoc, setDoc } from "firebase/firestore";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import { useLeaderboardStore } from "./leaderboard";

const leaderboardStore = useLeaderboardStore();

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
      await this.createLeaderBoards(tournamentID);
    },
    async addScoreSheet(scoresheet, matchup, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = matchup.level;
      if (scoresheet.affirmativeTeam.total === scoresheet.negativeTeam.total) {
        throw new Error("tie-occured");
      } else {
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
      }
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
      await leaderboardStore.updateLeaderboard(matchup, tournamentID);
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

    async deleteMatchup(level, matchup, tournamentID) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "matchups", tournamentID);
      const lvl = level.toLowerCase();

      this[lvl][0] = this[lvl][0].filter((a) => a.id !== matchup.id);

      await updateDoc(ref, {
        junior: this.junior[0],
        senior: this.senior[0],
        novice: this.novice[0],
      });
    },

    async filterDivision(level, division) {
      return this[level][0].filter((matchup) => matchup.division === division);
    },
    async createLeaderBoards(torniID) {
      await this.getMatchups(torniID);
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = doc($clientFirestore, "leaderboard", torniID);
      const querySnapshot = await getDoc(ref);
      if (!querySnapshot.exists()) {
        const sort = async (arr) => {
          let teams = Array.from(
            new Set(
              arr[0].map(
                (matchup) => matchup.affirmativeTeam || matchup.negativeTeam
              )
            )
          );
          teams = teams.filter((team) => team !== "Bye");
          teams.sort((a, b) => {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
          });
          const info = [];
          for (let i = 0; i <= teams.length; i++) {
            arr[0].forEach((matchup) => {
              if (
                matchup.affirmativeTeam === teams[i] ||
                matchup.negativeTeam === teams[i]
              ) {
                info.push({
                  name: teams[i],
                  division: matchup.division,
                  points: 0,
                });
              }
            });
          }
          const uni = new Set();

          info.filter((obj) => {
            if (uni.has(obj.name)) {
              return false;
            } else {
              uni.add(
                JSON.stringify({
                  name: obj.name,
                  division: obj.division,
                  points: obj.points,
                })
              );
              return true;
            }
          });
          return uni;
        };
        const setup = async (arr) => {
          let max = 0;
          arr.forEach((team) => {
            const info = JSON.parse(team);
            if (JSON.parse(info.division) > max) {
              max = info.division;
            }
          });
          const data = [];
          for (let i = 1; i <= max; i++) {
            const newstuff = [];
            arr.forEach((team) => {
              const data = JSON.parse(team);
              if (parseInt(data.division) === i) {
                newstuff.push(data);
              }
            });
            data.push(newstuff);
          }
          return data;
        };
        const junior = await sort(this.junior);
        const senior = await sort(this.senior);
        const novice = await sort(this.novice);
        const juniorSeperated = await setup(junior);
        const seniorSeperated = await setup(senior);
        const noviceSeperated = await setup(novice);
        const juniorFinal = { ...juniorSeperated };
        const seniorFinal = { ...seniorSeperated };
        const noviceFinal = { ...noviceSeperated };
        await setDoc(ref, {
          junior: juniorFinal,
          senior: seniorFinal,
          novice: noviceFinal,
        });
      }
    },
  },
});
