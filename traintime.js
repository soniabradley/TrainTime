alert("connect");

  var config = {
    apiKey: "AIzaSyD0RK1EUnChrOkDBzSHPBoqUhORg2Y7Xd4",
    authDomain: "the-little-train-that-could.firebaseapp.com",
    databaseURL: "https://the-little-train-that-could.firebaseio.com",
    projectId: "the-little-train-that-could",
    storageBucket: "the-little-train-that-could.appspot.com",
    messagingSenderId: "727149030680"
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
console.log(newTrain);

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
