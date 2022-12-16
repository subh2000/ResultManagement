const express=require('express')
const articleRouter=require('./Router/router')
//const studentRouter=require('./Router/StdRouter')
const mongoose=require('mongoose')
const methodOverride=require('method-override')
const app=express();


//connection mongodb atlas
mongoose.connect('mongodb+srv://subhra123:7852@cluster0.2akvqfa.mongodb.net/Users?retryWrites=true&w=majority',
{
    useNewUrlParser: true, 
    useUnifiedTopology:true
}
).then(()=>{console.log("db connected")
})

//set the all views
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))

//defalut page
app.get('/',(req,res)=>{
    res.render('results/index');
})

app.use('/results',articleRouter)
//app.use('/resultone',studentRouter)

app.listen(5040,()=>{console.log('Server started...')})