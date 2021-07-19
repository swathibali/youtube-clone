import firebase from 'firebase/app'
import 'firebase/auth'

  const firebaseConfig = {
    apiKey: "AIzaSyDrlJgrnHBjE8YFdbtb_rh6siT4poNBjlw",
  authDomain: "not-yt3ms.firebaseapp.com",
  projectId: "not-yt3ms",
  storageBucket: "not-yt3ms.appspot.com",
  messagingSenderId: "819922170730",
  appId: "1:819922170730:web:ee2bc8caf4a0deb29aab13"
  };

 
firebase.initializeApp(firebaseConfig)

export default firebase.auth()
