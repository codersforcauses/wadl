import { defineStore } from "pinia";

export const useTournamentStore = defineStore("tournament", {
  state: () => {
    return {
      tournaments: [
        {
          id: "1",
          name: "Disinformation Station",
          shortName: "DS",
          status: "Running",
          levels: ["Novice", "Junior", "Senior"],
          rounds: "8",
        },
        {
          id: "2",
          name: "Test Tournament",
          shortName: "TT",
          status: "Complete",
          levels: ["Senior"],
          rounds: "6",
        },
      ],
      // This will look better once firebase is added
      filteredTournaments: [
        {
          id: "1",
          name: "Disinformation Station",
          shortName: "DS",
          status: "Running",
          levels: ["Novice", "Junior", "Senior"],
          rounds: "8",
        },
        {
          id: "2",
          name: "Test Tournament",
          shortName: "TT",
          status: "Complete",
          levels: ["Senior"],
          rounds: "6",
        },
      ],
    };
  },
  getters: {},
  actions: {
    async createTournament(tournament) {
      this.tournaments.push({
        ...tournament,
        id: this.tournaments.length + 1,
      });
      this.filteredTournaments = [...this.tournaments];
    },
    async editTournament(tournament) {
      this.tournaments.forEach((t) => {
        if (t.id === tournament.id) {
          Object.assign(t, tournament);
        }
      });
      this.filteredTournaments = [...this.tournaments];
    },
  },
});
