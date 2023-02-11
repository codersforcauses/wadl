import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [],
      divisions: [],
      levels: [],
    };
  },
  getters: {},
  actions: {
    async getTeams() {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "teams");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const team = {
          // id: doc.id,
          name: doc.data().name,
          level: doc.data().level,
          division: doc.data().division,
          timeslot: doc.data().timeslot,
          hasVenuePreference: doc.data().hasVenuePreference,
          venuePreference: doc.data().venuePreference,
          weekPreference: doc.data().weekPreference,
          allocatedTue: doc.data().allocatedTue,
          allocatedWed: doc.data().allocatedWed,
          notes: doc.data().notes,
        };
        this.teams.push(team);
      });
    },
    async getTeamsbyTournament(id) {
      this.teams = [];
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "teams");
      const q = query(ref, where("tournamentId", "==", id));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const team = {
          id: doc.id,
          name: doc.data().name,
          level: doc.data().level,
          division: doc.data().division,
          timeslot: doc.data().timeslot,
          hasVenuePreference: doc.data().hasVenuePreference,
          venuePreference: doc.data().venuePreference,
          weekPreference: doc.data().weekPreference,
          allocatedTue: doc.data().allocatedTue,
          allocatedWed: doc.data().allocatedWed,
          notes: doc.data().notes,
        };
        this.teams.push(team);
      });
    },
    async getTeamByTournamentDivision(tournamentId, level, division) {
      this.divisions = [];
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "teams");
      const q = query(
        ref,
        where("tournamentId", "==", tournamentId),
        where("level", "==", level),
        where("division", "==", division)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const team = {
          id: doc.id,
          tournamentId: doc.data().tournamentId,
          institutionId: doc.data().institutionId,
          name: doc.data().name,
          level: doc.data().level,
          division: doc.data().division,
          timeslot: doc.data().timeslot,
          hasVenuePreference: doc.data().hasVenuePreference,
          venuePreference: doc.data().venuePreference,
          weekPreference: doc.data().weekPreference,
          allocatedTue: doc.data().allocatedTue,
          allocatedWed: doc.data().allocatedWed,
          notes: doc.data().notes,
        };
        this.divisions.push(team);
      });
      console.log("***", this.divisions);
    },
    async getTeamByLevels(level) {
      this.teams = [];
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "teams");
      const q = query(
        ref,
        // where("tournamentId", "==", tournamentId),
        where("level", "==", level)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const team = {
          id: doc.id,
          // tournamentId: doc.data().tournamentId,
          institutionId: doc.data().institutionId,
          name: doc.data().name,
          level: doc.data().level,
          // division: doc.data().division,
          // timeslot: doc.data().timeslot,
          // hasVenuePreference: doc.data().hasVenuePreference,
          // venuePreference: doc.data().venuePreference,
          // weekPreference: doc.data().weekPreference,
          // allocatedTue: doc.data().allocatedTue,
          // allocatedWed: doc.data().allocatedWed,
          // notes: doc.data().notes,
        };
        this.levels.push(team);
      });
      console.log("**", this.levels);
    },
    getNumberTeams(level) {
      return this.teams.filter((t) => t.level === level).length;
    },
  },
});
