//import express from "express";  // module  => package.json => type = "module"  => new optimized faster
//const express = require("express"); // module  => package.json => type = "commonjs"  => old

// js => in past  broweser only  ==> then node js "Built on  C++" ==> enviorment ki vo run kar jaye server side par

//1st command => npm init (node intilize)   // 2nd command => npm install express  

import express from "express"; 

const app = express();

const port = 3000;

app.get("/", (req, res ) => {   // get => feth data
    res.send("Hello World!");   // post => post request  == new fresh data save 
  });                           // put => existing data update  == >  pura data dena padta hai single ciz ko update karne k liye
                                // patch => existing data update   ===> single entry 
                                // delete => existing data delete

app.get("/about", (req, res ) => {
    res.send("About Page!");
  });



app.listen(port, () => {
    console.log(` app listening at http://localhost:${port}`);
});



