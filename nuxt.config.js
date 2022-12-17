import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["@heroicons/vue"],
  },
  modules: ["@pinia/nuxt"],
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Jost&family=Lato&family=Montserrat&display=swap&family=Carter+One&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    // read more: https://nuxt.com/docs/guide/going-further/runtime-config
    // note: nuxt automatically converts .env vals to camelcase.

    // public Keys, exposed to client.
    public: {
      firebaseApiKey: "", // NUXT_PUBLIC_FIREBASE_API_KEY
      firebaseAuthDomain: "",
      firebaseProjectId: "",
      firebaseStorageBucket: "",
      firebaseMessagingSenderId: "",
      firebaseAppId: "",
      firebaseMode: "",
    },
  },
});
