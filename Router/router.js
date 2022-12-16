const express=require('express')
const ResultData=require('./../Model/ResultMod')
const { findById } = require('./../Model/ResultMod')
const router=express.Router()

// for student page
router.get('/student',(req,res)=>{
    res.render('results/student',{resultData:new ResultData()})
})

// to get the result for individual student
router.post('/student',async(req,res)=>{
    const studRoll = req.body.rollno;   
        const individualStudent = await ResultData.findOne({rollno : studRoll});
        if(!individualStudent){
            res.render("results/student",{error :'Roll No is not Valid! Please check.'})
            validation();
          }      
          res.render("results/showRes", { one : individualStudent})
 }
)

//find all student data
router.get('/teacher',async(req,res)=>{

 const resultOutput= await ResultData.find()
    res.render('results/teacher',{resultOutput:resultOutput})
})

//add new student data
router.get('/addNew',(req,res)=>{
    res.render('results/addNew',{resultData:new ResultData()})
})

//edit student ---
router.get('/edit/:id',async(req,res)=>{
    const resultData=await ResultData.findById(req.params.id)
    res.render('results/edit',{resultData:resultData})
})

//show data
router.get('/:id', async(req,res)=>{
    const resData= await ResultData.findById(req.params.id)
    if(resData==null) res.redirect('/')
 res.render('results/show',{resData: resData})
})

//save student details
router.post('/', async(req,res,next)=>{
    req.resultData=new  ResultData();
    next()
 },saveArticleAndRedirect('new'))

//edit student details
router.put('/:id',async(req,res,next)=>{
    req.resultData= await ResultData.findById(req.params.id);
    next()
},saveArticleAndRedirect('edit'))

//delete student
router.delete('/:id',async(req,res)=>{
  await  ResultData.findByIdAndDelete(req.params.id)
  res.redirect('/results/teacher')
})

//common router method
function saveArticleAndRedirect(path){
    return async(req,res)=>{
        let resultData=req.resultData
       
        resultData.rollno=req.body.rollno
        resultData.stdName=req.body.stdName
        resultData.dob=req.body.dob
        resultData.score=req.body.score
    try{
        resultData=await resultData.save()
           // res.redirect(`/results/${resultData.id}`)
            res.redirect('/results/teacher')
        }catch(e){
            
         res.render(`results/${path}`,{resultData:resultData})
        }
    }
}

function validation(){
   console.log('roll is not avalabe ')
}


module.exports=router