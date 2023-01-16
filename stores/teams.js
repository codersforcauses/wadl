import { defineStore } from "pinia";

export const useTeamStore = defineStore("team", {
  state: () => {
    return {
      teams: [
        {
          id: 1,
          name: "Perth Modern 1",
          level: "Novice",
          division: "Not Allocated",
          timeslot: "5.15pm",
          venPref1: "Perth Modern",
          venPref2: "BCC",
          venPref3: "Mercy",
          noVenuePref: false,
          weekPref: "Week 1",
          tuesAllocation: true,
          wedAllocation: false,
        },
        {
          id: 2,
          name: "Perth Modern 2",
          level: "Senior",
          division: "Not Allocated",
          timeslot: "7.15pm",
          venPref1: "Perth Modern",
          venPref2: "Trinity",
          venPref3: "Mercy",
          noVenuePref: false,
          weekPref: "Week 1",
          tuesAllocation: true,
          wedAllocation: false,
        },
      ],
    };
  },
  getters: {},
  actions: {},
});
