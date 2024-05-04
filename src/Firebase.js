import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


const firebaseConfig = {
    apiKey: "AIzaSyCklK0FozKmt0zQ_rLBhATkrYhAO5eCyRM",
    authDomain: "pucpr-react.firebaseapp.com",
    projectId: "pucpr-react",
    storageBucket: "pucpr-react.appspot.com",
    messagingSenderId: "590516734937",
    appId: "1:590516734937:web:e86fba6066b70b972fe7c8"
  };

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;