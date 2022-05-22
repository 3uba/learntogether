import * as admin from 'firebase-admin'

import serviceAccount from "../admin.json"

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://learntogether-l3rnt-default-rtdb.europe-west1.firebasedatabase.app"
    });
}

const firestore = admin.firestore()
const auth = admin.auth()

export {firestore, auth}