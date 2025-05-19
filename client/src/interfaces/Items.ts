interface Item{
    _id:string,
    itemName:string,
    url:string,
    // description:String,
    categoryName:string,
    session:string,
    categoryId:Number,
    inUse:Boolean,
    countWear:Number,
    style:string,

}

export interface ItemWithId extends Item{
    itemName:string,
    url:string,
    // description:String,
    categoryName:string,
    session:string,
    categoryId:Number,
    inUse:Boolean,
    countWear:Number,
    style:string,
    _id:string,

}
export default Item



                                                                      







