const express = require("express");
const app = express();
app.get("/sum" ,(req,res)=>{
    const a = req.query.a;
    const b = req.quary.b;
    res.send(parseInt(a)+parseInt(b));
})
app.get("/product", (req,res)=>{
    const a = res.query.a;
    const b = req.quary.b;
    res.send(parseInt(a)*parseInt(b));
})
app.get("/devide", (req,res)=>{
    const a = res.query.a;
    const b = req.quary.b;
    res.send(parseInt(a)/parseInt(b));
})
app.get("/subtrace", (req,res)=>{
    const a = res.query.a;
    const b = req.quary.b;
    res.send(parseInt(a)-parseInt(b));
})