import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyAgThrH29OiZhi_2QlA77MBiWt4hF6lUfQ",
    authDomain: "not-15eca.firebaseapp.com",
    projectId: "not-15eca",
    storageBucket: "not-15eca.appspot.com",
    messagingSenderId: "684026708813",
    appId: "1:684026708813:web:233152e54fdd2e77c6ad04",
    measurementId: "G-SL7C1M9TY2"
  };

 
firebase.initializeApp(firebaseConfig)

export default firebase.auth()
