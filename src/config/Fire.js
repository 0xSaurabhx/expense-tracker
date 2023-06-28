import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBhSA4eQ9hLuF0PqBklJ8N2OpdObEp0uzc",
  authDomain: "expense-edge.firebaseapp.com",
  databaseURL: "https://expense-edge-default-rtdb.firebaseio.com",
  projectId: "expense-edge",
  storageBucket: "expense-edge.appspot.com",
  messagingSenderId: "683706714826",
  appId: "1:683706714826:web:b9506633833bf1845bc233",
  measurementId: "G-QJYTH92M0G"
};

const fire = firebase.initializeApp(config);
export default fire;
