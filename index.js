const express=require('express')
const app=express()
const mailing=require('./mail/mail.js')
const cors=require('cors') 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.get("/",(req,res)=>{res.send("How can i Help you")})
app.post("/contactUs",async(req,res)=>{
     let result=await mailing(req.body.name,req.body.email,req.body.feedback)
     if(result){res.json({ok:true,text:"sended"})}
     else{res.json({ok:false,text:"Error"})}  
})
app.listen(5000,()=>console.log("app listen in 5000"))
