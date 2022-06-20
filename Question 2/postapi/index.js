const dbConnect = require('./mongodb');
const express = require('express');
const app = express();

app.use(express.json());


app.post("/", async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.insert(req.body)
    resp.send(result)

})

app.listen(8080)