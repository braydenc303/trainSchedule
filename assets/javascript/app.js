  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBQxgs660RlFf2V1TevTlyjMmBcFydswvc",
    authDomain: "bootcampproject1-78f3d.firebaseapp.com",
    databaseURL: "https://bootcampproject1-78f3d.firebaseio.com",
    projectId: "bootcampproject1-78f3d",
    storageBucket: "bootcampproject1-78f3d.appspot.com",
    messagingSenderId: "757544267095"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

$(".btn").on("click", function(event){
    //Prevent the submit button from reloading the page.
    event.preventDefault();
    //Get the values from the submission form.
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var firstTrain = $("#firstTrain").val().trim();
    var frequency = $("#frequency").val().trim();

    //Push the values to the database.
    database.ref().push({
        trainName: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency
    });


});
//On pageload, and whenever a train is added to the database, display the information for all trains.
database.ref().on("child_added", function(snapshot){
    //Get basic train info from the database.
    trainName = (snapshot.val().trainName);
    destination = (snapshot.val().destination);
    firstTrain = moment((snapshot.val().firstTrain), "hh:mm a").subtract(1, "days");
    frequency = (snapshot.val().frequency);
    //Get the current time.
    var currentTime = moment();
    console.log(moment(currentTime).format("hh:mm a"));
    //Determine how many minutes away the next train is.
    var diffTime = moment().diff(moment(firstTrain), "minutes");
    var tRemainder = diffTime % frequency;
    var minutesAway = frequency - tRemainder;
     //Determine the time of the next train arrival.
    var nextTrain = moment().add(minutesAway, "minutes");
    var nextArrival = moment(nextTrain).format("hh:mm a");

    //Add all pertinent information to the train schedule.
    var newRow = $("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>"+ minutesAway + "</td></tr>");
    $("tbody").append(newRow);

    //Handle any errors
}, function (errorObject){
    console.log("Errors handled: " + errorObject.code);
});