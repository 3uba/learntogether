import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from './firebase.config'
import { getFirestore } from 'firebase/firestore'

const app = initializeApp(config)

export const auth = getAuth()
export const db = getFirestore()
