const mongoose=require('mongoose')
const marked=require('marked')
const slugify=require('slugify')

const resultSchema=new mongoose.Schema({
   // _id:new  mongoose.Types.ObjectId(),

  
   rollno:{
        type: Number,
        required:true,
        unique:true
    },
    stdName: {
      type: String,
      required:true,
      
    },
    dob:{
        type: String,
        required:true
    },
    score:{
        type:String,
        required:true
    }
    
})
// resultSchema.pre('validate',function(next){
//     if(this.rollno){
//         this.slug=slugify(this.rollno)
//     }
// })
//   next()
module.exports=mongoose.model('ResultModel',resultSchema)