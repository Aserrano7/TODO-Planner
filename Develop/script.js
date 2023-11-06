// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.


// this will create a section to display the time in the currentDay Section
var timeDisplayEl = $('#currentDay');
function displayTime() {
  var currentTime = dayjs().format('dddd, MMMM D, YYYY')
  timeDisplayEl.text(currentTime);
}
//calls the function display time and sets it so that it is displayed every second so it always updates
displayTime();
setInterval(displayTime, 1000);

// save button so when the user clicks it then it will grab 
$(".saveBtn").on("click", function () {
  // returns tha value of what the user typed
  var text = $(this).siblings(".description").val();
  //returns the hour time box they typed it in 
  var time = $(this).parent().attr("id");
  //saves those values in local storage
  localStorage.setItem(time, text);
});


// this function will get the present time and format it to be 0-24 hours. It then goes through each time block getting each specific time from that block and compares that value to the value of the current time 
function timerKeeper(){
  var presentTime = dayjs().format('H');

$(".time-block").each(function () {
  var timeBox = parseInt($(this).attr("id").split("hour-")[1]);

  //checks if time is equal to each other than add the class present and remove all other classes
 if (timeBox == presentTime) {
    $(this).removeClass("past");
    $(this).removeClass("future");
    $(this).addClass("present");

}
//checks if the time is less than present time and adds the past class to it
  else if (timeBox < presentTime) {
    $(this).removeClass("future");
    $(this).removeClass("present");
    $(this).addClass("past");
}
 
  //add the future class to it 
  else {
      $(this).removeClass("present");
      $(this).removeClass("past");
      $(this).addClass("future");

  }
});
}
// runs the fuction timekeeper
timerKeeper();
// loops through all time blocks and gets local storage items
// that way when it reloads everthing is still there
for (let index = 9; index < 18; index++) {
$('#hour-' + index +' .description').val(localStorage.getItem('hour-'+index));

}