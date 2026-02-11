const http= require("http");
const server =http.createServer((req ,res)=>{
    const url= req.url;
    const method = req.method;
    console.log(url,method);
});
server.listen(3000,() => {console.log("Server running on port 3000");
});