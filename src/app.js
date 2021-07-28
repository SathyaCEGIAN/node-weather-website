const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecost = require('./utils/forecost')

//Define path for Express Config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engine and view loactions
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectory))


//ROUTES CREATING
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sathya'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Me',
        name: 'Sathyamurthy'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Me!',
        name: 'sathya',
        concept: 'No One Will Able to Help You !!'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Here is the eerror msg!'
        })
    }


   geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
       if(error){
        return res.send({error})
       }
       forecost(latitude, longitude,(error,forecostData) =>{
           if(error){
               return res.send({error})
           }
           res.send({
               forecost: forecostData,
               location,
               address:req.query.address
           })
       })

   })
})

app.get('/products', (req, res) =>{
    if(!req.query.search) {
        return res.send({
            error: 'Pls search any term !'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (rea, res)=> {
    res.render('404', {
        title:'404',
        name: 'sathyamurthy',
        errorMessage: 'Article not found'
    })
})

app.get('*', (req, res)=> {
    res.render('404', {
        title: '404',
        name: 'sathyamurthy',
        errorMessage: 'page not found'
    })
})

app.listen(3000, () =>{
    console.log('Server is listening now!!')
})

