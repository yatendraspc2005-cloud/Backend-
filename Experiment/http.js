const http =require("http");

/*
  Create an HTTP server.
  This callback function runs EVERY time a client sends a request.
*/const server = http.createServer((req, res) => {  // Extract useful information from the request
  const method = req.method;
  const url = req.url;

  // Handle GET request to home route
  if (method === "GET" && url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to the Home Page");
  }

  // Handle GET request to /users route
  else if (method === "GET" && url === "/users") {
    const users = { users: ["Alice", "Bob", "Charlie"] };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  }
  // Handle POST request to /users route
  else if (method === "POST" && url === "/users") {
    let body = "";
    // Collect incoming data chunks
    req.on("data", (chunk) => {
      body += chunk;
    });
    // When all data has arrived
    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      res.writeHead(201, { "Content-Type": "application/json" });
      res.end(JSON.stringify({
        message: "User created successfully",
        data: parsedBody,
      }));
    });
  }
  // Handle unknown routes
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
  }
});

/*
  Start the server and make it listen on port 3000.
  This tells the OS to forward traffic on port 3000 to this process.
*/
server.listen(3000,() => {console.log("Server is running on http://localhost:3000");
});