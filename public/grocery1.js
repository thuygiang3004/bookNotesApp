import "https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.10/js/framework7.bundle.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";
import app from "./F7App.js";
import "./grocery.js";

const $$ = Dom7;

$$("#removeForm").submit((evt) => {
  console.log(evt);
  evt.preventDefault();
  const sId = app.form.convertToData("#removeForm");
  console.log(sId);
  const sUser = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref("groceries/" + sUser + "/" + sId)
    .remove();
});
