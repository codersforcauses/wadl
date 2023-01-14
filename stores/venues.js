import { defineStore } from "pinia";

export const useVenueStore = defineStore("venue", {
  state: () => {
    return {
      venues: [
        {
          id: 1,
          name: "South Street",
          roomNo: "042",
          capacity: 5,
          days: ["Tuesday W1", "Tuesday W2", "Wednesday W1"],
        },
        {
          id: 2,
          name: "Adjacent Avenue",
          roomNo: "142",
          capacity: 10,
          days: ["Any"],
        },
      ],

      filteredVenues: [
        {
          id: 1,
          name: "South Street",
          roomNo: "042",
          capacity: 5,
          days: ["Tuesday W1", "Tuesday W2", "Wednesday W1"],
        },
        {
          id: 2,
          name: "Adjacent Avenue",
          roomNo: "142",
          capacity: 10,
          days: ["Any"],
        },
      ],
    };
  },
  getters: {},
  actions: {
    async createVenue(venue) {
      this.venues.push({
        ...venue,
        id: this.venue.length + 1,
      });
      this.filteredVenues = [...this.venues];
    },
    async editVenue(venue) {
      this.venues.forEach((ven) => {
        if (ven.id === venue.id) {
          Object.assign(ven, venue);
        }
      });
      this.filteredVenues = [...this.venues];
    },
  },
});
