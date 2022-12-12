import "https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.10/js/framework7.bundle.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";
import config from "./firebase.js";
import app from "./F7App.js";
import "./grocery.js";
// import * as firebase from "firebase";
// import "firebase/auth";
// import { getAuth, signInWithRedirect } from "firebase/auth";

firebase.initializeApp(config);
const $$ = Dom7;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    app.tab.show("#tab2", true);
    console.log(user);
  } else {
    app.tab.show("#tab1", true);
    console.log("logged out");
  }
});

$$("#loginForm").on("submit", (evt) => {
  console.log("Here");
  evt.preventDefault();
  var formData = app.form.convertToData("#loginForm");
  firebase
    .auth()
    .signInWithEmailAndPassword(formData.username, formData.password)
    .then(() => {
      // could save extra info in a profile here I think.
      app.loginScreen.close(".loginYes", true);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $$("#signInError").html(errorCode + " error " + errorMessage);
      console.log(errorCode + " error " + errorMessage);
      // ...
    });
});

$$("#signInGoogleBtn").on("click", (evt) => {
  console.log("Here");
  evt.preventDefault();
  var provider = new firebase.auth.GoogleAuthProvider();
  // const auth = getAuth();
  firebase.auth().signInWithRedirect(provider).then(getAuthResult());
  // getRedirectResult(auth).then((result) => {
  //   console.log(result);
  // });
});

const getAuthResult = () => {
  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      console.log("done");
    });
};

$$("#signUpForm").on("submit", (evt) => {
  console.log("Here");
  evt.preventDefault();
  var formData = app.form.convertToData("#signUpForm");
  //alert("clicked Sign Up: " + JSON.stringify(formData));
  firebase
    .auth()
    .createUserWithEmailAndPassword(formData.username, formData.password)
    .then(() => {
      // could save extra info in a profile here I think.
      app.loginScreen.close(".signupYes", true);
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $$("#signUpError").html(errorCode + " error " + errorMessage);
      console.log(errorCode + " error " + errorMessage);
      // ...
    });
});

$$("#logout").on("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch(() => {
      // An error happened.
    });
});
