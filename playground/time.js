const moment = require('moment');
// Jan 1st 1970 00:00:00 am

// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'years').subtract(12, 'months');
// console.log(date.format('MMMM Do, YYYY'));


// hh:mm am
// console.log("Using (h:mm a) Patterns = ", date.format('h:mm a'));
// console.log("Using (LT) Patterns = ", date.format('LT'));

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

var createdAt = 1234;
var date = moment(createdAt);
console.log("Time of (createdAt = 1234) ====>", date.format('h:mm a'));
