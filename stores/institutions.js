import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  doc,
  updateDoc,
  getCountFromServer,
  getDocs,
  query,
  where,
  setDoc,
} from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      filteredInstitutions: [],
      errorMessage: "",
    };
  },
  getters: {},
  actions: {
    async getInstitutions() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const institution = {
          abbreviation: doc.data().abbreviation,
          code: doc.data().code,
          email: doc.data().email,
          id: doc.id,
          name: doc.data().name,
          phone_number: doc.data().phone_number,
        };
        this.institutions.push(institution);
      });
      this.filteredInstitutions = [...this.institutions];
    },
    async editInstitution(institution) {
      const { $db } = useNuxtApp();
      const ref = doc($db, "institutions", institution.id);
      const sameName = query(
        collection($db, "institutions"),
        where("name", "==", institution.name),
        where("id", "!=", institution.id)
      );
      const snapshot = await getCountFromServer(sameName);
      console.log(snapshot.data().count);
      if (snapshot.data().count === 0) {
        await updateDoc(ref, institution)
          .then(() => {
            this.errorMessage = "";
            this.refreshInstitutions();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "institution with same name exists";
      }
    },
    async createInstitution(institution) {
      const { $db } = useNuxtApp();
      const sameName = query(
        collection($db, "institutions"),
        where("name", "==", institution.name)
      );
      const snapshot = await getCountFromServer(sameName);
      if (snapshot.data().count === 0) {
        institution.id = doc(collection($db, "institutions")).id;
        await setDoc(doc($db, "institutions", institution.id), institution)
          .then(() => {
            this.errorMessage = "";
            this.refreshInstitutions();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "institution with same name exists";
      }
    },
    async refreshInstitutions() {
      this.institutions = [];
      this.filteredInstitutions = [];
      this.getInstitutions();
    },
    async editTeam(team) {
      this.teams.forEach((t) => {
        if (t.id === team.id) {
          Object.assign(t, team);
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
