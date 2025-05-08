const mongoose=require('mongoose');
const ItemsSchema=new mongoose.Schema({
itemName:{
    type:String,
    required:[true,"name of item is require"]
},
url:{
    type:String,
    //  require:[true,"item must include picture"]
},
categoryName:{
    type:String,
    enum:["חולצות","חצאיות/מכנסיים","שמלות","פיז'מות","נעלים"],
    require:[true,"Item nust include category"] 
},
season:{
type:String,
enum:["חורף","קיץ","כללי"],
default:"כללי"
},
categoryId:{
type:Number
},
inUse:{
type:Boolean,
default:false
},
countWear:{
    type:Number,
    default:0
},
style:{
    type:String,
    enum:["ביסיק","ספורט","ספורט אלגנט","אלגנט","אחר"],
    default:"אחר"
}
// fittedMe:{
//     type:Map<String,Set:Number>,
    
// }



})
module.exports=mongoose.model('items',ItemsSchema)
