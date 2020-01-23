# DeveloperProfileGenerator-HW9

Creating a command-line application that dynamically generates a PDF profile from a GitHub username. The user is prompted to answer two questions:

1. Enter your favorite color
2. What is your GitHub username?

A PDF is generated that displays the user's GitHub profile picture, name, location (if available), bio (if available), number of public repositories, number of followers, number of other GitHub users they're following, and number of GitHub stars

## The deployed project should look like this

![deployed1](deployed1.png)
![alt text](http://url/to/img.png)

## Links to project repository

https://bekargyn.github.io/DeveloperProfileGenerator-HW8/
https://github.com/Bekargyn/DeveloperProfileGenerator-HW8

## Steps:

1. Created index.html, style.css, and index.js.

2. Downloaded all dependecies using npm.

3. Created user prompts with inquirer.

4. Took the input from the user prompts and used them in axios calls to GitHub.

5. Consolidated GitHub data.

6. Created the template I wanted to use for my HTML document (which would eventually be displayed via PDF).

7. Created the function that would send data to the HTML document, then to PDF format.

## Build with

- VSCode - The platform I used for developing this project.
- MDN - Used as a reference tool.
- GoogleChrome - Used for inspector tool and validating the program during development.
- NodePackageManager - Used to install node modules/dependencies
- Axios - Used as a promise based HTTP client for the browser and node.js.
- Util - This implements the Node.js util module for environments that do not have it, like browsers.
- Inquirer - A collection of common interactive command line user interfaces.
- html-pdf - HTML to PDF converter that uses phantomjs.
