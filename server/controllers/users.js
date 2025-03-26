const User=require("../models/users")

exports.addUser=async(req,res)=>{
    console.log(req.body);
    console.log("hhhhhhhh");
    
    const user=await User.create(req.body)
    res.json(user)
}
exports.getUserByPassword=async(req,res)=>{
    const {_id}=req.params
    console.log('ppopopopopop');
    
    console.log(_id);
    try{
        const  user=await User.findOne({_id})
      
        
        if(!user){
            console.log("tamiiiiii");
            return res.status(404).json({message:'User not found'});
        }
        res.json(user);

    }catch(error){
      console.error('failed to ger user',error);
      res.status(500).json({message:'failed to get user'})
    }
    
}     
  
