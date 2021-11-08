const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const Url = require("./modal/schema")

const app = express()

app.use(cors())

app.use(express.json())

mongoose.connect("mongodb+srv://Guru:Guru777@cluster0.ke7v2.mongodb.net/url-shortener?retryWrites=true&w=majority",() => {
    console.log("connected to db")
})

app.post("/",async (req,res) => {
    try{
const url = new Url({
    URL:req.body.url,
    shortUrl:generateUrl()
})
    await url.save(function(err,data){
        if(err) throw err
        console.log(data)
    })
    const data = await Url.find({})
   res.send(data)
    
    }catch(err){
        console.log(err)
    }
   
})

app.get("/", async (req,res) => {
try{
    const data = await Url.find({})
    
    res.send(data)
}catch(err){
    console.log(err)
}
})

app.get("/:urlId",(req,res) => {
    console.log(req.params.urlId)
    Url.findOne({shortUrl: req.params.urlId},function(err,data){
        if(err) throw err
        res.redirect(data.URL)
    })
})

app.listen(process.env.PORT || 3000,() => {
    console.log("server is running")
})


function generateUrl(){
    var result = ""
    var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890"
    var charactersLength = characters.length

    for(var i = 0; i <5; i++){
        result += characters.charAt(Math.floor(Math.random()* charactersLength))
    }
    console.log(result)
    return result
}
