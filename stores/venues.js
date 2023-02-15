import { defineStore } from "pinia";
import { useNuxtApp } from "#imports";
import { collection, getDocs, addDoc, setDoc, doc } from "firebase/firestore";

export const useVenueStore = defineStore("venue", {
  state: () => {
    return {
      venues: [],
      filteredVenues: [],
      tournamentVenues: [],
    };
  },
  getters: {},
  actions: {
    async createVenue(venue) {
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const newVenue = await addDoc(collection($clientFirestore, "venues"), {
        ...venue,
      });
      this.venues.push({ ...venue, id: newVenue.id });
    },
    async editVenue(venue) {
      const { $clientFirestore } = useNuxtApp();
      await setDoc(doc($clientFirestore, "venues", venue.id), {
        ...venue,
      });
      this.venues.forEach((v) => {
        if (v.id === venue.id) {
          Object.assign(v, venue);
        }
      });
    },
    async getVenues() {
      this.$reset();
      const { $clientFirestore } = useNuxtApp();
      if (!$clientFirestore) return;
      const ref = collection($clientFirestore, "venues");
      const querySnapshot = await getDocs(ref);
      querySnapshot.forEach((doc) => {
        this.venues.push({ id: doc.id, ...doc.data() });
      });
    },
    deleteVenue(id) {
      const index = this.venues.findIndex((t) => {
        return id === t.id;
      });
      this.venues.splice(index, 1);
    },
  },
});
