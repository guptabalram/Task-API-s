const dbConnect = require('./mongodb');
const express = require('express');
const app = express();
app.use(express.json());

app.get('/',async (res,resp)=>{
    let data = await dbConnect();
    data= await data.find().toArray();
    resp.send(data);
});



/*app.get("/search/:key",async (req,resp)=>{
    let data = await dbConnect();
    data = await purchase.find(
        {
            "$or":[
                {Message:{$regex:req.params.key}},
                {Day:{$regex:req.params.key}},
                {Time:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

})*/

/*app.post("/", async (req,resp)=>{
    let data = await dbConnect();
    let result = await data.insert(req.body)
    resp.send(result)

})*/


app.listen(8000)