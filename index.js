const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const dotenv = require('dotenv').config()
const port = process.env.PORT
 
const approuter = require('./router/auth_router')

app.use(express.json());
app.use(express.urlencoded({extended:false}));

 mongoose.connect(`mongodb+srv://backend_auth:8IbCqnrwthxpRJYn@cluster0.bcaen6z.mongodb.net/reg?retryWrites=true&w=majority`)

const db = mongoose.connection;


db.on('error',(error)=>{
    console.log(error)
})
db.once('open',()=>{
    console.log('Database Connection Successfully')
})

app.use('/api/v1/auth',approuter)








app.get('/',(req,res)=>{
    res.send('Server Running');
})

app.listen(port,()=>{
    console.log("My Server Port: ",port);
})


// user_id : backend_auth

// user_pass : 8IbCqnrwthxpRJYn