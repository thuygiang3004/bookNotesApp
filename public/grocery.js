import "https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.10/js/framework7.bundle.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-app.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.0/firebase-database.min.js";
import "https://cdnjs.cloudflare.com/ajax/libs/firebase/7.16.1/firebase-auth.min.js";
import app from "./F7App.js";

const $$ = Dom7;

$$("#tab2").on("tab:show", () => {
  console.log("tab");
  //put in firebase ref here
  const sUser = firebase.auth().currentUser.uid;
  firebase
    .database()
    .ref("groceries/" + sUser)
    .on("value", (snapshot) => {
      const oItems = snapshot.val();
      const aKeys = Object.keys(oItems);
      $$("#groceryList").html("");
      for (let n = 0; n < aKeys.length; n++) {
        let sCard = `
          <div class="card">
          <div class="card-content card-content-padding">
          <img src="${oItems[aKeys[n]].image}" alt="${oItems[aKeys[n]].title}"/>
          </div>

          <div class="card-content card-content-padding ${
            oItems[aKeys[n]].datePurchased ? "strike-through" : ""
          }">
          Title: ${oItems[aKeys[n]].title}</div>
          <div class="card-content card-content-padding">Author: ${
            oItems[aKeys[n]].author
          }</div>
          <div class="card-content card-content-padding">Genre: ${
            oItems[aKeys[n]].genre
          }</div>
          <div class="card-content card-content-padding">Published: ${
            oItems[aKeys[n]].published
          }</div>

          <form id="boughtForm" class="boughtForm">
            <input id="key" value=${aKeys[n]}/ hidden>
            <button type="submit" id="boughtBtn" class="button button-active">I bought this</button>
          </form>

          <form id="removeForm" class="removeForm">
            <input id="key" class="key" value=${aKeys[n]}/ hidden>
            <button type="submit">I don't need this</button>
          </form>

          </div>
          `;

        $$("#groceryList").append(sCard);
      }
      $$(".removeForm").on("submit", (e) => {
        // e.preventDefault();
        // const sId = $$("#key").val();
        let sId = e.currentTarget[0].defaultValue;
        console.log(sId);
        const sUser = firebase.auth().currentUser.uid;
        firebase
          .database()
          .ref("groceries/" + sUser + "/" + sId)
          .remove();

        firebase
          .database()
          .ref("groceries/" + sUser)
          .on("value", (snapshot) => {
            const oItems = snapshot.val();
            if (oItems == null) {
              $$("#groceryList").html("");
            }
          });
      });

      $$(".boughtForm").on("submit", (e) => {
        // e.preventDefault();
        // const sId = $$("#key").val();
        let sId = e.currentTarget[0].defaultValue;
        console.log(sId);
        const sUser = firebase.auth().currentUser.uid;
        const sDate = new Date().toISOString().replace(".", "_");
        firebase
          .database()
          .ref("groceries/" + sUser + "/" + sId)
          .update({
            datePurchased: sDate,
          });

        firebase
          .database()
          .ref("groceries/" + sUser)
          .on("value", (snapshot) => {
            const oItems = snapshot.val();
            if (oItems == null) {
              $$("#groceryList").html("");
            }
          });
      });
    });
});

// $$("#removeBtn").on("click", (e) => {
//   e.preventDefault();
//   const sUser = firebase.auth().currentUser.uid;
//   firebase
//     .database()
//     .ref("groceries/" + sUser + "/" + sId)
//     .remove();
// });

// $$("#removeForm").on("submit", (e) => {
//   e.preventDefault();
//   const sId = app.form.convertToData("#removeForm");
//   console.log(sId);
//   const sUser = firebase.auth().currentUser.uid;
//   firebase
//     .database()
//     .ref("groceries/" + sUser + "/" + sId)
//     .remove();
// });

// $$("#removeForm").submit((evt) => {
//   evt.preventDefault();
//   const sId = app.form.convertToData("#removeForm");
//   console.log(sId);
//   const sUser = firebase.auth().currentUser.uid;
//   firebase
//     .database()
//     .ref("groceries/" + sUser + "/" + sId)
//     .remove();
// });

$$(".my-sheet").on("submit", (e) => {
  //submitting a new note
  e.preventDefault();
  const oData = app.form.convertToData("#addItem");
  const sUser = firebase.auth().currentUser.uid;
  const sId = new Date().toISOString().replace(".", "_");
  firebase
    .database()
    .ref("groceries/" + sUser + "/" + sId)
    .set(oData);
  app.sheet.close(".my-sheet", true);
});
