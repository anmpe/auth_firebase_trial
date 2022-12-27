import { initializeApp } from "firebase/app";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {app, db}