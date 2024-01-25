require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;
const userCollection = require('./Models/User');
const todoCollection = require('./Models/TodoSchema');

app.use(express.json());
app.use(cors());

const connection = async () => {
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DBID}:${process.env.DBPASS}@cluster0.c8zsamg.mongodb.net/To-Do-App`);
        console.log('Connected to Mongodb');
    }catch(err){
        console.log(err)
    }
}

//USERS ROUTES
//Register Route
app.post('/api/register',async(req,res) => {
    const password = req.body.password;
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPass = await bcrypt.hash(password,salt);
        const userData = new userCollection({
            name:req.body.name,
            email:req.body.email,
            password:hashPass
        });
        const user = await userData.save();
        res.status(200).json({
            status:'Success',
            data:user
        })
    }catch(err){
        res.status(401).json({
            status:'Failed',
            data:err
        })
    }
})


//LOGIN ROUTE
app.post('/api/login',async(req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    try{
        const user = await userCollection.findOne({email:email});
        if(user){
            const pass = await bcrypt.compare(password,user.password);
            if(!pass){
                res.send('Incorrect Password');
            }else{
                const {password,...userData} = user._doc;
                res.status(200).json({
                    status:'Success',
                    data:userData
                })
            }
        }else{
            res.send('User is not register');
        }
    }catch(err){
        res.status(401).json({
            status:'Failed',
            data:err
        })
    }
})


//TODO ROUTES
app.post('/api/todo/:id', async (req,res) => {
    const id = req.params.id
    try{
        const todo = new todoCollection({
            name:req.body.name,
            desc:req.body.desc,
            userId:id
        })
        const userTodo = await todo.save();
        res.status(200).json({
            status:'Success',
            data:userTodo
        })
    }catch(err){
        res.status(401).json({
            status:'Failed',
            data:err
        })
    }
})


app.get('/api/todo/:userId',async (req,res) => {
    const userId = req.params.userId;
    try{
        const userTodos = await todoCollection.find({userId:userId});
        res.status(200).json({
            status:'Success',
            data:userTodos
        })
    }catch(err){
        res.status(401).json({
            status:'Failed',
            data:err
        })
    }
})


app.delete('/api/todo/:id', async(req,res) => {
    const id = req.params.id;
    try{    
        await todoCollection.findByIdAndDelete({_id:id});
        res.status(200).json({
            status:'Success',
            data:'Deleted Scuccessfully'
        })
    }catch(err){
        res.status(401).json({
            status:'Failed',
            data:err
        })
    }
})

app.listen(port,() => {
    console.log(`Listining on port number ${port}`)
    connection();
})