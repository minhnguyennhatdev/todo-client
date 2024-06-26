importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');


firebase.initializeApp({
  'messagingSenderId': '21727868928'
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
console.log('[firebase-messaging-sw.js] Received background message ', payload);
// Customize notification here
 const notificationTitle = 'Background Message Title';
 const notificationOptions = {
 body: 'Background Message body.',
};

 return self.registration.showNotification(notificationTitle,
  notificationOptions);
});