const { requestChecker } = require('./models/User');

module.exports=(app)=>{
    const express = require('express');
    const bodyParser = require("body-parser");
    const {RateLimit}= require('./rateLimit');


    const rateLimit = new RateLimit();


    // app.use((req,res,next)=>{
    //     if(!rateLimit.CheackRateLimit(req.ip,10000)){
    //         res.status(429);
    //         res.send('to many requests')
    //         res.end();
    //     }else{
    //         next();
    //     }
    // });
    app.use(express.static('test'))
    app.use(express.static('uploads'))
    app.use(express.static("build"));
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function(req, res, next) {

        res.header("Access-Control-Allow-Origin", "http://84.108.77.60:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    
        next();
      });
    // app.use('/api/user',(req,res,next)=>{
    //   console.log(req.body)
    //   if(requestChecker(req.body.id )) {
        
    //     console.log(req.ip);
    //     next();
    //   }
    //   console.log('bad')
    //      res.status(429);
    //      res.send('not really you! ')
    //      res.end();

    // })  

}