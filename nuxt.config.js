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
      firebaseApiKey:
        typeof process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN !== "undefined"
          ? ""
          : "",
      firebaseAuthDomain:
        typeof process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN !== "undefined"
          ? process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN
          : "",
      firebaseProjectId:
        typeof process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID !== "undefined"
          ? process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID
          : "",
      firebaseStorageBucket:
        typeof process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET !== "undefined"
          ? process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET
          : "",
      firebaseMessagingSenderId:
        typeof process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID !==
        "undefined"
          ? process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
          : "",
      firebaseAppId:
        typeof process.env.NUXT_PUBLIC_FIREBASE_APP_ID !== "undefined"
          ? process.env.NUXT_PUBLIC_FIREBASE_APP_ID
          : "",
      firebaseMode:
        typeof process.env.NUXT_PUBLIC_FIREBASE_MODE !== "undefined"
          ? process.env.NUXT_PUBLIC_FIREBASE_MODE
          : "",
    },
  },
});
