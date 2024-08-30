import { initializeApp } from "firebase/app"
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const auth = getAuth(firebaseApp)
    const googleProvider = new GoogleAuthProvider()
    const res = await signInWithPopup(auth, googleProvider)

    return res
  } catch (err) {
    console.error(err)
    throw err
  }
}
