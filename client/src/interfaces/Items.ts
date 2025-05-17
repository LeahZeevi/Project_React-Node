interface Item{
    _id:string,
    itemName:String,
    url:String,
    // description:String,
    categoryName:String,
    session:String,
    categoryId:Number,
    inUse:Boolean,
    countWear:Number,
    style:String,

}

export interface ItemWithId extends Item{
    itemName:String,
    url:String,
    // description:String,
    categoryName:String,
    session:String,
    categoryId:Number,
    inUse:Boolean,
    countWear:Number,
    style:String,
    _id:string,

}
export default Item



                                                                      







