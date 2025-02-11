const express=require('express')
const app=express()
const mailing=require('./mail/mail.js')
const cors=require('cors')
const corsOptions = {
  origin: 'https://counsellor.social', // Allow requests from this origin
  methods: ['GET', 'POST'], // Allow only GET and POST requests
    allowedHeaders: ['Content-Type'], // Allow only headers with Content-Type
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{res.send("This is Counsellor web personal use only..")})
app.post("/contactUs",async(req,res)=>{
     let result=await mailing(req.body.name,req.body.email,req.body.feedback)
     if(result){res.json({ok:true,text:"sended"})}
     else{res.json({ok:false,text:"Error"})}  
})
app.listen(5000,()=>console.log("app listen in 5000"))
