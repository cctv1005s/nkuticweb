var request = require('request');
var tool = require('./tool');
var uuid = require('node-uuid');
var User = require('../model/user');

//封装返回数据
var getResData = tool.getResData;
/**
* 把session中的user传递给前端
*/
exports.user = function(req,res,next){
    res.json(JSON.stringify(req.session.user));
}


/**
* 渲染"/user/:userid" 
*/
exports.person = function(req,res,next){
    res.render('/model')
}

/**
* 新建用户
* post 需要提供参数 UserName,UserNick,UserPassword ,其他的初始化
* UserState参数描述 0-删除 1-存在 
* UserPermission 0-下水道 1-普通用户 2-管理员
*/
exports.add = function(req,res,next){
    var post = req.body;
    var UserInfo = {
        UserID:uuid.v1(),
        UserName:post.UserName,
        UserNick:post.UserNick,
        UserPassword:post.UserPassword,
        Profile:"",
        UserState:1,
        UserPermission:1
    };

    //在数据库中插入User
    User.InsertUser(UserInfo,function(err,data){
        if(err){
            console.log(err);
            return next(err);
        }
        res.json(getResData(100,User,""));
        //实际上不应该这么做的，但是比较懒就这样好了。
        req.session.user = data;
    });

}

/**
* 修改某个用户的信息
*/
exports.update = function(req,res,next){
    var UserID = req.params.userid;
    var UserInfo = req.body;
    User.UpdateUser(UserID,User,function(err,data){
        if(err){
            return next(err);
        }
        res.json(getResData(100,User,""));   
    });
}

/**
* 删除某个用户
*/
exports.delete = function(req,res,next){
    var UserID = req.params.userid;
    User.DeleteUser(UserID,function(err,data){
        if(err){
            return next(err);
        }
        res.json(getResData(100,{},""));      
    });
}

/**
* 得到某个用户的所有文章
*/
exports.getArticles = function(req,res,next){
    var UserID = req.params.userid;
    User.getArticles(UserID,function(err,data){
    });
}


exports.login = function(req,res,next){
    var post = req.body;
    try{
    User.getUserByName(post.UserName,function(err,data){
        if(err){
            console.log(err);
            return res.json(getResData(-100,err,""));
        }
        data = Array2Object(data);
        if(data.UserPassword == post.UserPassword&&data){
            req.session.user = data;
            res.json(getResData(100,data,""));
        }else{
            res.json(getResData(-100,{},"用户名或密码错误"));
        }
    });
    }
    catch(e){
        console.log(e);
    }
}

var Array2Object = function(arr){
    if(arr.length >= 0)
        arr = arr[0]; 
    return arr;
}