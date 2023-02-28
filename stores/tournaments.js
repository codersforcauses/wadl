import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const useTournamentStore = defineStore("tournament", {
  state: () => {
    return {
      tournaments: [],
      filteredTournaments: [],
      hasTournaments: false,
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
      const ref = collection($clientFirestore, "tournaments");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const tournament = {
          id: doc.id,
          currentRound: doc.data().currentRound,
          levels: doc.data().levels,
          name: doc.data().name,
          numRounds: doc.data().numRounds,
          roundDates: doc.data().roundDates,
          shortName: doc.data().shortName,
          status: doc.data().status,
          venues: doc.data().venues,
        };
        this.tournaments.push(tournament);
      });
    },
    async clearStore() {
      this.tournaments = [];
      this.filteredTournaments = [];
      this.hasTournaments = false;
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

    // ?: use updateDoc rather than setDoc
    async editTournament(tournament) {
      const { $clientFirestore } = useNuxtApp();
      await setDoc(doc($clientFirestore, "tournaments", tournament.id), {
        currentRound: tournament.currentRound,
        levels: tournament.levels,
        name: tournament.name,
        numRounds: tournament.numRounds,
        shortName: tournament.shortName,
        status: tournament.status,
        venues: tournament.venues,
        roundDates: tournament.roundDates,
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
      if (!this.currentTournament.roundDates) {
        this.currentTournament.roundDates = [];
      }
      if (!this.currentTournament.venues) {
        this.currentTournament.venues = [];
      }
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
    async deleteTournament(id) {
      const { $clientFirestore } = useNuxtApp();
      const ref = doc($clientFirestore, "tournaments", id);
      await deleteDoc(ref);
      const index = this.tournaments.findIndex((t) => {
        return id === t.id;
      });
      this.tournaments.splice(index, 1);
    },
    async filterTournaments(tournaments) {
      tournaments.forEach((id) => {
        const index = this.tournaments.findIndex((t) => {
          return id === t.id;
        });
        this.filteredTournaments.push(this.tournaments[index]);
      });
      this.hasTournaments = true;
    },
  },
});
