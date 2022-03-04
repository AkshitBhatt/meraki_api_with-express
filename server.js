const express=require('express')
const axios=require('axios')
const fs=require('fs')
const app=express()
app.use(express.json())
const port=4004


app.post("/addcourses",(req,res)=>{
    const bodydata=req.body
    fs.readFile('courses.json',(err,data)=>{
           var present_data=JSON.parse(data)
           present_data['availableCourses'].push(bodydata)
           fs.writeFileSync("courses.json",JSON.stringify(present_data,null,4))
           res.send('data posted')
    })
})


app.get('/data', (req, res) => {
    fs.readFile('courses.json', 'utf-8', (err, data) => {
        console.log(data);
        res.send(data)
    })

})


app.get("/courses/:id",(req,res)=>{
    fs.readFile("./courses.json",(err,data)=>{
        const present_data=JSON.parse(data)
        for(i of present_data.availableCourses){
            if (i["id"]==req.params.id){
                res.send(i)
                return
            }
        }
        res.send('id not found')
    })
})



app.put("/update/:id",(req,res)=>{
    fs.readFile('courses.json',(err,data)=>{
        const present_data=JSON.parse(data)
        console.log(present_data);
        // var counter=0
        for(a=0; present_data['availableCourses'].length>a; a++ ){
            if(( present_data['availableCourses'][a]["id"])===(req.params.id)){
                let obj = req.body
                obj['id'] = req.params.id
                present_data['availableCourses'][a]=obj;
                fs.writeFileSync('courses.json',JSON.stringify(present_data,null,4))
                console.log('done ');
                res.send('dataupdated')
                return
            }
        }
        res.send('id not found.......')        
    })
})

app.delete("/delete/:id",(req,res)=>{
    fs.readFile("courses.json",(err, data)=>{
        const present_data=JSON.parse(data)
        var counter = 0
        for (let a of present_data['availableCourses']){
            if((a["id"])===(req.params.id)){
                present_data['availableCourses'].splice(counter,1)
                fs.writeFileSync('courses.json',JSON.stringify(present_data,null,4))
                console.log('ok');
                res.send('data deleted')
                return
            }
            counter++
        }
        res.send("id not found.....")
        
    })
})

app.listen(port,()=>{
    console.log('listening to the port '+ port);
})