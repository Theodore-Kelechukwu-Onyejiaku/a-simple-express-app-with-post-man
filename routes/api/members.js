const express = require("express");
const members = require("../../Members");
const router = express.Router();



//Sending json or getting json(members)
router.get("/", (req, res)=>
    res.json(members)
)

//get single user
router.get("/:id", (req, res)=>{

    //This filters the members json and returns the one whose id matches the req id parameter
        //res.json(members.filter(member => member.id === parseInt(req.params.id)))

    //The code above will return a json even for id's that do not exist, so let's check if the id request paremeter exists.
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)))
    }else{
        //Because the person made a bad request we should send an error status code
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
});

//Now we want to create a member. And anytime you want to create or add to a database you will surely use the POST method
router.post("/", (req, res)=>{

    //This is to parse our posted data. But this will only work with Express Body Parser Middleware (express.json and express.urlencoded({extended:}))
        //res.send(req.body)  

    //We don't want to just send the body, we actually want to create a new member
    const newMember = {
        id : 4,
        name : req.body.name,
        email: req.body.email,
        status: "active"
    }

    if(!newMember.name || !newMember.email){
        return res.json({msg : "Please enter name and email"})
    }

    members.push(newMember);
    res.json(members);
})

//Update Member
router.put("/:id", (req, res)=>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        const updateMember = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)){
                member.name = updateMember.name ? updateMember.name : member.name;
                member.email = updateMember.name ? updateMember.email : member.email;
                res.json({
                    msg: "Member updated",
                    member
                })
            }
        })
        
    }else{
        //Because the person made a bad request we should send an error status code
        res.status(400).json({msg: `No member with the id of ${req.params.id}`})
    }
})

//Delete Member
router.delete("/:id", (req, res)=>{
    const found = members.some(member =>
        member.id === parseInt(req.params.id)
    )

    if(found){
        res.json({msg : "Member deleted", members: members.filter(member => member.id !== parseInt(req.params.id))})
    }else{
        res.status(400).json({msg: "No member with the id of: "+req.params.id})
    }
})

module.exports = router;
 