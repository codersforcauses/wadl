import { defineStore } from "pinia";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [
        {
          id: 1,
          name: "Perth Modern",
          code: "1234",
          abbreviation: "PM",
        },
        {
          id: 2,
          name: "Ballajura Community College",
          code: "111",
          abbreviation: "BCC",
        },
      ],
      teams: [
        {
          id: 1,
          name: "Perth Modern 1",
          level: "Novice",
          division: "Not Allocated",
          timeslot: "5.15pm",
          venuePreferences: ["Perth Modern", "BCC", "Mercy"],
          hasVenuePreference: true,
          weekPreference: "Week 1",
          tuesdayAllocation: true,
          wednesdayAllocation: false,
          notes: "Some note",
        },
        {
          id: 2,
          name: "Perth Modern 2",
          level: "Senior",
          division: "Not Allocated",
          timeslot: "7.15pm",
          venuePreferences: ["Perth Modern", "Trinity", "Mercy"],
          hasVenuePreference: true,
          weekPreference: "Week 1",
          tuesdayAllocation: true,
          wednesdayAllocation: true,
          notes: "Hi",
        },
      ],
    };
  },
  getters: {},
  actions: {
    async createInstitution(institution) {
      this.institutions.push({
        ...institution,
        id: this.institutions.length + 1,
      });
    },
    async editInstitution(institution) {
      this.institutions.forEach((inst) => {
        if (inst.id === institution.id) {
          Object.assign(inst, institution);
        }
      });
    },
    async editTeam(team) {
      this.teams.forEach((t) => {
        if (t.id === team.id) {
          Object.assign(t, team);
        }
      });
    },
    // return all teams with instititution id
    async getTeamById(id) {},
  },
});
