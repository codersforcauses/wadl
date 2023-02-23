import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

export const useTournamentStore = defineStore("tournament", {
  state: () => {
    return {
      tournaments: [],
      filteredTournaments: [],
      hasTournaments: false,
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
    getTournamentById() {
      return (tournamentId) =>
        this.tournaments.find((tournament) => tournament.id === tournamentId);
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
          levels: doc.data().levels,
          name: doc.data().name,
          numRounds: doc.data().numRounds,
          shortName: doc.data().shortName,
          status: doc.data().status,
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
    deleteTournament(id) {
      const index = this.tournaments.findIndex((t) => {
        return id === t.id;
      });
      this.tournaments.splice(index, 1);
    },
    async filterTournaments(tournaments) {
      tournaments.forEach((id) => {
        this.filteredTournaments.push(this.getTournamentById(id));
      });
      this.hasTournaments = true;
    },
  },
});
