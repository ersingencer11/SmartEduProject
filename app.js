const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose')
const flash = require('connect-flash');
const methodOverride = require('method-override')
const pageRoute = require('./routes/pageRoute')
const courseRoute = require('./routes/courseRoute') 
const categoryRoute = require('./routes/categoryRoute')
const userRoute = require('./routes/userRoute')

const app = express()

//CONNECT TO DB
mongoose.connect('mongodb+srv://dbUser:HfYBD2YrzJfSipXd@cluster0.ja9fiy3.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('db connected succesfully')
})

//TEMPLATE ENGINE
app.set('view engine', 'ejs')

//GLOBAL VARIABLE
global.userIn =  null

//MIDDLEWARES
app.use(express.static('public'))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://dbUser:HfYBD2YrzJfSipXd@cluster0.ja9fiy3.mongodb.net/?retryWrites=true&w=majority' })
  }))
  app.use(flash());
  app.use((req, res, next)=> {
    res.locals.flashMessages = req.flash();
    next();
  })  
  app.use(methodOverride('_method',{
    methods: ['POST','GET']
  }))  

//ROUTES
app.use('*', (req, res, next)=>{
    userIn=req.session.UserID
    next()
})
app.use('/', pageRoute)
app.use('/courses',courseRoute) 
app.use('/categories', categoryRoute)
app.use('/users',userRoute)



const port = process.env.PORT || 5000
app.listen(port, () => [console.log(`${port} portu dinleniyor...`)])
