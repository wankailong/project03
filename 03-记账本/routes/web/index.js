var express = require('express');
var router = express.Router();
const moment = require('moment')
const AccountModel = require('../../models/AccountModel');

//记账本的列表
router.get('/account', function(req, res, next) {
  //获取所有的账单信息
  AccountModel.find().sort({time:-1}).exec(
    function(err, data){
      if(err){
        return res.status(500).send("读取失败")
      };
     
      // console.log(data);
      res.render('list', {accounts: data , moment:moment});
      }
  );
    
  // let accounts = db.get('accounts').value();
  
});

//添加记录
router.get('/account/create', function(req, res, next) {
  res.render('create');
});

//新增记录
router.post('/account', (req, res) => {
  AccountModel.create({
    ...req.body,
    time : moment(req.body.time).toDate(),
  } , (err ,data)=>{
    if(err){
    return  res.status(500).send("插入失败")
    }
    //成功提醒
  res.render('success', {msg: '添加成功哦~~~', url: '/account'});
  })
});

//删除记录
router.get('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
  //删除
  // db.get('accounts').remove({id:id}).write();

  //提醒
 AccountModel.deleteOne({_id:id}, function(err){
    if(err){
      return res.status(500).send("删除失败")
    }
    res.render('success', {msg: '删除成功~~~', url: '/account'});
    });
    
  
});

module.exports = router;
