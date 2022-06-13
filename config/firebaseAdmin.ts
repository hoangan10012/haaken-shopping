const admin = require('firebase-admin');
const serviceAccount = require('../haaken-shop-firebase-adminsdk-e9qri-8bbf1918fa.json');

export const vertifyIdToken = (token : any)=>{
    if(!admin.apps.length){
        admin.initializeApp({
            credential:admin.credential.cert(serviceAccount)
        })
    }
    return admin.auth().vertifyIdToken(token).catch();
}
