var Article = require('../model/article.js');
var uuid = require('node-uuid');
var tool = require('./tool');

var getResData = tool.getResData;
/**
* 渲染某篇文章
*/
exports.select = function(req,res,next){

}

/**
* 新建文章
*/
exports.add = function(req,res,next){
    var post = req.body;
    var article = {
        ArticleID:uuid.v1(),
        ArticleContent:post.ArticleContent,
        ArticleTitle:post.ArticleTitle,
        ArticleBelong:post.ArticleBelong||req.session.user.UserID,
        ReadNum:0,
        ArticleState:1,
        ArticleType:1
    };
    Article.InsertArticle(article,function(err,data){
        if(err){
            console.log(err);
            return res.json(getResData(-100,{},JSON.stringify(err)));
        }
        res.json(getResData(100,article,""));
    });
}

/**
*
*/

/**
* 修改某篇文章
*/
exports.update = function(req,res,next){

}

/**
* 删除某篇文章
*/
exports.delete = function(req,res,next){

}
