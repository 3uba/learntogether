import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { config } from './firebase.config'

const app = initializeApp(config)

export const auth = getAuth()
