const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");

app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use (express.urlencoded({extended:true}));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const ejsMate= require("ejs-mate");
app.engine("ejs",ejsMate);



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



// INDEX ROUTE

app.get("/listings",async(req,res)=>{
  const allListings= await Listing.find({});
  console.log(allListings);
    res.render("listings/index",{ allListings });
   
  
});
// new route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new");
})

// SHOW ROUTE


app.get("/listings/:id",async(req,res)=>{
  let {id}=req.params;
const listing=await Listing.findById(id);
  res.render("listings/show",{listing}); 
});



// create route
app.post("/listings",async(req,res)=>{
  // let {title,description,image,price,country,location}=req.body;
 const newListing=new Listing(req.body.listing);
 await newListing.save();
  console.log("new listing was saved");
  res.redirect("/listings");


});

// edit route
app.get("/listings/:id/edit",async (req,res)=>{
  let {id}=req.params;
const listing=await Listing.findById(id);
res.render("listings/edit",{listing})
})


// update route
app.put("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res. redirect(`/listings/${id}`);
     
});

app.delete("/listings/:id",async (req,res)=>{
  let {id}=req.params;
  let deletedLIsting=await Listing.findByIdAndDelete(id);
  console.log(deletedLIsting);
  res.redirect("/listings");
})




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
