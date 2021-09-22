//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

let users = [];
let userError = false;
let errorMessage = "Default error message";

router.get('/', (req, res, next) => {
  res.render('pages/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    userArray: users,
    showError: userError,
    errorMessage: errorMessage
  });
  userError = false;
});

router.post('/addUser', (req, res, next) => {
  let userIndex = users.indexOf(req.body.username);
  if (userIndex == -1 && req.body.username != '') {
    users.push(req.body.username);
  } else if (req.body.username == '') {
    userError = true;
    errorMessage = "Error: Username cannot be empty.";
  } else {
    userError = true;
    errorMessage = "Error: Username already exists.";
  }
  console.log(users);

  res.statusCode = 302;
  res.setHeader('Location', '/ta02');
  return res.end();
});


router.post('/removeUser', (req, res, next) => {
  console.log(req.body.username);
  let userIndex = users.indexOf(req.body.username);
  if (userIndex > -1) {
    users.splice(userIndex, 1);
  } else {
    userError = true;
    errorMessage = "Error: Username does not exist.";
  }
  console.log(users);

  res.statusCode = 302;
  res.setHeader('Location', '/ta02');
  return res.end();
});

module.exports = router;
