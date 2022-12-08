import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["@heroicons/vue"],
  },
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
          href: "https://fonts.googleapis.com/css?family=Lato&family=Jost",
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
    },
  },
});
