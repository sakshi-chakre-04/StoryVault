const path = require('path')
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const morgan = require('morgan')
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const passport = require('passport')
const session = require('express-session')
// const MongoStore = require('connect-mongo')(session) // OLD: connect-mongo v3 syntax
const MongoStore = require('connect-mongo'); // NEW: connect-mongo v4+ syntax
const connectDB = require('./config/db')

//load config
dotenv.config({path:'./config/config.env'})

//passport config
require('./config/passport')(passport)

connectDB()

const app=express()

// Body parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      let method = req.body._method
      delete req.body._method
      return method
    }
  })
)

//logging
if(process.env.NODE_ENV==='development'){//to run in dev mode
    app.use(morgan('dev'))
}


// Handlebars Helpers
const {
  formatDate,
  stripTags,
  truncate,
  editIcon,
  select,
} = require('./helpers/hbs')

// Handlebars
app.engine(
  '.hbs',
  engine({
    helpers: {
      formatDate,
      stripTags,
      truncate,
      editIcon,
      select,
    },
    defaultLayout: 'main',
    extname: '.hbs',
  })
)

app.set('view engine', '.hbs');


//session
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: false,//to not store the session if ntg is modified
//   store: new MongoStore({mongooseConnection: mongoose.connection})
// })) // OLD: connect-mongo v3 syntax
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,//to not store the session if ntg is modified
  store: MongoStore.create({
    mongoUrl: process.env.MONGO_URI
  })
})) // NEW: connect-mongo v4+ syntax

//passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Set global var
app.use(function (req, res, next) {
  res.locals.user = req.user || null
  next()
})

//static folder
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/index'))
app.use('/auth',require('./routes/auth'))
app.use('/stories',require('./routes/stories'))

const PORT=process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)