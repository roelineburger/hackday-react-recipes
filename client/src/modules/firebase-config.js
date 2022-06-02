import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBFpskJV_a061FwmxZnOq5N7A3flVZF-8o',
  authDomain: 'bodylab-e1c1d.firebaseapp.com',
  projectId: 'bodylab-e1c1d',
  storageBucket: 'bodylab-e1c1d.appspot.com',
  messagingSenderId: '904505639046',
  appId: '1:904505639046:web:c76b6bcd0085121acb1107',
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
