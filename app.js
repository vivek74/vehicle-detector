'use strict';
const express=require("express");
const app=express();
const request=require("request");
const rgbHex = require('rgb-hex');
const vision = require('node-cloud-vision-api');
const Vision = require('@google-cloud/vision');
var Parse = require('parse');
app.set("view engine","ejs");

vision.init({auth: 'AIzaSyAKuIdRdWcg8yg1tTdpf-hnwzzhwpR4mJY'});

const req = new vision.Request({
  image: new vision.Image('E:/web/hackthon/api/img6.jpg'),
  features: [
    new vision.Feature('TEXT_DETECTION', 1),
    new vision.Feature('WEB_DETECTION', 20),
    new vision.Feature('IMAGE_PROPERTIES', 1),
  ]
})

vision.annotate(req).then((res) => {
  var data= JSON.stringify(res.responses)
  var results= JSON.parse(data)
  app.get("/",function(req,res){
    //number plate
    var plate=(results[0]["textAnnotations"][0]["description"]);
    var color=(results[0]["imagePropertiesAnnotation"]["dominantColors"]["colors"][0]["color"]);
    var model1=(results[0]["webDetection"]["webEntities"][2]["description"]);
    var model2=(results[0]["webDetection"]["webEntities"][3]["description"]);
    var model3=(results[0]["webDetection"]["webEntities"][4]["description"]);
    //res.send(plate);
    var red=color.red;
    var green=color.green;
    var blue=color.blue;
    var col=rgbHex(red, green, blue);
  //res.render("plate",{color:color});
  res.render("plate",{col:col});
  })
}, (e) => {
  console.log('Error: ', e)

})


app.listen(3000,function(){
console.log("server started on 3000");
});