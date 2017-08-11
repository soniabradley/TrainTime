alert("connect");

var config = {
    apiKey: "AIzaSyAdPBqSOO-h25-Bq5VtluibPgKuumAD8aA",
    authDomain: "testing-8c9f4.firebaseapp.com",
    databaseURL: "https://testing-8c9f4.firebaseio.com",
    projectId: "testing-8c9f4",
    storageBucket: "testing-8c9f4.appspot.com",
    messagingSenderId: "928430822425"
  };

  firebase.initializeApp(config);

  // serve as a reference to firebase database
  var trainData = firebase.database();

// when Btn clicked information will be stored
 $("#addTrainBtn").on("click",function(){
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  // add moments js
  var firstTrain = moment($("#firstTrainInput").val().trim(),"HH:mm").subtract(10,"years").format("X");
  var frequency = $("#frequencyInput").val().trim();
//
//
// console.log(firstTrain);
// return false;

  var newTrain = {
    name: trainName,
    destination: destination,
     firstTrain: firstTrain,
     frequency: frequency
  }

trainData.ref().push(newTrain);

alert("Train Added");

$("#trainNameInput").val("");
$("#destinationInput").val("");
$("#firstTrainInput").val("");
$("#frequencyInput").val("");

return false;
})
// collect data from firebase
trainData.ref().on("child_added", function(snapshot){
  var name = snapshot.val().name;
  var destination = snapshot.val().destination;
  var frequency = snapshot.val().frequency;
  var firstTrain = snapshot.val().firstTrain;

  var remainder = moment().diff(moment.unix(firstTrain),"minutes")%frequency;
  var minutes = frequency - remainder;
  var arrival = moment().add(minutes,"m").format("hh:mm A");

  console.log(remainder);
  console.log(minutes);
  console.log(arrival);

$("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+minutes+"</td></tr>");

})
