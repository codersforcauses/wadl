import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  addDoc,
  getCountFromServer,
  query,
  where,
  setDoc,
  getDoc,
} from "firebase/firestore";

export const useInstitutionStore = defineStore("institution", {
  state: () => {
    return {
      institutions: [],
      editInstition: null,
      filteredInstitutions: [],
      userInstitution: null,
      errorMessage: "",
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
    async getInstitutions() {
      const { $db } = useNuxtApp();
      const ref = collection($db, "institutions");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        const data = {
          id: doc.data().id,
          name: doc.data().name,
          number: doc.data().phone_number,
          email: doc.data().email,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        this.institutions.push(data);
      });
      this.filteredInstitutions = [...this.institutions];
    },
    async getInstitutionByID(id) {
      console.log(id);
      const { $db } = useNuxtApp();
      const ref = doc($db, "institutions", id);
      await getDoc(ref).then((doc) => {
        this.userInstitution = {
          id: doc.data().id,
          name: doc.data().name,
          email: doc.data().email,
          number: doc.data().phone_number,
          code: doc.data().code,
          abbreviation: doc.data().abbreviation,
        };
        console.log("USER INST", this.userInstitution);
      });
    },
    async checkInstitution(institution) {
      console.log(institution);
      let newInstitution = true;
      this.institutions.forEach(async (element) => {
        if (
          element.name.toLowerCase() === institution.schoolName.toLowerCase()
        ) {
          this.editInstition = true;
          this.updateInstitution(element, institution);
          newInstitution = false;
        }
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
          .then(() => {
            this.errorMessage = "";
            const index = this.institutions.findIndex(function (item, i) {
              return item.id === institution.id;
            });
            this.institutions[index] = institution;
            const indexFiltered = this.filteredInstitutions.findIndex(function (
              item,
              i
            ) {
              return item.id === institution.id;
            });
            this.filteredInstitutions[indexFiltered] = institution;
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
            this.institutions.push(institution);
            this.filteredInstitutions.push(institution);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.errorMessage = "institution with same name exists";
      }
    },
    async editTeam(team) {
      this.teams.forEach((t) => {
        if (t.id === team.id) {
          Object.assign(t, team);
        }
      });
    },
    async updateInstitution(element, institution) {
      console.log(element, institution);
      const { $db } = useNuxtApp();
      if (
        element.number !== institution.schoolNumber ||
        element.email !== institution.schoolEmail ||
        element.code !== institution.schoolCode ||
        element.abbreviation !== institution.schoolAbbreviation
      ) {
        const ref = doc($db, "institutions", institution.id);
        await updateDoc(ref, {
          abbreviation: institution.schoolAbbreviation,
          code: institution.schoolCode,
          email: institution.schoolEmail,
          number: institution.schoolNumber,
        }).catch((error) => {
          console.log(error);
        });
      }
    },
    // deleting this one because the one above is working well for admin/inst
    // async createInstitution(institution) {
    //   console.log(institution);
    //   const { $db } = useNuxtApp();
    //   const ref = collection($db, "institutions");
    //   await addDoc(ref, {
    //     name: institution.schoolName,
    //     email: institution.schoolEmail,
    //     code: institution.schoolCode,
    //     phone_number: institution.schoolNumber,
    //     abbreviation: institution.schoolAbbreviation,
    //   }).catch((error) => {
    //     console.log(error);
    //   });
    // },
    async updateProfile(institution) {
      const { $db, $auth } = useNuxtApp();
      const ref = doc($db, "users", $auth.currentUser.uid);
      await updateDoc(ref, { institutions: institution.id });
    },
    async clearStore() {
      this.institutions = [];
    },
  },
});
