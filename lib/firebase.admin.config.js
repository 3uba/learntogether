'use strict'

const admin = require('firebase-admin')
// const { getAuth } = require('firebase-admin/auth')
const serviceAccount = require("../admin.json")
// const fs = require('fs')

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://learntogether-l3rnt-default-rtdb.europe-west1.firebasedatabase.app"
    });
}

// const firestore = admin.firestore()
// const auth = admin.auth()

// const getUserById = (uid) => {
//     getAuth()
//         .getUser(uid)
//         .then((user) => console.log(user.toJSON()));
//     return { props: { msg: "test" } }
// };

// module.exports = {firestore, auth}