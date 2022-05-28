import admin from 'firebase-admin'

import serviceAccount from "../admin.json"

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://learntogether-l3rnt-default-rtdb.europe-west1.firebasedatabase.app",

});

export default admin;