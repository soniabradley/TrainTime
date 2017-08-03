// alert("connect");

var config = {
    apiKey: "AIzaSyAdPBqSOO-h25-Bq5VtluibPgKuumAD8aA",
    authDomain: "testing-8c9f4.firebaseapp.com",
    databaseURL: "https://testing-8c9f4.firebaseio.com",
    projectId: "testing-8c9f4",
    storageBucket: "testing-8c9f4.appspot.com",
    messagingSenderId: "928430822425"
  };
  var trains = [];
  var btnSubmit = document.getElementById('submit');

  firebase.initializeApp(config);
  var db = firebase.database();
  var trainRefreshenr;

  var dbObject;
  loaddatabase();

// database
  function loadDatabase () {
    db.ref('trains').once('value').then(snapshot => {
      dbObject = snapshot.val();
      for (key in dbObject){
        trains.push(dbObject[key]);
      }

// create interval
  populateTable();
  trainRefresher = setInterval(populateTable, 6000);
});
  }
// push (add) trains
function addTrain (train) {
  db.ref('trains').push(train);
  trains.push(train);
}

function popuplateTable () {
  var divTable = document.getElementById('train-times');

  var html = `<table class='table table-striped'>
               <thead>
                 <tr>
                   <th>Train Name</th>
                   <th>Destination</th>
                   <th>Frequency (min)</th>
                   <th>Next Arrival</th>
                   <th>Minutes Away</th>
                 </tr>
               </thead>
               <tbody>`;
// populate table body
trains.forEach(train =>{
  if (!train){
  }
  // new train database
btnSubmit.addEventListener('click', (event) => {
  event.preventDefault();

  // on click
  var newTrain = {
    name: document.getElementById('train-name').value,
    destination: document.getElementById('destination').value,
    frequency: document.getElementById('frequency').value,
    first_train_time: document.getElementById('first-train').value
  };

  // add train and update
  addTrain(newTrain);
  populateTable();
});
