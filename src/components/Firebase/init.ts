import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'

import {
  Firestore,
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.API_KEY,
  authDomain: import.meta.env.AUTH_DOMAIN,
  projectId: import.meta.env.PROJECT_ID,
  storageBucket: import.meta.env.STORAGE_BUCKET,
  messagingSenderId: import.meta.env.MESSAGING_SENDER_ID,
  appId: import.meta.env.APP_ID
}

let app: FirebaseApp
let db: Firestore

const clientSide = typeof window !== 'undefined'

// Runs on the client side
if (clientSide) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
  db = getFirestore(app)
}

export { db }