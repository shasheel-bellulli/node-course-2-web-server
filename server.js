const express = require('express')
const hbs = require('hbs')
const fs = require('fs')
const port = process.env.PORT || 3000
var app = express()

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})
app.set('view engine', 'hbs')

/* app.use((req, res, next) => {
    res.render('maintenance.hbs')
}) */
//Middleware to read static file 
app.use(express.static(__dirname+'/public'))

//Middleware to handel req and res
app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now} ${req.method} : ${req.url}`
    fs.appendFileSync('fs.log', log + '\n')
console.log(`${now} ${req.method} : ${req.url}`)
next()
})

app.get('/', (req, res) => {
//res.send('<h1>Hello Express!<h1>')
res.render('home.hbs', {
    pageTitle: 'Home Page',    
    welcomeMessage: 'welcome to Home page'
})
})

app.get('/projects', (req, res) => {
    res.render('projects.hbs', ({
        pageTitle: 'Projects Page',    
        welcomeMessage: 'welcome to Project page'
    }))
})
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'        
    })
})
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handel request'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})