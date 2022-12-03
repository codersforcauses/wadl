import { FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'

import {
  Firestore,
  getFirestore
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
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