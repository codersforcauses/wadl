import { defineStore } from "pinia";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [
      
        { "name": "St Mary's" },
        { "name": "St Joseph's" },
        { "name": "St Urban's" },
        { "name": "St Richards" },
        { "name": "St Bernards" },
        { "name": "St Margerettes" },
        { "name": "St John's" },
        { "name": "St Peter's" },
        { "name": "St Paul's" },
        { "name": "St Mark's" },
        { "name": "St Martha's" },
        { "name": "St George's" },
        { "name": "St Thomas's" },
        { "name": "St Anne's" },
        { "name": "St David's" },
        { "name": "St Catherine's" },
        { "name": "St Patrick's" },
      ]
    }
},
  getters: {},
  actions: {
    async CreateInst(institution) {
      this.institutions.push({
        ...institution
      });
      console.log(institutions)
    },
  },
});