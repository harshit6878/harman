const express=require('express');
const mongoose=require('mongoose')
const ProModel=require('./Models/pro')
const app=express();
app.use(express.json());
const uri="mongodb+srv://harshitjindal:harshit@cluster0.rlnsh4u.mongodb.net/demoprac";//demoprac database
mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>console.log(`Database connect ho gya`))
.catch(()=>console.log(`Tumse na ho payega`))

app.get('/',(req,res)=>{
    res.send("this is harshit");
})
app.post('/postmansaab',(req,res)=>{
    const input=req.body;
    console.log(`my input data`,input);
    res.send(input);
})
// create
app.post('/create',(req,res)=>{
    const inp=req.body;
    ProModel.create(inp);
    res.send('User created');
})
// read
app.get('/read',async (req,res)=>{
    const alldocs=await ProModel.find({}); //Returns array of objects
    res.send(alldocs);
})

app.get('/readByAge',async (req,res)=>{
    const alldocs=await ProModel.find({age:{$gt:23}}); //Returns array of objects
    res.send(alldocs);
})
//update
app.patch('/update/:user_name',async(req,res)=>{
    const hi=req.params.user_name;
    const updatedData=req.body;
    const updatedName=await ProModel.findOneAndUpdate(
        {name:hi},
        {$set:updatedData},
        {new:true}
    )
    if(!updatedName){
        return res.status(404).json({message:"User sahi likho"});
    }
    res.status(202).json(updatedName);
})
//delete
app.delete('/delete/:user_name',async(req,res)=>{
    const hi=req.params.user_name;
    const deletedName=await ProModel.findOneAndDelete({name:hi})
    if(!deletedName){
        return res.status(404).json({message:"User sahi likho"});
    }
    res.status(202).json(deletedName);
})


app.listen(3000,()=>{
console.log("start")
});