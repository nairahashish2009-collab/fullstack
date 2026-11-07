let express=require("express")
const app=express()
app.use(express.json())
const mysql= require("mysql")
const cors=require("cors")
app.use(cors())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"we"
})
app.get("/get",(req,res)=>{
    const sql="select * from student"
    db.query(sql,(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
app.get("/onestudent/:id",(req,res)=>{
    const id=parseInt(req.params.id)
    const sql=`SELECT * FROM student WHERE id=${id}`
    db.query(sql,(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
app.post("/add",(req,res)=>{
    const{name,email,phone}=req.body
    const sql=`INSERT INTO student( name, email, phone) VALUES ('${name}','${email}','${phone}')`
    db.query(sql,(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
app.put("/update/:id",(req,res)=>{
    let id=parseInt(req.params.id)
    const{name,email,phone}=req.body
    const sql=`UPDATE student SET name='${name}',email='${email}',phone='${phone}' WHERE id=${id}`
    db.query(sql,(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
app.delete("/delete/:id",(req,res)=>{
    let id=parseInt(req.params.id)
    const sql=`DELETE FROM student WHERE id=${id}`
    db.query(sql,(err,data)=>{
        if(err){
            res.json(err)
        }else{
            res.json(data)
        }
    })
})
app.listen(3000,()=>{
    console.log("server is runing")
})