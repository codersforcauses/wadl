import { defineNuxtConfig } from "nuxt/config";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ["@heroicons/vue"],
  },
  modules: [
    "@pinia/nuxt",
    "@kevinmarrec/nuxt-pwa",
    "@pinia-plugin-persistedstate/nuxt",
  ],
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
          href: "https://fonts.googleapis.com/css2?family=Jost&family=Lato&family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap&family=Carter+One&display=swap",
        },
      ],
    },
  },
  runtimeConfig: {
    // read more: https://nuxt.com/docs/guide/going-further/runtime-config
    // note: nuxt automatically converts .env vals to camelcase.

    // public Keys, exposed to client.
    public: {
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || "",
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || "",
      firebaseStorageBucket:
        process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
      firebaseMessagingSenderId:
        process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || "",
      firebaseMode: process.env.NUXT_PUBLIC_FIREBASE_MODE || "",
    },
  },
  pwa: {
    icon: {
      source: "assets/logos/ShortLogo.png",
      fileName: "ShortLogo.png",
      purpose: "any",
    },
    meta: {
      name: "WADL",
      theme_color: "#FFD700",
      lang: "en-AU",
      ogHost: "https://wadl.vercel.app/",
      twitterCard: "summary",
      twitterCreator: "@codersforcauses",
    },
  },
});
