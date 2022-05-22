import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import { getDatabase } from "firebase/database";

import { getAuth } from 'firebase/auth';
import { config } from './firebase.config'
import { getStorage, ref } from 'firebase/storage'

const app = firebase.initializeApp(config)

export const imageStorage = getStorage(app)
export const postImages = ref(imageStorage, '/images/')

export const auth = getAuth()

export const db = firebase.firestore()
export const database = getDatabase(app)