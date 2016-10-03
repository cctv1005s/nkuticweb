var  util = require('util');
var mysql = require('../db/db');

exports.InsertArticle = function(Article,cb){
     console.log("----------InserArticle:%s----------",Article);
     var InsertArticle = [];
     var ArticleAttr = "";
     for(var i in Article){
        ArticleAttr += i+",";
        InsertArticle.push(Article[i]);
     }
     ArticleAttr = ArticleAttr.slice(0,ArticleAttr.length - 1);
     var query = util.format("Insert Into Article (%s) values (?,?,?,?,?,?,?) ",ArticleAttr);
     console.log(query);
     mysql.query(query,InsertArticle,cb);
}