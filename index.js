
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
const data = require("./firebase-sample-data.json"); //Data needs to be a proper json, an array of objects if more than one record
const collectionKey = "recipes"; //Change to your collection

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://react-native-starter-kit-8627f.firebaseio.com"
});

const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
if (data && (typeof data === "object")) {
    Object.keys(data).forEach(docKey => {
        firestore.collection(collectionKey).doc(docKey).set(data[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}