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
    };
  },
  getters: {},
  actions: {
    async createInstitution(institution) {
      this.institutions.push({
        ...institution,
      });
    },
    async editInstitution(institution) {
      this.institutions.forEach((inst) => {
        if (inst.id == institution.id) {
          Object.assign(inst, institution);
        }
      });
    },
  },
});
