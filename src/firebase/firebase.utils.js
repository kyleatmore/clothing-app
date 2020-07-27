import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDU2ye1fK9DFBrkF5qm5sFCPPXbKj1jghY",
  authDomain: "clothing-db-d4b63.firebaseapp.com",
  databaseURL: "https://clothing-db-d4b63.firebaseio.com",
  projectId: "clothing-db-d4b63",
  storageBucket: "clothing-db-d4b63.appspot.com",
  messagingSenderId: "910267685848",
  appId: "1:910267685848:web:7c97e37c1fa73fbed7b0ad",
  measurementId: "G-KXDQYJBDCK",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWIthGoogle = () => auth.signInWithPopup(provider);

export default firebase;
