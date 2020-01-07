//Create a middleware
const logger = (req, res, next) =>{
    console.log("hello");
    
    //log out the http, the host and the date e.g: http://localhost:5000:://api/members Sun Jan 05 2020 16:59:00 GMT ...

    console.log(`${req.protocol}://${req.get('host')}::${req.originalUrl} 
     ${Date().toLocaleString()}`);
    next(); //This is to pass power to the next middleware. This is just like res.end() in ordinary node.js
}


module.exports = logger;