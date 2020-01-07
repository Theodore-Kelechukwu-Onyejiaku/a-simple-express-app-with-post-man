/**
 *      THIS IS index.js and sometimes you might see it as server.js or app.js
 */
const express = require("express");
const app = express();
const path = require("path");



//import middleware
const logger = require("./middleware/logger")

//Create Port
const PORT = process.env.PORT || 5000;


//Initialize and use middleware 
//app.use(logger);

//Express body parser : this body parser allows our post request body to show up after posting
app.use(express.json());
app.use(express.urlencoded({extended: false}))


/*app.get("/", (req, res)=>{
    //res.send("<h1>Welcome to the homepage</h1>")
        /**
         * we can have other res.*. res.send() is not often used
         * res.sendFile(), res.json(), res.render()- for templates like ejs, jade, handlebars, pug, 
         */

    //we want to send files
        //res.sendFile(path.join(__dirname, "public", "index.html"))
//})*/

//Sending files like the one above will slow us down because we will have to write out all our routes. 
//So we are going to use express.static middleware 
app.use(express.static(path.join(__dirname, "public")));

//(Members API routes)Here we want to use the router we created inside the route 
app.use("/api/members", require("./routes/api/members"))

app.listen(PORT, ()=>{
    console.log("Server running efficiently on port localhost:"+PORT);
})

