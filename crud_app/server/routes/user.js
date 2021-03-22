var express = require('express');
var router = express.Router();
var user = require('../controller/user');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/', user.create);


router.get('/user/:username', user.find);


router.put('/updatebyid', user.updateById);


router.put('/update', user.update);


router.delete('/delete', user.delete);

module.exports = router;