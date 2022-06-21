
const asyncHandler=require('express-async-handler')
const exp=require('express')
const adminAPI=exp.Router()
adminAPI.use(exp.json())

adminAPI.post('/login',asyncHandler(async(request,response)=>{
    const AdminCollectionObj=request.app.get("AdminCollection")
    userObj=request.body
    let tempUser=await AdminCollectionObj.findOne({username:userObj.username})
    console.log(tempUser)
    if(tempUser===null){
        response.send({message:"Invalid users"})
    }
    else{
        if(userObj.password===tempUser.password){
            response.send({message:"Invalid password"})
        }
        else{
            response.send({message:"Login success",userdata:tempUser})
        }
    }
}))

module.exports=adminAPI;