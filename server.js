const express = require('express');
const route = require('./route/users');
const app = express();

app.use(express.json());
app.use('/api/users',route);

app.get('/',(req,res)=>{
    res.send(`<h2 style="text-align:center">Hello world!</h2>`);
})
app.listen(5500, () => console.log('Server Successfuly Created at http://127.0.0.1:5500'));