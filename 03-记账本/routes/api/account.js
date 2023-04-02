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
        return res.json({
            code : '1001',
            msg: '读取失败',
            data: null
        })
        return
      };
     //响应接口数据
     res.json({
        //响应编号
        code : '0000' ,
        //响应成功信息
        msg : '读取成功' ,
        //响应数据
        data: data
     })
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
    return  res.json({
        code :'1002' ,
        msg:"请求失败" ,
        data : null
    })
    }
    //成功提醒
  res.json({
    code: '0000',
    msg : "请求成功",
    data:data
  })
  })
});

//删除记录
router.delete('/account/:id', (req, res) => {
  //获取 params 的 id 参数
  let id = req.params.id;
 
 AccountModel.deleteOne({_id:id}, function(err){
    if(err){
        return  res.json({
            code :'1003' ,
            msg:"删除失败" ,
            data : null
        })
        }
    res.json({
        code: '0000',
        msg : "删除成功",
        data:null
      })
    });
    
  
});
// 获取单条记录
router.get('/account/:id', (req, res) => {
    //获取 params 的 id 参数
    let id = req.params.id;
   
    AccountModel.findById ( {_id:id},function(err, data){
        if(err){
          return  res.json({
                code:'1004',
                msg:'获取失败',
                data:null
            })
        };
       
        res.json({
            code:'0000',
            msg:'获取成功',
            data:data
        })
        });
    
  })
//更新账单信息
router.patch('/account/:id',(req,res)=>{
         let {id} =  req.params
AccountModel.updateOne({_id:id} , req.body ,(err ,data)=>{
    if(err){
        return  res.json({
              code:'1005',
              msg:'更新失败',
              data:null
          })
      }
    //   查询id返回的数据,并返回给接口
      AccountModel.findById(id , (err,data)=>{
        if(err){
            return  res.json({
                code:'1004',
                msg:'查询失败',
                data:null
            })
        }
        res.json({
            code:'0000',
            msg:'更新成功',
            data:data
        })
      })
      
})
})
module.exports = router;
