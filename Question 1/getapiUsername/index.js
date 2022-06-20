const express = require('express');
const app = express();
const mongoose = require('mongoose');
app.use(express.json());


//DB Connection
mongoose.connect("mongodb://localhost:27017/UserDb",{
    useNewUrlParser: true, 
    useUnifiedTopology:true
},(err)=>{
    if(!err) {
        console.log("connected to db")
    }else{
        console.log(err)
    }
})

//Schema

const sch={
    agent: String,
    userType: String,
    policy_mode: Number,
    producer: String,
    policy_number: String,
    premium_amount_written: String,
    premium_amount: Number,
    policy_type: String,
    company_name: String,
    category_name: String,
    policy_start_date: String,
    policy_end_date: String,
    csr: String,
    account_name: String,
    email: String,
    gender: String,
    firstname: String,
    city: String,
    phone: Number,
    address: String,
    state: String,
    zip: Number,
    dob: String,
}

const monmodel=mongoose.model("UserCollections",sch);

//Fetch Get

app.get('/fetch/:firstname', function(req, res) {
    fetchfirstname=req.params.firstname;
    monmodel.find(({id:fetchfirstname}),function(err, val) {

        if(err) 
        {
            res.send("ERORRRRR")
        }else{

        if(val.length==0)//[]
        {
            res.send("data does not exist");
        }else{
            res.send(val);
        }
    }
    })
})

app.listen(8000,()=>{
    console.log("on port 8000")
})