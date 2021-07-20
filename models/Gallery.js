var mongoose=require('mongoose')
var GallerySchema =new mongoose.Schema({

id:String,
imageUrl:String,
imageTitle:String,
imageDesc:String,
uploaded:{ type:Date, default:Date.now},


//DeleteYn: boolean,
//ItemCount:number,
//Amount:number,


});

module.exports=mongoose.model('Gallery',GallerySchema);