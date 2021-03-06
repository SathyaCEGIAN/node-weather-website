const request = require('postman-request');

const forecost = (latitude,longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f1a58c51eccc2b0ce1a1949cf019952f&query='+latitude+','+longtitude+'&units=f'
    request({ url, json: true }, (error, {body}) => {
        if (body.error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.error) {
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined," It is currently " + body.current.temperature + " degrees out . It feels like "+ body.current.feelslike+" degrees out")
        }
        
    })  
}

module.exports = forecost