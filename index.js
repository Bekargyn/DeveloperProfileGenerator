const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

function makePDF(data) {
  let options = { format: "Letter" };
  let pdf = require("html-pdf");
  data.style = fs.readFileSync("style.css");
  let html = fs.readFileSync("index.html");
  html = html.toString().replace(/\${([^}]*)}/g, (r, k) => data[k]);
  pdf.create(html, options).toFile("./businesscard.pdf", function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
  fs.writeFile("profile.html", html, function(err) {
    //console.log(err);
  });
}

function promptUser() {
  inquirer
    .prompt([
      {
        // insteat of choice you can type any color
        type: "input",
        name: "color",
        message: "Enter your favorite color?"
      },
      {
        type: "input",
        name: "username",
        message: "What is your GitHub username?"
      }
    ])

    .then(function(data) {
      data.color == "white"
        ? (data.textcolor = "black")
        : (data.textcolor = "white");

      // Make a request for a user with a given ID
      const request1 = axios.get(
        `https://api.github.com/users/${data.username}`
      );
      const request2 = axios.get(
        `https://api.github.com/users/${data.username}/starred`
      );
      // .get(`https://api.github.com/users/${data.username}/starred`)

      axios.all([request1, request2]).then(function(response) {
        data.name = response[0].data.name;
        data.public_repos = response[0].data.public_repos;
        data.bio = response[0].data.bio
          ? response[0].data.bio
          : "I don't have bios";
        data.followers = response[0].data.followers;
        data.following = response[0].data.following;
        data.avatar_url = response[0].data.avatar_url;
        data.location = response[0].data.location
          ? response[0].data.location
          : "N/A";
        data.starred = response[1].data.length;
        makePDF(data);
      });
    });
}

promptUser();
