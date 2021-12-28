require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = 5000;
const mongoose = require("mongoose");
const shakeModel = require("./models/shakeData");

mongoose
  .connect(process.env.MONGOURL)
  .then(() => console.log("mongo db connected"));

app.get('/', (req, res) => res.send('Welcome to MilkShake Point !!!!'));

//get shake details
app.get("/shakeDetails", async (req,res)=>{
  const details = await shakeModel.find();
  if(details === 0){
      return res.json({data:"No Data Found"});
  }
  return res.json({data:details});
});

//get shake details by id
app.get("/shakeDetails/:id", async (req,res)=>{
    const sId = req.params.id;
    const details = await shakeModel.findOne(
        {shakeId : sId}
    ); 
    if(details === 0){
        return res.json({data:"No Data Found"});
    }
    return res.json({data:details});
});

//add shake details
app.post("/addShake", (req,res)=>{
  const {addShake} = req.body;
  const addData = shakeModel.create(addShake);
  if(addData){
    return res.json({data:"Add Milkshake Details Successfully..."});
  }
  return res.json({data:"Data Not Added."});
});

//update shake name
app.put("/updateShakeName", async (req,res)=>{
    const sid = req.body.shakeId;
    const name = req.body.name;

    const updateData = await shakeModel.findOneAndUpdate(
        {shakeId: sid},
        {name : name},
        {new:true}
    ); 

    if(updateData){
    return res.json({data:"Shake Name Update Successfully.."});
    }
    return res.json({data:"Data Not Found!!"});
});

// //update shake price
app.put("/updatePrice", async (req,res)=>{
    const id = req.body.shakeId;
    const price = req.body.price;

    const updateData = await shakeModel.findOneAndUpdate(
        {shakeId: id},
        {price : price},
        {new:true}
    ); 

    if(updateData){
        return res.json({data:"Shake Price Update Successfully",updateData});
    }
    return res.json({data:"Data Not Found."});
});

//delete shake details with id
app.delete("/deleteShakeWithId/:id", async (req,res)=>{
    const sId = req.params.id;
    const deleteData = await shakeModel.findOneAndDelete(
        {shakeId : sId}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully...", deleteData});
    }
    return res.json({data:"No Data Found for delete."});
});

//delete shake details with name
app.delete("/deleteShakeWithName", async (req,res)=>{
    const shakeName = req.params.name;
    const deleteData = await shakeModel.findOneAndDelete(
        {shakename : shakeName}
    );
    if(deleteData){
        return res.json({data:"Detele Data Successfully",deleteData});
    }
    return res.json({data:"No Data Found for delete."});
});

app.listen(port, () => console.log(`App listening on port port!`));