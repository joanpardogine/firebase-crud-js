// Importeu les funcions que necessiteu dels SDK que necessiteu
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.6.2/firebase-app.js";

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

// TODO: Afegiu SDK per als productes de Firebase que vulgueu utilitzar
// https://firebase.google.com/docs/web/setup#available-libraries

// Importeu la configuració de la connexió a la nostra base de dades.
import {
  firebaseConfig,
} from "./firebase.js";

// Inicialitzar Firebase
export const app = initializeApp(firebaseConfig);

const db = getFirestore();
const metgeForm = document.getElementById("metge-form");
const metgeContainer = document.getElementById("llistat-metges");

let editStatus = false;
let id = "";

window.addEventListener("DOMContentLoaded", async (e) => {
  // const querySnapshot = await getMetges();
  // querySnapshot.forEach((doc) => {
  //   console.log(doc.data());
  // });

  onGetMetge((querySnapshot) => {
    metgeContainer.innerHTML = "";

    querySnapshot.forEach((doc) => {
      const metge = doc.data();

      metgeContainer.innerHTML += `
  <div class="card card-body mt-2 border-primary">
    <p>${metge.nomMetge}</p>
    <p>${metge.cognomMetge}</p>
    <p>${metge.especialitatMetge}</p>
    <div>
      <button class="btn btn-primary btn-esborra" data-id="${doc.id}">🗑 Esborra</button>
      <button class="btn btn-secondary btn-edit" data-id="${doc.id}">🖉 Modifica</button>
    </div>
  </div>`;
    });

    const btnsDelete = metgeContainer.querySelectorAll(".btn-esborra");
    btnsDelete.forEach((btn) =>
      btn.addEventListener("click", async ({ target: { dataset } }) => {
        try {
          await esborraMetge(dataset.id);
        } catch (error) {
          console.log(error);
        }
      })
    );

    const btnsEdit = metgeContainer.querySelectorAll(".btn-edit");
    btnsEdit.forEach((btn) => {
      btn.addEventListener("click", async (e) => {
        try {
          const doc = await getMetge(e.target.dataset.id);
          const metge = doc.data();
          metgeForm["metge-nom"].value = metge.nomMetge;
          metgeForm["metge-cognom"].value = metge.cognomMetge;
          metgeForm["metge-especialitat"].value = metge.especialitatMetge;

          editStatus = true;
          id = doc.id;
          metgeForm["btn-metge-form"].innerText = "Actualitza";
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
});

metgeForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nomMetge = metgeForm["metge-nom"];
  const cognomMetge = metgeForm["metge-cognom"];
  const especialitatMetge = metgeForm["metge-especialitat"];

  try {
    if (!editStatus) {
      await guardaMetge(nomMetge.value, cognomMetge.value, especialitatMetge.value);
    } else {
      await updateMetge(id, {
        nomMetge: nomMetge.value,
        cognomMetge: cognomMetge.value,
        especialitatMetge: especialitatMetge.value,
      });

      editStatus = false;
      id = "";
      metgeForm["btn-metge-form"].innerText = "Guarda";
    }

    metgeForm.reset();
    nomMetge.focus();
  } catch (error) {
    console.log(error);
  }
});

/**
 * Guarda un nou metge al Firestore
 * @param {string} nomMetge: el nom del metge
 * @param {string} cognomMetge: el cognom del metge
 * @param {string} especialitatMetge: l'especialitat del metge
 */
 export const guardaMetge = (nomMetge, cognomMetge, especialitatMetge) =>
 addDoc(collection(db, "metges"), { nomMetge, cognomMetge, especialitatMetge});
export const onGetMetge = (callback) =>
 onSnapshot(collection(db, "metges"), callback);
export const esborraMetge = (id) =>
 deleteDoc(doc(db, "metges", id));
export const getMetge = (id) =>
 getDoc(doc(db, "metges", id));
export const updateMetge = (id, nousValors) =>
 updateDoc(doc(db, "metges", id), nousValors);
export const getMetges = () =>
 getDocs(collection(db, "metges"));
