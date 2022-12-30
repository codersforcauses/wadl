import { defineStore } from "pinia";
// import { v4 as uuid } from 'uuid';

// export const useInstitutionStore = defineStore("institutions", {
//   state() {
//     return {
//       institutions: []
//     };
//   },
//   getters: {},
//   actions: {
//     create(institution) {
// 			this.institutions.push({...institution, id: uuid()})
// 		},
//   },
// });

export const useInstitutionStore = defineStore("institution", {
  state() {
    return {
      name: null,
      code: null,
      abbreviation: null
    };
  },
  getters: {},
  actions: {
    async CreateInst(institution) {
      console.log("Store - Register Institution", institution);
    },
  },
});