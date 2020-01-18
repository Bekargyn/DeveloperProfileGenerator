const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

function makePDF(data) {
  let options = { format: "Letter" };
  let pdf = require("html-pdf");
  data.style = fs.readFileSync("style.css");
  let html = fs.readFileSync("index.html");

  pdf
    .create(
      html.toString().replace(/\${([^}]*)}/g, (r, k) => data[k]),
      options
    )
    .toFile("./businesscard.pdf", function(err, res) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
}

function promptUser() {
  inquirer
    .prompt([
      {
        // insteat of choice you can type any color
        type: "input",
        name: "color",
        message: "What is your favorite color?"
      },
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
      }
    ])

    .then(function(data) {
      // Make a request for a user with a given ID
      axios
        .get(`https://api.github.com/users/${data.username}`)
        // .get(`https://api.github.com/users/${data.username}/starred`)
        .then(function(response) {
          data.name = response.data.name;
          data.public_repos = response.data.public_repos;
          data.followers = response.data.followers;
          data.following = response.data.following;
          data.avatar_url = response.data.avatar_url;
          data.location = response.data.location;
          makePDF(data);
        });
    });
}

promptUser();

// need to use 'Promise'?

// ###############
function init() {
  const fileHTML = generateHTML();
  console.log(fileHTML);
  fs.writeFile("profile.html", fileHTML, function(err) {
    console.log(err);
  });
}
// init();
