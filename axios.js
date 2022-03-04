const axios=require('axios')
const fs=require('fs')
axios.get("http://saral.navgurukul.org/api/courses").then(data=>{
    // console.log(data.data);
    fs.writeFileSync('courses.json',JSON.stringify(data.data,null,4))
}).catch(err=>{
    console.log(err.message);
})

