import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { onBackgroundMessage } from "firebase/messaging/sw";

const firebaseConfig = {
  apiKey: "AIzaSyAJHshdiU5rI9WuFDOabLm-CDnw1vuguzk",
  authDomain: "switchdev-90acf.firebaseapp.com",
  projectId: "switchdev-90acf",
  storageBucket: "switchdev-90acf.appspot.com",
  messagingSenderId: "21727868928",
  appId: "1:21727868928:web:efb231544ff96fd9a180e5",
  measurementId: "G-M7VQKB06GJ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const db = getFirestore();

const firebaseCloudMessaging = {
  tokenInStorage: async () => {
    const token = await localStorage.getItem("fcm_token");
    console.log("fcm_token tokenInlocalforage", token);
    return token;
  },
  onMessage: async () => {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      alert("Notification");
    });
  },

  onBackgroundMessage: async () => {
    const messaging = getMessaging();
    onBackgroundMessage(messaging, function (payload) {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
    });
  },

  init: async function () {
    try {
      if ((await this.tokenInStorage()) !== null) {
        console.log("it already exists");
        return false;
      }
      console.log("it is creating it.");
      const messaging = getMessaging(app);
      await Notification.requestPermission();
      getToken(messaging, {
        vapidKey:
          "BBvOKeD6Kw6VoVwSaLmNU8KBGX-KUW9jsGNG3kGhbMpV1nNAhaDWa3HtIf5_G70QD_LQL5ahESmRgB_v_cffALk",
      })
        .then((currentToken) => {
          console.log("current Token", currentToken);
          if (currentToken) {
            localStorage.setItem("fcm_token", currentToken);
            console.log("fcm_token", currentToken);
          } else {
            // Show permission request UI
            console.log(
              "NOTIFICACION, No registration token available. Request permission to generate one."
            );
            // ...
          }
        })
        .catch((err) => {
          console.log(
            "NOTIFICACIONAn error occurred while retrieving token . "
          );
          console.log(err);
        });
    } catch (error) {
      console.error(error);
    }
  },
};

export default function Index() {
  const [mounted, setMounted] = useState(false);
  if (mounted) {
    firebaseCloudMessaging.onMessage();
  }
  useEffect(() => {
    firebaseCloudMessaging.init();
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInStorage();
      if (token) {
        setMounted(true);
        // not working
      }
    };
    setToken();
  }, []);
}


// export async function getServerSideProps({ locale }: { locale: string }) {
//   return {
//     redirect: {
//       destination: '/todo',
//       permanent: false
//     }
//   }
// }