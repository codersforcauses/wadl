import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  doc,
} from "firebase/firestore";

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
    },
    getTeamsByLevel(level) {
      return this.teams.filter((t) => t.level === level);
    },
    getNumberTeams(level) {
      return this.teams.filter((t) => t.level === level).length;
    },
    async updateTeamDivision() {
      const { $clientFirestore } = useNuxtApp();
      const batch = writeBatch($clientFirestore);
      this.allocatedTeams.forEach((team) => {
        console.log("TREREMMS", team);
        const ref = doc(collection($clientFirestore, "teams"), team.id);
        batch.set(ref, team);
      });
      await batch.commit();
    },
    getPreferenceColor(team, venue) {
      console.log("HELLLOOOOO");
      // Venue Preferences
      const isFirstPref = venue.name === team.venuePreference[0];
      const isSecondPref = venue.name === team.venuePreference[1];
      const isThirdPref = venue.name === team.venuePreference[2];

      // Day Preferences
      const hasTuesPref = venue.day === "Tuesday" && team.allocatedTue;
      const hasWedPref = venue.day === "Wednesday" && team.allocatedWed;
      const isDayPref = hasTuesPref || hasWedPref;

      // Week Preferences
      const isWeekPref =
        team.weekPreference.includes(venue.week) ||
        team.weekPreference === "Either";

      // Team is happy with anything
      // todo change to !team.hasVenuePreference (dummy data has wrong boolean value)
      const noPref =
        team.hasVenuePreference &&
        team.weekPreference === "Either" &&
        hasWedPref &&
        hasTuesPref;

      // todo change to !team.hasVenuePreference (dummy data has wrong boolean value)
      if ((isFirstPref || team.hasVenuePreference) && isDayPref && isWeekPref) {
        return "bg-light-green/20";
      } else if (isDayPref) {
        return "bg-light-orange-gold/40";
      } else if (noPref) {
        return "bg-white";
      } else {
        return "bg-danger-red/20";
      }
    },
  },
});
