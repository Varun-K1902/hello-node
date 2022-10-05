const http = require("http");
const fs = require("fs");
const args = require("minimist")(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let regContent = "";

fs.readFile("home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});

fs.readFile("registration.html", (err, reg) => {
  if (err) {
    throw err;
  }
  regContent = reg;
});

fs.readFile("project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
});

http
  .createServer((request, response) => {
    let url = request.url;
    response.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/registration":
        response.write(regContent);
        response.end();
        break;
      case "/project":
        response.write(projectContent);
        response.end();
        break;
      default:
        response.write(homeContent);
        response.end();
        break;
    }
  })
  .listen(args["port"]);