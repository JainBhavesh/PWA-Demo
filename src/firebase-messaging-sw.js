importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.0/firebase-messaging.js');

firebase.initializeApp({
 apiKey: "AIzaSyBgrya8gj36oID-mCynocCQ_IXur2ytP3s",
 authDomain: "sapphire-ffd58.firebaseapp.com",
 databaseURL: "https://sapphire-ffd58.firebaseio.com",
 projectId: "sapphire-ffd58",
 storageBucket: "sapphire-ffd58.appspot.com",
 messagingSenderId: "878139400715",
 appId: "1:878139400715:web:15cf69f47f65b72f"
});

const messaging = firebase.messaging();
