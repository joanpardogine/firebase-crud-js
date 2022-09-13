# Vanilla Javascript & Firebase Firestore CRUD

This project is web application using HTML, CSS, Javascript and Firebase Firestore as a Realtime databaes, using modules and modern Javascript in the browser



console.firebase.google.com

Project: ```<cognom>```-firebase-js-crud

Web app: web-app-```<cognom>```-firebase-js-crud



Firestore Database

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}


https://console.cloud.google.com/apis/api/firestore.googleapis.com/overview?project=pardo-firebase-js-crud-47bba



