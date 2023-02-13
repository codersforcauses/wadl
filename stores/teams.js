import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, query, where } from "firebase/firestore";

export const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [],
      divisions: new Map(),
      allocatedTeams: new Map(),
      unallocatedTeams: new Map(),
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
    sortTeamDivisionAllocation(level) {
      this.getTeamsByLevel(level).forEach((team) => {
        if (team.division) {
          this.allocatedTeams.set(team.id, team);
        } else {
          this.unallocatedTeams.set(team.id, team);
        }
      });
      console.log("ALLOCATED TEAMS", this.allocatedTeams);
      console.log("unalloc teams", this.unallocatedTeams);
    },
    getTeamsByLevel(level) {
      return this.teams.filter((t) => t.level === level);
    },
    getNumberTeams(level) {
      return this.teams.filter((t) => t.level === level).length;
    },
  },
});
