var  util = require('util');
var mysql = require('../db/db');

exports.SelectUser = function(UserID,cb){
    console.log("----------SelectUser:%s----------",UserID);
    var query = "Select * from User where UserID = "+UserID;
    mysql.query(query,cb);
}

exports.InsertUser = function(User,cb){
    console.log("----------InserUser:%s----------",User);
    var query = "INSERT INTO USER (UserID,UserName,UserNick,UserPassword,Profile,UserState,UserPermission) VALUES (?,?,?,?,?,?,?)"
    mysql.query(query,User,cb);
}

exports.UpdateUser = function(UserID,User,cb){
    console.log("----------UpdateUser:%s----------",UserID);
    
    var set = "";
    for(var i in User){
        set += util.format(" %s = %s ,",i,User[i]);
    }
    set = set.slice(0,x.length-1);

    var query = "Update USER set %s where UserID = %s";
    query = util.format(query,set,UserID);
    mysql.query(query,cb);
}

exports.DeleteUser = function(UserID,cb){
    console.log("----------DeleteUser:%s----------",UserID);
    this.UpdateUser(UserID,{UserState:0},cb);
}