const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

// app.use(express.static(path.join(__dirname,"public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use (express.urlencoded({extended:true}));



const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}



app.get("/",(req,res)=>{
    res.send("Hello World");
});
// index route

app.get("/listings",async(req,res)=>{
  const allListings= await Listing.find({});
  console.log(allListings);
    res.render("listings/index",{ allListings });
   
  
});

// show route
app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
const listing=await Listing.findById(id);
  res.render("listings/show.ejs",{listing});
});


// app.get("/testListing",async(req,res)=>{
//     let sampleListing=new Listing({
//         title:"sample title",
//         description:"sample description",
//         image:"sample image",
//         price:1200,
//         location:"sample location",
       
//         country: "sample country",
       
//     });
//    await sampleListing.save();
//    console.log("sample was saved");
//         res.send("Listing saved");
// });
   




app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});
