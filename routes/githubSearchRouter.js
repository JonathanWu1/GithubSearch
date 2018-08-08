var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser');
var got = require('got');
var parse = require('parse-link-header');
router.use(bodyParser.urlencoded({
  extended:true
}));
router.use(bodyParser.json());
router.get('/',(req, res, next)=>{
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, '/../public/githubsearch.html'));
})
router.post('/',(req,res,next)=>{
  got('https://api.github.com/search/users?q='+req.body.name+'+in:login+location:bangalore&per_page='+req.body.num_per_page+'&page='+req.body.page)
  .then((response) => {
    var items = response.body;
    var link = parse(response.headers.link);

    if(link!=null){
      var data = Object.assign(link,JSON.parse(items))
    }
    else if(items!=null){
      data=JSON.parse(items);
    }
    else{
      data = null;
    }

    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(data);
  }).catch((error) => {
    console.log(error);
  });
});
router.get('/:username',(req,res,next)=>{
  got('https://api.github.com/users/'+req.params.username)
    .then((response) => {
    var items = response.body;
    if(items!=null){
      data=JSON.parse(items);
      res.statusCode=200;
      res.setHeader('Content-Type', 'application/json');
      res.json(data);
    }
    else{
      res.statusCode=200;
      res.setHeader('Content-Type', 'text/plain');
      res.end("No User Found");
    }
  }).catch((error) => {
    console.log(error);
  });
});
module.exports = router;
