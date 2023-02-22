import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  onSnapshot,
  enableIndexedDbPersistence,
} from "firebase/firestore";

export const useTournamentStore = defineStore("tournament", {
  state: () => {
    return {
      tournaments: [],
      currentTournament: null,
      divisions: [],
    };
  },
  getters: {
    getRunning() {
      return this.tournaments.filter(
        (tournament) => tournament.status === "Running"
      );
    },
    getOpen() {
      return this.tournaments.filter(
        (tournament) => tournament.status === "Open"
      );
    },
  },
  actions: {
    async getTournaments() {
      this.clearStore();
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      // enableIndexedDbPersistence($clientFirestore);
      const ref = collection($clientFirestore, "tournaments");
      const querySnapshot = await getDocs(ref, {
        includeMetadataChanges: true,
      });
      querySnapshot.forEach((doc) => {
        const tournament = {
          id: doc.id,
          levels: doc.data().levels,
          name: doc.data().name,
          numRounds: doc.data().numRounds,
          shortName: doc.data().shortName,
          status: doc.data().status,
          venues: doc.data().venues,
        };
        const source = doc.metadata.fromCache ? "local cache" : "server";
        console.log("Data came from " + source);
        this.tournaments.push(tournament);
      });
    },
    async clearStore() {
      this.tournaments = [];
    },
    async createTournament(tournament) {
      const { $clientFirestore } = useNuxtApp();
      console.log(tournament);
      const t = await addDoc(collection($clientFirestore, "tournaments"), {
        levels: tournament.levels,
        name: tournament.name,
        numRounds: tournament.numRounds,
        shortName: tournament.shortName,
        status: tournament.status,
      });

      // Tournament ID becomes auto-generated ID assigned by firestore
      tournament.id = t.id;

      this.tournaments.push({
        ...tournament,
      });
    },
    async editTournament(tournament) {
      const { $clientFirestore } = useNuxtApp();
      await setDoc(doc($clientFirestore, "tournaments", tournament.id), {
        levels: tournament.levels,
        name: tournament.name,
        numRounds: tournament.numRounds,
        shortName: tournament.shortName,
        status: tournament.status,
      });

      this.tournaments.forEach((t) => {
        if (t.id === tournament.id) {
          Object.assign(t, tournament);
        }
      });
    },
    getTournament(id) {
      this.currentTournament = [];
      this.currentTournament = this.tournaments.find((t) => t.id === id);
    },
    getTournamentDivisionsByLevel(level) {
      const levels = this.currentTournament.levels.find(
        (l) => l.level === level
      );
      this.divisions = levels.divisions;
    },
    updateDivision(newVenue, division) {
      const divisionIndex = this.divisions.findIndex(
        (div) => div.division === division
      );
      this.divisions[divisionIndex].venue = { ...newVenue };
    },
    // BUG: Permission Problem
    async updateDivisionVenue(level) {
      const { $clientFirestore } = useNuxtApp();
      const tournamentRef = doc(
        $clientFirestore,
        "tournaments",
        this.currentTournament.id
      );

      const levels = this.currentTournament.levels;
      const index = levels.findIndex((l) => l.level === level);

      this.currentTournament.levels[index].divisions = this.divisions;
      await updateDoc(tournamentRef, this.currentTournament);
    },
    deleteTournament(id) {
      const index = this.tournaments.findIndex((t) => {
        return id === t.id;
      });
      this.tournaments.splice(index, 1);
    },
  },
});
