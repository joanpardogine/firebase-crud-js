// Importeu les funcions que necessiteu dels SDK que necessiteu
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";
// TODO: Afegiu SDK per als productes de Firebase que vulgueu utilitzar
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-firestore.js";

// La configuració de Firebase de la vostra aplicació web
const firebaseConfig = {
  // Put you credentials here

};

// Inicialitzar Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore();

/**
 * Gaurda una nova tascas al Firestore
 * @param {string} title: el titol de la tasca
 * @param {string} description: la descrinció de la tasca
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id: ID de la tasca
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));
