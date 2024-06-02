const http = require("http");
const fs = require("fs");
const url = require("url");

const getUsers = require("./modules/users");

const hostname = "127.0.0.1";
const port = 3003;

const server = http.createServer((request, response) => {
  const reqUrl = url.parse(request.url, true);

  if (reqUrl.query.hello != undefined) {
    if (reqUrl.query.hello === "") {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Enter a name");
    } else {
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(`Hello, ${reqUrl.query.hello}.`);
    }
  } else if (request.url === "/?users") {
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(getUsers());
    response.end();
  } else if (Object.keys(reqUrl.query).length > 0) {
    response.writeHead(500, { "Content-Type": "text/plain" });
    response.end();
  } else {
    response.writeHead(200, { "Content-Type": "text/plain" });
    console.log(reqUrl.query);
    response.end("Hello, world!");
  }
});

server.listen(port, hostname, () => {
  console.log(`Сервер запущен по адресу http://${hostname}:${port}`);
});
