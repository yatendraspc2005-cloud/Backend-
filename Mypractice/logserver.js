const fs=require("fs");
const http =require("http");
const server = http.createServer((req,res)=>{ 
    const method =req.method;
    const url =new URL(req.url,`http://${req.headers.host}`);
    const date = new Date().toISOString();
    const log =`${date}\t${method}\t${url}\n`;
    
    fs.appendFile("log.txt",log,(err)=>
        { 
            if(err)
            {
                console.log(err.message);}
            else {res.end("done");
            }

        });
}); server.listen(3000,()=>{
    console.log("ho gya");
});
    