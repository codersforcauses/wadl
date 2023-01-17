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
  addDoc,
} from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
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
          number: doc.data().phone_number,
        };
        this.institutions.push(institution);
      });
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
      if (snapshot.data().count === 0) {
        await updateDoc(ref, institution)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("institution with same name exists");
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
        await addDoc(collection($db, "institutions"), institution)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      } else {
        console.log("institution with same name exists");
      }
    },
  },
});
