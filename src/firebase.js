import firebase from 'firebase/app'
import 'firebase/auth'

  const firebaseConfig = {
    apiKey: "AIzaSyD3OCBe3EhCATZBB5cEtnCAkty2G1rC4vc",
    authDomain: "not-yt-6d8dd.firebaseapp.com",
    projectId: "not-yt-6d8dd",
    storageBucket: "not-yt-6d8dd.appspot.com",
    messagingSenderId: "314137395018",
    appId: "1:314137395018:web:7269fc307b57c517cf4bb3"
  };

 
firebase.initializeApp(firebaseConfig)

export default firebase.auth()
