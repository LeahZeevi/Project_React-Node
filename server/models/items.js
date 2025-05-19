const mongoose=require('mongoose');
const ItemsSchema=new mongoose.Schema({
    _id:{
        type:String,
    },
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
    enum:["חולצות","חצאיות","שמלות","פיז'מות","נעלים"],
    require:[true,"Item nust include category"] 
},
session:{
type:String,
enum:["חורף","קיץ","כללי"],
default:"כללי"
},
// categoryId:{
// type:Number
// },
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
//     type:[ItemsMatchigSchema]
// }
})

// const ItemsMatchigSchema=new mongoose.Schema({
// itemName:{
//     type:String,
//     required:[true,"name of item is require"]
// },
// url:{
//     type:String,
//     //  require:[true,"item must include picture"]
// },
// categoryName:{
//     type:String,
//     enum:["חולצות","חצאיות","שמלות","פיז'מות","נעלים"],
//     require:[true,"Item nust include category"] 
// },
// session:{
// type:String,
// enum:["חורף","קיץ","כללי"],
// default:"כללי"
// },
// inUse:{
// type:Boolean,
// default:false
// },
// countWear:{
//     type:Number,
//     default:0
// },
// style:{
//     type:String,
//     enum:["ביסיק","ספורט","ספורט אלגנט","אלגנט","אחר"],
//     default:"אחר"
// }
// })
