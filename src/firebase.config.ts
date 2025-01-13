import { initializeApp } from "firebase/app";
import {
  collection,
  DocumentData,
  getFirestore,
  addDoc,
  getDocs,
  Timestamp,
  query,
  where,
} from "firebase/firestore";
import { fimOntem, inicioOntem } from "./utils/dateHelper";

const firebaseConfig = {
  apiKey: "AIzaSyA3_FrQzIvaOC6XshBmaFHZIp0PD2A2HME",
  authDomain: "main-database-cloud.firebaseapp.com",
  projectId: "main-database-cloud",
  storageBucket: "main-database-cloud.firebasestorage.app",
  messagingSenderId: "1005790530883",
  appId: "1:1005790530883:web:8511f9d562b1b0169ff3f6",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

// export async function getMessageById(
//   docRef: DocumentReference<unknown, DocumentData>
// ) {
//   console.log("Documento por id:");
//   const doc = (await getDoc(docRef)).data();
//   console.log(doc);
// }

export type MessageStorage = {
  id: String;
  author: String;
  authorName: String;
  profilePicThumbObj: String;
  body: String;
  raw: Object;
  timestamp: Timestamp;
};

export class Storage {
  static colRefMessage = collection(db, "messages");

  static async messageSave(message: MessageStorage) {
    const docRef = await addDoc(this.colRefMessage, message)
      .then((res) => {
        console.log(`Saved as: ${res.id}`);
      })
      .catch((error) => {
        console.log(error.message);
      });
    return docRef;
  }

  static async messageGetAll() {
    let data: DocumentData[] = [];
    const docSnap = await getDocs(query(this.colRefMessage));
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }

  static async messageGetAllPretty() {
    let data: DocumentData[] = [];
    const docSnap = await getDocs(query(this.colRefMessage));
    docSnap.forEach((doc) => {
      data.push(doc.data());
    });
    return data;
  }

  static async messageGetLast() {
    const querySnapshot = await getDocs(
      query(
        this.colRefMessage,
        where("campoData", ">=", inicioOntem),
        where("campoData", "<=", fimOntem)
      )
    );
    return querySnapshot.docs;
  }
}
