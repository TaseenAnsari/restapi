const express = require('express')
const route = express.Router();
const Joi = require('joi');


const userData = [{ id: 1, userName: "taseenansari", email: 'taseen@gmail.com' }] //user data

const schema = Joi.object({    //validate the data
    userName: Joi.string()
        .alphanum()
        .min(4)
        .max(30)
        .required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})





route.get('/', (req, res) => { // get all user data in json format
    res.json(userData)
});
route.get('/:id', (req, res) => { //get id based data in json format 
    for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == parseInt(req.params.id)) {  //validate id exit in user data
            res.send(userData[i]);
        }
    }
    return res.send("user doesn't  exist")
});

route.post('/', (req, res) => { // create new user in user data
    if (!req.body.userName || !req.body.email) return res.status(404).send("invalid data"); //validate request data
    const data = schema.validate(req.body) //validate request data on based of schema
    if (data.error) return res.send(data.error.message)
    for (i of userData) {
        if (i.userName == req.body.userName) return res.send("User Name Exist"); // validate username
        if (i.email == req.body.email) return res.send("Used Email");// validate email0
    }
    userData.push({ id: userData[userData.length - 1].id + 1, userName: req.body.userName, email: req.body.email });
    res.send(JSON.stringify(userData));
});

route.put('/:id', (req, res) => { // edit data on based of id
    if (!req.body.userName || !req.body.email) return res.status(404).send("invalid data"); //validate request data
    const data = schema.validate(req.body) // validate request data on based of schema
    if (data.error) return res.send(data.error.message)
    for (let i = 0; i < userData.length; i++) {

        if (userData[i].id === Number(req.params.id)) { //validate id in user data
            for (let j = 0; j < userData.length; j++) {
                if (userData[j].userName == req.body.userName && j != i) return res.send("User Name Exist"); //validate user in user data
                if (userData[j].email == req.body.email && j != i) return res.send("Used Email");//validate email in user data
            }
            userData[i].userName = req.body.userName;
            userData[i].email = req.body.email;
            return res.send(JSON.stringify(userData))
        }
    }
    res.send("user doesn't Exist")
});

route.delete('/:id', (req, res) => { // delete data on based of id
    const user = userData.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(400).send("There is no user of the given id!!!")


    userData.splice(userData.indexOf(user), 1);
    return res.send(JSON.stringify(userData));
})
module.exports = route