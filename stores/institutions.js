import { defineStore } from "pinia";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: []
    }
},
  getters: {},
  actions: {
    async CreateInst(institution) {
      this.institutions.push({
        ...institution
      });
    },
  },
});